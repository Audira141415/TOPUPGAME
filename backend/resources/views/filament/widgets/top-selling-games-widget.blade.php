<x-filament-widgets::widget>
    <x-filament::section>
        <div class="flex items-center justify-between gap-x-3">
            <h2 class="text-lg font-bold tracking-tight">Top Up Terlaris</h2>
            <div class="text-xs text-gray-500">7 Hari Terakhir</div>
        </div>

        <div class="mt-4 space-y-4">
            @foreach($this->getTopGames() as $index => $game)
                <div class="flex items-center gap-x-4">
                    <div class="flex items-center justify-center w-8 h-8 text-sm font-bold text-gray-500 bg-gray-100 rounded-full shrink-0">
                        {{ $index + 1 }}
                    </div>
                    
                    <img src="{{ $game->image ? (str_starts_with($game->image, 'http') ? $game->image : asset('storage/' . $game->image)) : asset('logo.png') }}" 
                         alt="{{ $game->name }}" 
                         class="object-cover w-10 h-10 rounded-lg shadow-sm shrink-0">
                    
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold truncate">{{ $game->name }}</p>
                        <p class="text-xs text-gray-500">Video Games</p>
                    </div>

                    <div class="text-sm font-bold">
                        {{ number_format($game->total_sales) }} <span class="text-xs font-normal text-gray-400">Trx</span>
                    </div>
                </div>
            @endforeach
        </div>

        <div class="mt-6">
            <x-filament::button
                href="/admin/games"
                tag="a"
                color="gray"
                outlined
                size="sm"
                class="w-full"
            >
                Lihat Semua Game
            </x-filament::button>
        </div>
    </x-filament::section>
</x-filament-widgets::widget>
