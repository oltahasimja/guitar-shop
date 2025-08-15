'use client';

import { useQuery, gql } from '@apollo/client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useT } from '../../lib/i18n';
import './brandDetails.css';

const GET_BRAND_DETAILS = gql`
  query FindBrandModels($id: ID!, $sortBy: sortBy!) {
    findUniqueBrand(id: $id) {
      id
      name
      origin
      image
    }
    findBrandModels(id: $id, sortBy: $sortBy) {
      id
      name
      type
      price
      image
    }
  }
`;

interface GuitarModel {
  id: string;
  name: string;
  image?: string;
  price: number;
  type?: string;
}

export default function BrandDetailsPage() {
  const { t } = useT();
  const params = useParams();
  const id = params?.id as string;

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data, loading, error } = useQuery(GET_BRAND_DETAILS, {
    variables: {
      id,
      sortBy: { field: 'name', order: 'ASC' }
    },
    skip: !id
  });

  if (loading) return <p className="loading">{t('loading_brands')}</p>;
  if (error) return <p className="error">{t('error_loading_brands')}: {error.message}</p>;
  if (!data) return null;

  const { findUniqueBrand: brand, findBrandModels: models } = data;

  // Apply search + filter
  const filteredModels = models.filter((m: GuitarModel) => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'All' || m.type === filterType;
    return matchesSearch && matchesType;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredModels.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedModels = filteredModels.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="brand-details-page">
      {/* Back Link */}
      <Link href="/brand" className="back-link">
        ← {t('back_to_home')}
      </Link>

      {/* Hero */}
      <section className="brand-hero">
        <div className="brand-text">
          <h1 dangerouslySetInnerHTML={{ __html: t('brand_hero_title') }} />
          <p dangerouslySetInnerHTML={{ __html: t('brand_hero_desc', { brand: brand.name }) }} />
        </div>
        <div className="brand-logo">
          {brand.image?.startsWith('http') ? (
            <img src={brand.image} alt={brand.name} width={200} height={200} />
          ) : (
            <Image src={brand.image || '/images/placeholder.png'} alt={brand.name} width={200} height={200} />
          )}
        </div>
      </section>

      {/* Selection */}
      <section className="guitar-list">
        <h2 dangerouslySetInnerHTML={{ __html: t('selection_title') }} />

        {/* Filters */}
        <div className="filters">
          <select
            className="filter-select"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">{t('filter_by_type')}</option>
            <option value="Electric">{t('type_electric')}</option>
            <option value="Acoustic">{t('type_acoustic')}</option>
            <option value="Bass">{t('type_bass')}</option>
          </select>
          <input
            type="text"
            placeholder={t('search_by_name')}
            className="search-input"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Models Grid */}
        <div className="models-grid">
          {paginatedModels.map((model: GuitarModel) => (
            <Link href={`/brand/${id}/model/${model.id}`} key={model.id}>
              <div className="model-card">
                {model.image?.startsWith('http') ? (
                  <img src={model.image} alt={model.name} width={250} height={150} />
                ) : (
                  <Image
                    src={model.image || '/images/placeholder.png'}
                    alt={model.name}
                    width={250}
                    height={150}
                  />
                )}
                <h3>{model.name}</h3>
                <p>${model.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-left">
          <Image src="/logo.svg" alt="VibeStrings" width={40} height={40} />
          <span>VibeStrings</span>
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
