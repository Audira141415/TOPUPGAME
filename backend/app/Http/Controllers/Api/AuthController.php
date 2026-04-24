<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

/**
 * @OA\Info(
 *     title="Audira Zenith API",
 *     version="1.0.0",
 *     description="Documentation for Audira Zenith Top-Up Platform API",
 *     @OA\Contact(
 *         email="support@audirazenith.com"
 *     )
 * )
 * @OA\Server(
 *     url=L5_SWAGGER_CONST_HOST,
 *     description="Main API Server"
 * )
 */
class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'turnstile_token' => 'required|string',
        ]);

        if (!$this->verifyTurnstile($request->turnstile_token)) {
            return response()->json(['message' => 'Turnstile verification failed.'], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'member',
            'balance' => 0,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'turnstile_token' => 'required|string',
        ]);

        if (!$this->verifyTurnstile($request->turnstile_token)) {
            return response()->json(['message' => 'Turnstile verification failed.'], 422);
        }

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid login details'
            ], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ]);
    }

    private function verifyTurnstile($token)
    {
        $secret = config('services.turnstile.secret');
        if (app()->environment('local') && $secret === '0x4AAAAAAA-YOUR-SECRET-KEY') {
            return true; // Skip verification in local dev with default key
        }

        $response = \Illuminate\Support\Facades\Http::asForm()->post('https://challenges.cloudflare.com/turnstile/v0/siteverify', [
            'secret' => $secret,
            'response' => $token,
        ]);

        return $response->json('success');
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Logged out'
        ]);
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    public function updateAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $user = $request->user();

        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            $filename = time() . '_' . $user->id . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('avatars', $filename, 'public');

            $user->avatar = $path;
            $user->save();

            return response()->json([
                'message' => 'Avatar updated successfully',
                'user' => $user,
                'avatar_url' => asset('storage/' . $path)
            ]);
        }

        return response()->json(['message' => 'No file uploaded'], 400);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();
        
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
        ]);

        $user->update($request->only('name', 'phone'));

        return response()->json($user);
    }

    public function sendOtp(Request $request)
    {
        $request->validate(['phone' => 'required|string|max:20']);
        
        $otp = rand(100000, 999999);
        $user = User::where('phone', $request->phone)->first();
        
        if (!$user) {
            return response()->json(['message' => 'Nomor WhatsApp tidak terdaftar.'], 404);
        }

        // Store OTP in cache for 5 minutes
        \Illuminate\Support\Facades\Cache::put('otp_' . $request->phone, $otp, 300);

        $message = "🔐 *KODE VERIFIKASI ZENITH* 🔐\n\n"
                 . "Kode OTP Anda adalah: *{$otp}*\n\n"
                 . "Jangan berikan kode ini kepada siapapun, termasuk Admin. Kode berlaku selama 5 menit.";
        
        \App\Services\WhatsAppService::sendMessage($request->phone, $message);

        return response()->json(['message' => 'OTP telah dikirim ke WhatsApp Anda.']);
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'phone' => 'required|string',
            'otp' => 'required|string',
        ]);

        $cachedOtp = \Illuminate\Support\Facades\Cache::get('otp_' . $request->phone);

        if ($cachedOtp && $cachedOtp == $request->otp) {
            $user = User::where('phone', $request->phone)->firstOrFail();
            $token = $user->createToken('auth_token')->plainTextToken;
            
            \Illuminate\Support\Facades\Cache::forget('otp_' . $request->phone);

            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user,
            ]);
        }

        return response()->json(['message' => 'Kode OTP salah atau sudah kadaluwarsa.'], 422);
    }

    public function redirectToGoogle()
    {
        return \Laravel\Socialite\Facades\Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $googleUser = \Laravel\Socialite\Facades\Socialite::driver('google')->user();
            
            $user = User::updateOrCreate([
                'email' => $googleUser->email,
            ], [
                'name' => $googleUser->name,
                'password' => Hash::make(str_random(24)),
                'role' => 'member',
                'avatar' => $googleUser->avatar,
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            // Redirect to frontend with token
            $frontendUrl = config('app.frontend_url', 'http://localhost:3000');
            return redirect($frontendUrl . "/auth/callback?token={$token}&name=" . urlencode($user->name));

        } catch (\Exception $e) {
            return redirect(config('app.frontend_url', 'http://localhost:3000') . "/login?error=google_failed");
        }
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'old_password' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if (!Hash::check($request->old_password, $request->user()->password)) {
            throw ValidationException::withMessages([
                'old_password' => ['Password lama tidak cocok.'],
            ]);
        }

        $request->user()->update([
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'Password updated successfully']);
    }
}
