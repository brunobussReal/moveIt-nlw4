//this file allows to edit the root html file directly, so all static settings should be implemented here.
import Document, { Html, Head, Main, NextScript } from "next/document";

//recomended by next documentation
export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* since this file loads only once, all fonts will be loaded once as well, optimazing the application */}
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
