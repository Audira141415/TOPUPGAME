<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Order;
use App\Models\Game;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AdminManagementController extends Controller
{
    /**
     * Users Management
     */
    public function usersIndex()
    {
        return response()->json(User::paginate(15));
    }

    public function updateUser(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'string|max:255',
            'email' => 'email|unique:users,email,' . $user->id,
            'role' => 'in:user,gold,platinum,admin',
        ]);

        $user->update($validated);
        return response()->json(['success' => true, 'data' => $user]);
    }

    public function deleteUser(User $user)
    {
        $user->delete();
        return response()->json(['success' => true]);
    }

    /**
     * Orders Management
     */
    public function ordersIndex()
    {
        return response()->json(Order::with(['game', 'product'])->latest()->paginate(15));
    }

    public function updateOrderStatus(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,processing,success,failed',
        ]);

        $order->update($validated);
        return response()->json(['success' => true, 'data' => $order]);
    }

    /**
     * Games Management
     */
    public function gamesIndex()
    {
        return response()->json(Game::withCount('products')->get());
    }

    public function storeGame(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'image_url' => 'nullable|string',
            'banner_url' => 'nullable|string',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        if (!isset($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $game = Game::create($validated);
        return response()->json(['success' => true, 'data' => $game], 201);
    }

    public function updateGame(Request $request, Game $game)
    {
        $validated = $request->validate([
            'name' => 'string|max:255',
            'category_id' => 'exists:categories,id',
            'image_url' => 'nullable|string',
            'banner_url' => 'nullable|string',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $game->update($validated);
        return response()->json(['success' => true, 'data' => $game]);
    }

    public function deleteGame(Game $game)
    {
        $game->delete();
        return response()->json(['success' => true]);
    }

    /**
     * Products Management
     */
    public function productsIndex($gameId)
    {
        return response()->json(Product::where('game_id', $gameId)->get());
    }

    public function storeProduct(Request $request)
    {
        $validated = $request->validate([
            'game_id' => 'required|exists:games,id',
            'name' => 'required|string|max:255',
            'price_basic' => 'required|numeric|min:0',
            'price_gold' => 'nullable|numeric|min:0',
            'price_platinum' => 'nullable|numeric|min:0',
            'price_cost' => 'nullable|numeric|min:0',
            'provider_product_id' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $product = Product::create($validated);
        return response()->json(['success' => true, 'data' => $product], 201);
    }

    public function updateProduct(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'string|max:255',
            'price_basic' => 'numeric|min:0',
            'price_gold' => 'nullable|numeric|min:0',
            'price_platinum' => 'nullable|numeric|min:0',
            'price_cost' => 'nullable|numeric|min:0',
            'provider_product_id' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $product->update($validated);
        return response()->json(['success' => true, 'data' => $product]);
    }

    public function deleteProduct(Product $product)
    {
        $product->delete();
        return response()->json(['success' => true]);
    }
}
