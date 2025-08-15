'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

type Lang = 'en' | 'sq';

const translations: Record<Lang, Record<string, string>> = {
  en: {
    // General
    language: 'Language',
    back: 'Back',
    asc: 'ASC',
    desc: 'DESC',

    // Brands Page
    hero_title: 'Browse top quality <span class="highlight">Guitars</span> online',
    hero_sub: 'Explore 50k+ latest collections of branded guitars online with VibeStrings.',
    brands_title: 'Featuring the <span class="highlight">Best Brands</span>',
    brands_sub: 'Select your preferred brand and explore our exquisite collection.',
    search_placeholder: 'Search models...',
    loading_brands: 'Loading brands...',
    error_loading_brands: 'Error loading brands',
    no_results: 'No results.',
    no_brands_found: 'No brands found.',

    // Features Section
    smooth_browsing: 'SMOOTH BROWSING',
    easy_delivery: 'EASY DELIVERY',
    swift_payments: 'SWIFT PAYMENTS',
    lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',

    // App Section
    app_title: 'Browse and buy your <span class="highlight">favorite guitars</span> with VibeStrings.',

    // Brand Details
    back_to_home: '← Back To Home',
    brand_hero_title: 'Play like a <span class="highlight">Rock star</span>',
    brand_hero_desc: 'With a legacy dating back to the 1960s, {brand} blends expert craftsmanship with cutting-edge innovation to deliver guitars that inspire creativity and elevate your performance.',
    selection_title: 'Check out the <span class="highlight">Selection</span>',
    filter_by_type: 'Filter by type',
    type_all: 'All',
    type_electric: 'Electric',
    type_acoustic: 'Acoustic',
    type_bass: 'Bass',
    search_by_name: 'Search by name',

    // Model Details
    back_to_list: '← Back To List',
    tab_specs: 'Specification',
    tab_musicians: 'Who plays it?',

    // Footer
    footer_pages: 'PAGES',
    footer_store: 'Store',
    footer_collections: 'Collections',
    footer_support: 'Support',
    footer_product: 'PRODUCT',
    footer_terms: 'Terms',
    footer_privacy: 'Privacy Policy',
    footer_copyright: 'Copyright',
    footer_follow: 'FOLLOW US',
    footer_facebook: 'Facebook',
    footer_twitter: 'Twitter',
    footer_instagram: 'Instagram',
    footer_rights: '© {year} GuitarDB. All rights reserved.',
    footer_about: 'About'
  },
  sq: {
    // General
    language: 'Gjuha',
    back: 'Kthehu',
    asc: 'NGJITËS',
    desc: 'ZBRITËS',

    // Brands Page
    hero_title: 'Shfleto kitarat me <span class="highlight">cilësi të lartë</span> online',
    hero_sub: 'Eksploro mbi 50 mijë koleksione të fundit të kitarave të markave me VibeStrings.',
    brands_title: 'Duke prezantuar <span class="highlight">Markat më të mira</span>',
    brands_sub: 'Zgjidh markën tënde të preferuar dhe eksploro koleksionin tonë të jashtëzakonshëm.',
    search_placeholder: 'Kërko modele...',
    loading_brands: 'Po ngarkohen markat...',
    error_loading_brands: 'Gabim gjatë ngarkimit të markave',
    no_results: 'Asnjë rezultat.',
    no_brands_found: 'Nuk u gjet asnjë markë.',

    // Features Section
    smooth_browsing: 'SHFLETIM I LEHTË',
    easy_delivery: 'DËRGESË E LEHTË',
    swift_payments: 'PAGESA TË SHPEJTA',
    lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',

    // App Section
    app_title: 'Shfleto dhe bli <span class="highlight">kitarat e tua të preferuara</span> me VibeStrings.',

    // Brand Details
    back_to_home: '← Kthehu në faqen kryesore',
    brand_hero_title: 'Luaj si një <span class="highlight">Yll Rock-u</span>',
    brand_hero_desc: 'Me një trashëgimi që daton që nga vitet 1960, {brand} kombinon mjeshtërinë me inovacionin modern për të sjellë kitara që frymëzojnë kreativitetin dhe përmirësojnë performancën tuaj.',
    selection_title: 'Shiko <span class="highlight">zgjedhjen</span>',
    filter_by_type: 'Filtro sipas llojit',
    type_all: 'Të gjitha',
    type_electric: 'Elektrike',
    type_acoustic: 'Akustike',
    type_bass: 'Bas',
    search_by_name: 'Kërko sipas emrit',

    // Model Details
    back_to_list: '← Kthehu në listë',
    tab_specs: 'Specifikimet',
    tab_musicians: 'Kush e përdor?',

    // Footer
    footer_pages: 'FAQET',
    footer_store: 'Dyqani',
    footer_collections: 'Koleksionet',
    footer_support: 'Mbështetja',
    footer_product: 'PRODUKTI',
    footer_terms: 'Kushtet',
    footer_privacy: 'Politika e Privatësisë',
    footer_copyright: 'Të drejtat e autorit',
    footer_follow: 'NA NDIQNI',
    footer_facebook: 'Facebook',
    footer_twitter: 'Twitter',
    footer_instagram: 'Instagram',
    footer_rights: '© {year} GuitarDB. Të gjitha të drejtat e rezervuara.',
    footer_about: 'Rreth nesh'
  }
};

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: string, vars?: Record<string, string | number>) => string } | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? (localStorage.getItem('lang') as Lang | null) : null;
    if (saved) setLang(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const t = (k: string, vars: Record<string, string | number> = {}) => {
    let text = translations[lang][k] ?? k;
    Object.entries(vars).forEach(([key, value]) => {
      text = text.replace(`{${key}}`, String(value));
    });
    return text;
  };

  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>;
}

export function useT() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error('useT must be used within LanguageProvider');
  return ctx;
}
