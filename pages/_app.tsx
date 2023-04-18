// Legacy Stylesheets
import 'components/css/reset.css';
import 'components/css/base.css';
import 'components/css/layout.css';
import 'components/css/pager.css';
import 'components/css/components.css';
import 'components/css/article.css';

// Next API
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';

// modules and utils
import TagsProvider from 'modules/TagsProvider';
import ThemeProvider from 'modules/ThemeProvider';
import Compose from 'utils/Compose';

// Micellaneuous
import GlobalStyles from '@mui/material/GlobalStyles';
import { Analytics } from '@vercel/analytics/react';
import { Fragment } from 'react';
import SEOConfig from 'configs/next-seo.config';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <DefaultSeo {...SEOConfig} />
      <Compose components={[TagsProvider, ThemeProvider]}>
        <GlobalStyles
          styles={(theme) => {
            return {
              html: {
                fontFamily: `${theme.typography.fontFamily}`,
              },
            };
          }}
        />
        <Component {...pageProps} />
        <Analytics />
      </Compose>
    </Fragment>
  );
}
