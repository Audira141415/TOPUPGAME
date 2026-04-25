@php
    $routeName = request()->route()?->getName() ?? '';
    
    $color = match(true) {
        str_contains($routeName, 'payment-methods') => '#00FFFF',
        str_contains($routeName, 'promos') || str_contains($routeName, 'vouchers') => '#FF00FF',
        str_contains($routeName, 'flash-sales') => '#3B82F6',
        str_contains($routeName, 'banners') => '#8B5CF6',
        str_contains($routeName, 'users') => '#4F46E5',
        str_contains($routeName, 'games') => '#F59E0B',
        str_contains($routeName, 'categories') => '#06B6D4',
        str_contains($routeName, 'products') => '#FFDE00',
        str_contains($routeName, 'orders') => '#10B981',
        str_contains($routeName, 'providers') || str_contains($routeName, 'technical') => '#6366F1',
        str_contains($routeName, 'support-tickets') => '#EC4899',
        str_contains($routeName, 'manual-order') => '#8B5CF6',
        str_contains($routeName, 'settings') => '#64748B',
        default => '#FFDE00',
    };
    
    $description = match(true) {
        str_contains($routeName, 'payment-methods') => 'CONFIGURE YOUR GATEWAYS AND TRANSACTION FLOWS.',
        str_contains($routeName, 'promos') => 'MANAGE YOUR MARKETING CAMPAIGNS.',
        str_contains($routeName, 'flash-sales') => 'SET UP TIME-LIMITED HOT DEALS AND DISCOUNTS.',
        str_contains($routeName, 'vouchers') => 'GENERATE AND MANAGE EXCLUSIVE GIFT CODES.',
        str_contains($routeName, 'banners') => 'CURATE YOUR PLATFORM VISUALS AND BANNER SLIDES.',
        str_contains($routeName, 'users') => 'MANAGE USER PRIVILEGES AND SECURITY SETTINGS.',
        str_contains($routeName, 'games') => 'MANAGE YOUR MOBILE & PC GAME SELECTION.',
        str_contains($routeName, 'categories') => 'ORGANIZE YOUR PRODUCTS INTO LOGICAL GROUPS.',
        str_contains($routeName, 'products') => 'CURATE YOUR PRODUCT PRICING AND AVAILABILITY.',
        str_contains($routeName, 'orders') => 'MONITOR AND PROCESS ALL INCOMING CUSTOMER ORDERS.',
        str_contains($routeName, 'providers') => 'MANAGE YOUR API PROVIDERS AND BACKEND INTEGRATIONS.',
        str_contains($routeName, 'support-tickets') => 'PROVIDE WORLD-CLASS ASSISTANCE TO YOUR GAMERS.',
        str_contains($routeName, 'manual-order') => 'EXECUTE DIRECT TOP-UPS WITH OVERRIDE CONTROL.',
        str_contains($routeName, 'settings') => 'CONFIGURE GLOBAL SYSTEM PREFERENCES AND API KEYS.',
        default => 'MANAGE YOUR TOP-UP EMPIRE WITH PRECISION AND STYLE.',
    };

    $image = match(true) {
        str_contains($routeName, 'payment-methods') => '/images/admin/payment-character.png',
        str_contains($routeName, 'promos') || str_contains($routeName, 'vouchers') => '/images/admin/promo-character.png',
        str_contains($routeName, 'flash-sales') => '/images/admin/flash-sales-character.png',
        str_contains($routeName, 'banners') => '/images/admin/banners-character.png',
        str_contains($routeName, 'users') => '/images/admin/user-character.png',
        str_contains($routeName, 'games') => '/images/admin/games-character.png',
        str_contains($routeName, 'categories') => '/images/admin/categories-character.png',
        str_contains($routeName, 'products') => '/images/admin/catalog-character.png',
        str_contains($routeName, 'orders') => '/images/admin/orders-character.png',
        str_contains($routeName, 'providers') => '/images/admin/technical-character.png',
        str_contains($routeName, 'support-tickets') => '/images/admin/support-character.png',
        str_contains($routeName, 'manual-order') => '/images/admin/hero-character.png',
        str_contains($routeName, 'settings') => '/images/admin/settings-character.png',
        default => '/images/admin/hero-character.png',
    };
@endphp

<div class="filament-widgets-hero-widget" style="margin-bottom: 3.5rem; margin-top: -1rem;">
    <div style="position: relative; overflow: hidden; border: 5px solid black; background-color: {{ $color }}; box-shadow: 15px 15px 0px 0px rgba(0,0,0,1); min-height: 280px; display: flex; align-items: center;">
        
        {{-- Decorative Grid --}}
        <div style="position: absolute; inset: 0; opacity: 0.2; pointer-events: none; background-image: radial-gradient(#000 2px, transparent 0); background-size: 25px 25px;"></div>
        
        {{-- Left Content: Text --}}
        <div style="position: relative; z-index: 10; padding: 3rem; flex: 1; max-width: 65%;">
            <div style="display: inline-block; background-color: black; color: white; padding: 0.25rem 0.75rem; font-weight: 950; text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.75rem; margin-bottom: 1.5rem;">
                CORE SYSTEM :: ADMIN CENTER
            </div>
            
            <h1 style="font-size: 4rem; font-weight: 950; font-style: italic; text-transform: uppercase; line-height: 0.85; margin-bottom: 1.5rem; letter-spacing: -0.05em; color: black;">
                {{ $title ?? 'ADMIN DASHBOARD' }}
            </h1>
            
            <p style="font-size: 1.25rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em; color: black; margin: 0; line-height: 1.1;">
                {{ $description }}
            </p>
        </div>

        {{-- Right Content: Character Image --}}
        <div style="position: absolute; right: 0; bottom: 0; height: 115%; width: 40%; z-index: 20; display: flex; align-items: flex-end; justify-content: center;">
            <img src="{{ $image }}" style="height: 100%; width: auto; object-fit: contain; filter: drop-shadow(15px 15px 0px rgba(0,0,0,0.4)); transform: scale(1.1) translateX(15px);" alt="Character">
        </div>

        {{-- Floating Badge --}}
        <div style="position: absolute; top: 25px; right: 35%; background-color: #FF00FF; color: white; border: 4px solid black; padding: 0.5rem 1.5rem; font-weight: 950; font-style: italic; transform: rotate(4deg); z-index: 25; box-shadow: 6px 6px 0px black;">
            PREMIUM ACCESS
        </div>
    </div>
</div>
