import { useEffect, useMemo } from 'react';

import { useBrandContext } from '@app/context/Brand';
import { useTailwindContext } from '@app/context/tailwind';

const FALLBACK_BRAND = 'aubuchon';

const isBrandAssetsAvailable = (brand = FALLBACK_BRAND) => {
    const pathMap = globalThis.__iconPaths__ || [];

    return pathMap.length > 0 && pathMap.includes(`assets/icons/${brand}`);
};

const buildBrandAssetPath = (asset, brand = FALLBACK_BRAND) =>
    `assets/icons/${brand}/${asset}`;

const getBrandAsset = (asset, brand = FALLBACK_BRAND) => {
    const host = window.location.origin;
    const resolveBrandId = isBrandAssetsAvailable(brand)
        ? brand
        : FALLBACK_BRAND;

    return `${host}/${buildBrandAssetPath(asset, resolveBrandId)}`;
};

export const usePWAManifest = () => {
    const tailwind = useTailwindContext();
    const [{ brand, brandOverride }] = useBrandContext();

    const brandInfo = useMemo(() => {
        return {
            name: brand?.name,
            identifier: brand?.identifier,
            themeColor: brand?.primary_color || tailwind.colors.green.DEFAULT
        };
    }, [brand?.name, brand?.identifier, brand?.primary_color, tailwind]);

    useEffect(() => {
        if (!brandInfo.name) return;

        const [shortName] = brandInfo.name.split(' ');
        const host = window.location.origin;
        const fullName = brandInfo.name;
        const brandRegex = /\/icons\/(\w)*\//;
        const faviconRegex = /Favicon-(\w)*-/;
        const manifestJSON = {
            name: fullName,
            short_name: shortName,
            start_url: host,
            theme_color: brandInfo.themeColor,
            display: 'standalone',
            background_color: brandInfo.themeColor,
            description: fullName,
            icons: [
                {
                    src: getBrandAsset(
                        'android-icon-48x48.png',
                        brandInfo.identifier
                    ),
                    sizes: '48x48',
                    type: 'image/png'
                },
                {
                    src: getBrandAsset(
                        'android-icon-72x72.png',
                        brandInfo.identifier
                    ),
                    sizes: '72x72',
                    type: 'image/png'
                },
                {
                    src: getBrandAsset(
                        'android-icon-96x96.png',
                        brandInfo.identifier
                    ),
                    sizes: '96x96',
                    type: 'image/png'
                },
                {
                    src: getBrandAsset(
                        'android-icon-144x144.png',
                        brandInfo.identifier
                    ),
                    sizes: '144x144',
                    type: 'image/png'
                },
                {
                    src: getBrandAsset(
                        'android-icon-168x168.png',
                        brandInfo.identifier
                    ),
                    sizes: '168x168',
                    type: 'image/png'
                },
                {
                    src: getBrandAsset(
                        'android-icon-192x192.png',
                        brandInfo.identifier
                    ),
                    sizes: '192x192',
                    type: 'image/png'
                },
                {
                    src: getBrandAsset(
                        'android-icon-512x512.png',
                        brandInfo.identifier
                    ),
                    sizes: '512x512',
                    type: 'image/png'
                },
                {
                    src: getBrandAsset(
                        'Apple_touch_icon.png',
                        brandInfo.identifier
                    ),
                    sizes: '180x180',
                    type: 'image/png'
                },
                {
                    src: getBrandAsset(
                        'apple-splash-640-1136.jpg',
                        brandInfo.identifier
                    ),
                    sizes: '640x1136',
                    type: 'image/png'
                },
                {
                    src: getBrandAsset(
                        'apple-splash-750-1334.jpg',
                        brandInfo.identifier
                    ),
                    sizes: '750x1334',
                    type: 'image/png'
                },
                {
                    src: getBrandAsset(
                        'apple-splash-1125-2436.jpg',
                        brandInfo.identifier
                    ),
                    sizes: '1125x2436',
                    type: 'image/png'
                },
                {
                    src: getBrandAsset(
                        'apple-splash-1242-2208.jpg',
                        brandInfo.identifier
                    ),
                    sizes: '1242x2208',
                    type: 'image/png'
                },
                {
                    src: getBrandAsset(
                        'apple-splash-1536-2048.jpg',
                        brandInfo.identifier
                    ),
                    sizes: '1536x2048',
                    type: 'image/png'
                },
                {
                    src: getBrandAsset(
                        'apple-splash-1668-2224.jpg',
                        brandInfo.identifier
                    ),
                    sizes: '1668x2224',
                    type: 'image/png'
                },
                {
                    src: getBrandAsset(
                        'apple-splash-2048-2732.jpg',
                        brandInfo.identifier
                    ),
                    sizes: '2048x2732',
                    type: 'image/png'
                }
            ]
        };

        const manifestElement = document.querySelector('link[rel="manifest"]');
        const themeColor = document.querySelector('meta[name="theme-color"]');
        const appleTouchIcons = document.querySelectorAll(
            'link[rel="apple-touch-icon"]'
        );
        const appleTouchStartupImages = document.querySelectorAll(
            'link[rel="apple-touch-startup-image"]'
        );
        const icons = document.querySelectorAll('link[rel="icon"]');
        const brandAssetId = isBrandAssetsAvailable(brandInfo.identifier)
            ? brandInfo.identifier
            : FALLBACK_BRAND;

        const appliedBrandId = brandOverride?.identifier || brandAssetId;

        appleTouchIcons.forEach(icon => {
            icon.setAttribute(
                'href',
                icon
                    .getAttribute('href')
                    .replace(brandRegex, `/icons/${appliedBrandId}/`)
            );
        });

        appleTouchStartupImages.forEach(icon => {
            icon.setAttribute(
                'href',
                icon
                    .getAttribute('href')
                    .replace(brandRegex, `/icons/${appliedBrandId}/`)
            );
        });

        icons.forEach(icon => {
            icon.setAttribute(
                'href',
                icon
                    .getAttribute('href')
                    .replace(brandRegex, `/icons/${appliedBrandId}/`)
                    .replace(faviconRegex, `Favicon-${appliedBrandId}-`)
            );
        });

        const blob = new Blob([JSON.stringify(manifestJSON)], {
            type: 'application/json'
        });
        const manifestURL = URL.createObjectURL(blob);
        manifestElement.setAttribute('href', manifestURL);
        themeColor.setAttribute('content', brandInfo.themeColor);
    }, [
        brandInfo.identifier,
        brandInfo.name,
        brandInfo.themeColor,
        brandOverride?.identifier
    ]);
};
