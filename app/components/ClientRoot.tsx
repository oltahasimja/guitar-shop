'use client';

import ApolloWrapper from './ApolloWrapper';
import { LanguageProvider, useT } from '../lib/i18n';
import Link from 'next/link';


export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ApolloWrapper>
        <div className="container">
          <header className="header">
            <Link href="/brand"><h1>Online Guitar Shop</h1></Link>
          </header>
          <main>{children}</main>
          <SiteFooter />
        </div>
      </ApolloWrapper>
    </LanguageProvider>
  );
}

function SiteFooter() {
  const { lang, setLang, t } = useT();
  return (
    <footer className="footer">
      <span>{t('language')}:</span>
      <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
      <button className={lang === 'sq' ? 'active' : ''} onClick={() => setLang('sq')}>SQ</button>
    </footer>
  );
}