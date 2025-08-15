// app/components/page.tsx
'use client';

import Link from 'next/link';
import { useT } from './lib/i18n';

export default function HomePage() {
  const { t } = useT();
  
  return (
    <div className="home-content">
      <Link 
        href="/brand"
        className="brand-link"
      >
        {t('view_guitar_brands')} →
      </Link>
      
      {/* Add other home page content here */}
    </div>
  );
}