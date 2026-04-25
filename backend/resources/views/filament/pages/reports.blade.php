<x-filament-panels::page>
    <div class="grid grid-cols-1 gap-6">
        {{-- Widgets will be automatically rendered at the top if defined in getHeaderWidgets --}}
        
        <x-filament::section>
            <x-slot name="heading">Download Laporan</x-slot>
            <p class="text-sm text-gray-500 mb-4">Pilih periode laporan yang ingin diunduh dalam format Excel atau PDF.</p>
            
            <div class="flex gap-4">
                <x-filament::button color="success" icon="heroicon-m-document-arrow-down">
                    Export Excel
                </x-filament::button>
                <x-filament::button color="danger" icon="heroicon-m-document-text">
                    Export PDF
                </x-filament::button>
            </div>
        </x-filament::section>
    </div>
</x-filament-panels::page>
