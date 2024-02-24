import type { AppProps } from 'next/app';
import { Sofia_Sans } from 'next/font/google';
import '../styles/globals.scss';
import 'regenerator-runtime/runtime';

const customfont = Sofia_Sans({
  subsets: ['latin'],
  variable: '--font-customfont',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={customfont.className}>
      <Component {...pageProps} />
    </main>
  );
}
