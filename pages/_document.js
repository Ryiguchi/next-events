import Document, { Html, Head, Main, NextScript } from 'next/document';

// can be used for portals to send overlays to the DOM node with id="overlays"
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <div id="overlays"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
