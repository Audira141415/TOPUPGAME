<?php

namespace App\Filament\Pages;

use App\Models\Game;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Models\PaymentMethod;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Placeholder;
use Filament\Schemas\Schema;
use Filament\Pages\Page;
use Filament\Notifications\Notification;
use Illuminate\Support\Str;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;

class ManualOrder extends Page implements HasForms
{
    use InteractsWithForms;
    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-pencil-square';
    protected static string|\UnitEnum|null $navigationGroup = 'MENU UTAMA';
    protected static ?string $navigationLabel = 'Order Manual';
    protected static ?int $navigationSort = 3;
    protected string $view = 'filament.pages.manual-order';


    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill();
    }

    public function form(Schema $form): Schema
    {
        return $form
            ->schema([
                Section::make('Form Order Manual')
                    ->description('Gunakan form ini untuk membuat pesanan top up secara manual.')
                    ->schema([
                        Select::make('user_id')
                            ->label('Pilih User')
                            ->options(User::pluck('name', 'id'))
                            ->searchable()
                            ->required(),
                        
                        Select::make('game_id')
                            ->label('Pilih Game')
                            ->options(Game::where('is_active', true)->pluck('name', 'id'))
                            ->reactive()
                            ->afterStateUpdated(fn (callable $set) => $set('product_id', null))
                            ->required(),

                        Select::make('product_id')
                            ->label('Pilih Produk')
                            ->options(function (callable $get) {
                                $gameId = $get('game_id');
                                if (!$gameId) return [];
                                return Product::where('game_id', $gameId)
                                    ->where('is_active', true)
                                    ->get()
                                    ->pluck('name', 'id');
                            })
                            ->reactive()
                            ->required(),

                        TextInput::make('target_user_id')
                            ->label('User ID / Nickname')
                            ->required(),

                        Select::make('payment_method_id')
                            ->label('Metode Pembayaran')
                            ->options(PaymentMethod::where('is_active', true)->pluck('name', 'id'))
                            ->required(),

                        Textarea::make('note')
                            ->label('Catatan (Opsional)')
                            ->rows(3),
                    ])
                    ->columnSpan(['lg' => 2]),

                Section::make('Ringkasan Order')
                    ->schema([
                        Placeholder::make('summary_user')
                            ->label('User')
                            ->content(fn (callable $get) => User::find($get('user_id'))?->name ?? '-'),
                        
                        Placeholder::make('summary_game')
                            ->label('Game')
                            ->content(fn (callable $get) => Game::find($get('game_id'))?->name ?? '-'),

                        Placeholder::make('summary_product')
                            ->label('Produk')
                            ->content(fn (callable $get) => Product::find($get('product_id'))?->name ?? '-'),

                        Placeholder::make('summary_price')
                            ->label('Harga Total')
                            ->content(function (callable $get) {
                                $product = Product::find($get('product_id'));
                                if (!$product) return 'Rp 0';
                                return 'Rp ' . number_format($product->price, 0, ',', '.');
                            }),
                    ])
                    ->columnSpan(['lg' => 1]),
            ])
            ->columns(3)
            ->statePath('data');
    }

    public function create(): void
    {
        $formData = $this->form->getState();
        $product = Product::find($formData['product_id']);

        $order = Order::create([
            'user_id' => $formData['user_id'],
            'order_id' => 'MNL-' . strtoupper(Str::random(10)),
            'game_id' => $formData['game_id'],
            'product_id' => $formData['product_id'],
            'target_user_id' => $formData['target_user_id'],
            'amount' => $product->price,
            'total_amount' => $product->price,
            'payment_method_id' => $formData['payment_method_id'],
            'status' => 'pending',
            'payment_status' => 'paid', // Manual order assumed paid
        ]);

        Notification::make()
            ->title('Pesanan Berhasil Dibuat')
            ->success()
            ->send();

        $this->form->fill();
    }
}
