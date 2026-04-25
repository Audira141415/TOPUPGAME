<?php

namespace App\Filament\Pages\Auth;

use Filament\Auth\Pages\Login as BaseLogin;
use Illuminate\Contracts\Support\Htmlable;

class Login extends BaseLogin
{
    public $processingMessage = 'Authenticating with Zenith Core...';

    public function getTitle(): string | Htmlable
    {
        return 'Zenith Command Access';
    }

    public function getHeading(): string | Htmlable
    {
        return 'Zenith Command Access';
    }
}
