<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Post;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index()
    {
        $baseUrl = config('app.url', 'http://localhost:3000');
        
        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
        
        // Static Pages
        $staticPages = ['', '/track', '/tools', '/flash-sale', '/news', '/login', '/signup'];
        foreach ($staticPages as $page) {
            $xml .= '<url>';
            $xml .= '<loc>' . $baseUrl . $page . '</loc>';
            $xml .= '<changefreq>daily</changefreq>';
            $xml .= '<priority>0.8</priority>';
            $xml .= '</url>';
        }
        
        // Games
        $games = Game::where('is_active', true)->get();
        foreach ($games as $game) {
            $xml .= '<url>';
            $xml .= '<loc>' . $baseUrl . '/game/' . $game->slug . '</loc>';
            $xml .= '<changefreq>weekly</changefreq>';
            $xml .= '<priority>1.0</priority>';
            $xml .= '</url>';
        }
        
        // News/Articles
        // Assuming there is a Post or News model
        if (class_exists('App\Models\Post')) {
            $posts = \App\Models\Post::all();
            foreach ($posts as $post) {
                $xml .= '<url>';
                $xml .= '<loc>' . $baseUrl . '/news/' . $post->slug . '</loc>';
                $xml .= '<changefreq>monthly</changefreq>';
                $xml .= '<priority>0.6</priority>';
                $xml .= '</url>';
            }
        }

        $xml .= '</urlset>';

        return response($xml, 200)->header('Content-Type', 'text/xml');
    }
}
