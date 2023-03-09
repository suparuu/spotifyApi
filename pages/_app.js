import "@/styles/globals.css";
import Script from "next/script";
import Headmeta from './Headmeta'
import { SessionProvider } from "next-auth/react"


export default function App({ 
    Component,
    pageProps: { session, ...pageProps },}) {

  return (
    <>
    <SessionProvider session={session}>
      <Headmeta/>
      <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
