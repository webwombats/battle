import useSWR from "swr";

import fetcher from "@utils/fetcher";

import "../styles/index.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
