import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  // enable sandbox flag for Pi dev testing
  if (typeof window !== "undefined") window.__PI_SANDBOX = true;
  return <Component {...pageProps} />;
}
