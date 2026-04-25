<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Actions\Action;

class ManageSettings extends Page
{
    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-cog-6-tooth';
    protected string $view = 'filament.pages.manage-settings';
    protected static ?string $title = 'Pengaturan';
    protected static ?string $navigationLabel = 'Pengaturan';
    protected static string|\UnitEnum|null $navigationGroup = 'PENGATURAN';
    protected static ?int $navigationSort = 100;

    public ?array $data = [];

    public function mount(): void
    {
        $this->data = Setting::all()->pluck('value', 'key')->toArray();
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('General Information')
                    ->schema([
                        TextInput::make('site_name')->label('Website Name'),
                        TextInput::make('whatsapp_number')->label('WhatsApp Admin')->placeholder('628123456789'),
                        TextInput::make('instagram_url')->label('Instagram URL'),
                    ])->columns(2),

                Section::make('Branding')
                    ->schema([
                        FileUpload::make('site_logo')->image()->disk('public')->directory('branding'),
                        FileUpload::make('site_favicon')->image()->disk('public')->directory('branding'),
                    ])->columns(2),
                
                Section::make('API Configurations')
                    ->schema([
                        TextInput::make('tripay_merchant_code')->label('Tripay Merchant Code')->password(),
                        TextInput::make('tripay_api_key')->label('Tripay API Key')->password(),
                        TextInput::make('tripay_private_key')->label('Tripay Private Key')->password(),
                    ])->columns(3),
            ])
            ->statePath('data');
    }

    protected function getFormActions(): array
    {
        return [
            Action::make('save')
                ->label('Save Settings')
                ->submit('save'),
        ];
    }

    public function save(): void
    {
        foreach ($this->data as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        Notification::make()
            ->title('Settings saved successfully!')
            ->success()
            ->send();
    }
}
