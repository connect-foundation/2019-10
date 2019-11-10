import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet as StyledComponentsSheet } from 'styled-components';
import { ServerStyleSheets as MaterialSheet } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

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
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
