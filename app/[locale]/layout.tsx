import { type ReactNode } from 'react';
import type { Metadata } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { ClerkProvider } from '@clerk/nextjs';
import { getClerkLocalization } from '@/common/getClerkLocalization';
import { Inter } from 'next/font/google';
import '../globals.css';
import { ChildrenProps } from '@/types/childrenProps';
import { Provider as JotaiProvider } from 'jotai';

export const metadata: Metadata = {
  title: 'VeridiBloc Dashboard'
};

const inter = Inter({ subsets: ['latin'] });

function WithTranslations({
  children,
  locale
}: { locale: string } & ChildrenProps) {
  const messages = useMessages();
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}

export default function RootLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale;
  return (
    <html lang={locale} className={inter.className}>
      <WithTranslations locale={locale}>
        <ClerkProvider
          localization={getClerkLocalization(locale)}
          signInUrl={`/${locale}/dashboard`}
          afterSignOutUrl={`/${locale}/signin`}
        >
          <JotaiProvider>
          <body>
            {children}
          </body>
          </JotaiProvider>
        </ClerkProvider>
      </WithTranslations>
    </html>
  );
}
