import type { Metadata } from 'next';
import ApolloWrapper from './components/ApolloWrapper';
import { LanguageProvider, useT } from './lib/i18n';
import  ClientRoot  from './components/ClientRoot';
import './globals.css';

export const metadata: Metadata = {
  title: 'Online Guitar Shop',
  description: 'Intern assignment',
};

function Footer() {
  // client-only footer (language switch) inside a client boundary:
  return (
    <div className="footer">
      {/* ts-expect-error Server boundary rendering client component inside */}
      <FooterInner />
    </div>
  );
}

// separate client component so layout can remain a server component
function FooterInner() {
  // this will actually fail at runtime because it's not marked client; fix by making a separate file
  return null;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Client wrappers must be inside client components: */}
        {/* We'll create a ClientRoot to host both providers */}
        {/* ts-expect-error Server boundary rendering client component */}
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
