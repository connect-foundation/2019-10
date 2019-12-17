import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet as StyledComponentsSheet } from 'styled-components';
import { ServerStyleSheets as MaterialSheet } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import GlobalStyles from '../components/GlobalStyles';

class MyDocument extends Document {
  public static async getInitialProps(ctx) {
    const styledComponentsSheet = new StyledComponentsSheet();
    const materialSheet = new MaterialSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props =>
            materialSheet.collect(
              styledComponentsSheet.collectStyles(
                <>
                  <CssBaseline />
                  <GlobalStyles />
                  <App {...props} />
                </>,
              ),
            ),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {materialSheet.getStyleElement()}
            {styledComponentsSheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      styledComponentsSheet.seal();
    }
  }

  public render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/fonts/styles.css"
          />
        </Head>
        <body>
          <Main />
          <div id="modal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
