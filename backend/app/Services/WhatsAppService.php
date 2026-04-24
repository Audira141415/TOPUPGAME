<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WhatsAppService
{
    public static function sendMessage($to, $message)
    {
        $token = config('services.whatsapp.token');
        $baseUrl = config('services.whatsapp.url', 'https://api.fonnte.com/send');

        if (!$token) {
            Log::warning('WhatsApp token not configured.');
            return false;
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => $token,
            ])->post($baseUrl, [
                'target' => $to,
                'message' => $message,
                'delay' => '2',
                'countryCode' => '62', // Default Indonesia
            ]);

            if ($response->successful()) {
                Log::info("WA message sent to {$to}: {$message}");
                return true;
            }

            Log::error("WA failed for {$to}: " . $response->body());
            return false;
        } catch (\Exception $e) {
            Log::error("WA Exception: " . $e->getMessage());
            return false;
        }
    }
}
