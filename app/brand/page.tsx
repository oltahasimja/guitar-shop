'use client';
import { useQuery } from '@apollo/client';
import { GET_BRANDS } from '../graphql/queries';
import Link from 'next/link';
import Image from 'next/image';
import { useT } from '../lib/i18n';
import './brands.css';
import { useState } from 'react';
import SearchIcon from '../components/icons/SearchIcon';

interface Brand {
  id: string;
  name: string;
  origin?: string;
  image?: string;
  categories?: string[];
}

type TranslationFunction = (key: string) => string;

export default function BrandsPage() {
  const { t } = useT();
  const { data, loading, error } = useQuery<{ findAllBrands: Brand[] }>(GET_BRANDS);
  const [searchQuery, setSearchQuery] = useState('');

  if (loading) return <BrandsLoading t={t} />;
  if (error) return <BrandsError error={error} t={t} />;

  const filteredBrands = data?.findAllBrands?.filter(brand =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    brand.origin?.toLowerCase().includes(searchQuery.toLowerCase())
  ) ?? [];

  return (
    <div className="brands-page">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-text">
          <h1 dangerouslySetInnerHTML={{ __html: t('hero_title') }} />
          <p className="hero-sub">{t('hero_sub')}</p>
        </div>
        <div className="hero-image-wrapper">
          <Image src="hero-guitar.svg" alt="Guitar and amp" fill className="hero-image" />
        </div>
      </section>

      {/* BRANDS SECTION */}
      <section className="brands-section">
        <h2 dangerouslySetInnerHTML={{ __html: t('brands_title') }} />
        <p className="section-sub">{t('brands_sub')}</p>

        <div className="search-container">
          <SearchIcon className="search-icon" />
          <input
            type="text"
            placeholder={t('search_placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {filteredBrands.length === 0 ? (
          <NoBrandsFound t={t} searchQuery={searchQuery} />
        ) : (
          <div className="brands-grid">
            {filteredBrands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
        )}
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section">
        <div className="section">
          <div className="features-image">
            <Image src="emri.svg" alt="" width={404} height={404} />
          </div>

          <div className="features-row">
            <div className="feature-card">
              <Image src="smooth.svg" alt="" width={40} height={40} />
              <h3>{t('smooth_browsing')}</h3>
              <p>{t('lorem')}</p>
            </div>
            <div className="feature-card">
              <Image src="/icons/delivery.svg" alt="" width={40} height={40} />
              <h3>{t('easy_delivery')}</h3>
              <p>{t('lorem')}</p>
            </div>
            <div className="feature-card">
              <Image src="/icons/payments.svg" alt="" width={40} height={40} />
              <h3>{t('swift_payments')}</h3>
              <p>{t('lorem')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* APP SHOWCASE */}
      <section className="app-section">
        <div className="app-text">
          <h2 dangerouslySetInnerHTML={{ __html: t('app_title') }} />
          <div className="store-buttons">
            <Image src="googleplay.svg" alt="Google Play" width={140} height={40} />
            <Image src="appstore.svg" alt="App Store" width={140} height={40} />
          </div>
        </div>
        <div className="app-images">
          <Image src="app-mock1.svg" alt="App screen 1" width={200} height={400} />
          <Image src="app-mock2.svg" alt="App screen 2" width={200} height={400} />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">
          <Image src="/logo.svg" alt="VibeStrings" width={40} height={40} />
          <span>VibeStrings</span>
        </div>
        <div className="footer-info">
          <p>Enquiry@VibeStrings.com</p>
          <p>San Francisco</p>
        </div>
        <div className="footer-links">
          <div>
            <h4>{t('footer_pages')}</h4>
            <p>{t('footer_store')}</p>
            <p>{t('footer_collections')}</p>
            <p>{t('footer_support')}</p>
          </div>
          <div>
            <h4>{t('footer_product')}</h4>
            <p>{t('footer_terms')}</p>
            <p>{t('footer_privacy')}</p>
            <p>{t('footer_copyright')}</p>
          </div>
          <div>
            <h4>{t('footer_follow')}</h4>
            <p>{t('footer_facebook')}</p>
            <p>{t('footer_twitter')}</p>
            <p>{t('footer_instagram')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function BrandsLoading({ t }: { t: TranslationFunction }) {
  return (
    <div className="loading-state">
      <div className="loading-spinner"></div>
      <p>{t('loading_brands')}</p>
    </div>
  );
}

function BrandsError({ error, t }: { error: Error, t: TranslationFunction }) {
  return (
    <div className="error-state">
      <p>{t('error_loading_brands')}: {error.message}</p>
    </div>
  );
}

function NoBrandsFound({ t, searchQuery }: { t: TranslationFunction, searchQuery?: string }) {
  return (
    <div className="empty-state">
      <p>{searchQuery ? t('no_results') : t('no_brands_found')}</p>
    </div>
  );
}

function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link href={`/brand/${brand.id}`} className="brand-card">
      <div className="brand-image-container">
        <Image src={brand.image || '/images/placeholder.png'} alt={brand.name} width={160} height={80} className="brand-image" />
      </div>
    </Link>
  );
}
