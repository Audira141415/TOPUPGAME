<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    echo "Auditing Resources...\n";
    $resources = [
        \App\Filament\Resources\Users\UserResource::class,
        \App\Filament\Resources\Orders\OrderResource::class,
    ];

    foreach ($resources as $resource) {
        echo "Checking $resource...\n";
        $res = new $resource();
    }
    echo "Audit DONE. No instantiation errors.\n";
} catch (\Throwable $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
    echo "FILE: " . $e->getFile() . "\n";
    echo "LINE: " . $e->getLine() . "\n";
    echo "TRACE: " . $e->getTraceAsString() . "\n";
}
