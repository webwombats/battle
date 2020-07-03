import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en" className="antialiased">
        <Head>
          {/* <link
            href="https://fonts.googleapis.com/css?family=Ubuntu:400,400i,500,500i,700|Merriweather:300,400,400i,700,900&display=swap&subset=cyrillic,cyrillic-ext"
            rel="stylesheet"
          /> */}
        </Head>

        <body className="px-0 sm:px-16 md:px-16 lg:px-16 bg-charade">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
