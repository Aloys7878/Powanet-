// pages/_app.jsx
import '../styles/globals.css';
import Head from 'next/head';
import Script from 'next/script';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>POWANET v4 — Quantum Global</title>
      </Head>

      {/* Guardian script (auto-restore / anti-blackscreen) */}
      <Script src="/guardian.js" strategy="beforeInteractive" />

      {/* Optional visual-fix auto-restore */}
      <Script src="/powanet-visual-fix.js" strategy="afterInteractive" />

      <Component {...pageProps} />
    </>
  );
}
