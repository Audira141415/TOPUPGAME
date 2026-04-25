<x-filament-panels::page>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <x-filament::section>
            <x-slot name="heading">Status Saldo User</x-slot>
            <div class="space-y-4">
                <div class="flex justify-between items-center">
                    <span class="text-gray-500">Total Saldo Terendap</span>
                    <span class="font-bold text-lg text-primary-600">Rp {{ number_format(\App\Models\User::sum('balance'), 0, ',', '.') }}</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-gray-500">User dengan Saldo > 0</span>
                    <span class="font-bold text-lg">{{ \App\Models\User::where('balance', '>', 0)->count() }} User</span>
                </div>
            </div>
        </x-filament::section>

        <x-filament::section>
            <x-slot name="heading">Manajemen Deposit</x-slot>
            <p class="text-sm text-gray-500 mb-6">Kelola riwayat deposit dan penyesuaian saldo manual.</p>
            <x-filament::button icon="heroicon-m-plus" class="w-full">
                Input Saldo Manual
            </x-filament::button>
        </x-filament::section>
    </div>
</x-filament-panels::page>
