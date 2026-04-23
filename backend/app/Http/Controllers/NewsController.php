<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function index()
    {
        return \App\Models\News::where('is_active', true)->latest()->get();
    }

    public function show($slug)
    {
        return \App\Models\News::where('slug', $slug)->firstOrFail();
    }
}
