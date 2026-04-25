<x-filament-panels::page>
    <form wire:submit.prevent="create">
        {{ $this->form }}

        <div class="mt-6 flex justify-end">
            <x-filament::button
                type="submit"
                size="lg"
                class="w-full lg:w-auto"
            >
                Buat Order Sekarang
            </x-filament::button>
        </div>
    </form>
</x-filament-panels::page>
