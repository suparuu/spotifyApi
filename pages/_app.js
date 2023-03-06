import "@/styles/globals.css";
import Script from "next/script";
import Headmeta from './Headmeta'


export default function App({ Component, pageProps }) {
  return (
    <>
      <Headmeta/>
      <Component {...pageProps} />
    </>
  );
}
