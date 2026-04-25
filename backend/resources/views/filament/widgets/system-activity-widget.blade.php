<x-filament-widgets::widget>
    <x-filament::section>
        <div class="flex items-center justify-between gap-x-3">
            <h2 class="text-lg font-bold tracking-tight">Notifikasi Sistem</h2>
            <x-filament::link href="/admin/logs" size="sm" color="gray">
                Lihat Semua
            </x-filament::link>
        </div>

        <div class="mt-4 space-y-5">
            @foreach($this->getActivities() as $activity)
                <div class="flex gap-x-3">
                    <div class="mt-1 shrink-0">
                        @php
                            $iconColor = match($activity['type']) {
                                'success' => 'text-success-600 bg-success-50',
                                'warning' => 'text-warning-600 bg-warning-50',
                                'danger' => 'text-danger-600 bg-danger-50',
                                default => 'text-info-600 bg-info-50',
                            };
                        @endphp
                        <div class="p-1.5 rounded-lg {{ $iconColor }}">
                            <x-filament::icon
                                :icon="$activity['icon']"
                                class="w-5 h-5"
                            />
                        </div>
                    </div>
                    
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold leading-tight text-gray-900">{{ $activity['title'] }}</p>
                        <p class="mt-0.5 text-xs text-gray-500">{{ $activity['description'] }} • {{ $activity['time'] }}</p>
                    </div>
                </div>
            @endforeach
        </div>
    </x-filament::section>
</x-filament-widgets::widget>
