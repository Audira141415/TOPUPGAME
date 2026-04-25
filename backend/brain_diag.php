<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$directory = new RecursiveDirectoryIterator('app/Filament');
$iterator = new RecursiveIteratorIterator($directory);
$regex = new RegexIterator($iterator, '/^.+\.php$/i', RecursiveRegexIterator::GET_MATCH);

foreach ($regex as $file) {
    $filePath = $file[0];
    try {
        echo "Testing $filePath... ";
        include_once $filePath;
        echo "OK\n";
    } catch (\Throwable $e) {
        echo "FAILED: " . $e->getMessage() . " in " . $e->getFile() . " on line " . $e->getLine() . "\n";
    }
}
