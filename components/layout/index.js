import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import CrystallizeLayout from '@crystallize/react-layout';
import { IntlProvider } from 'react-intl';
import { useQuery } from 'urql';

import AuthGate from 'components/auth-context';
import { Spinner } from 'ui';
import GlobalStyle from 'ui/global';
import { SettingsProvider } from 'components/settings-context';

import Aside from './aside';
import Header from './header';
import {
  Main,
  LoadingWrapper,
  SpinnerWrapper,
  LoadingTextWrapper
} from './styles';

const Loader = ({ children }) => (
  <LoadingWrapper>
    <div>
      <SpinnerWrapper>
        <Spinner size="40" />
      </SpinnerWrapper>
      <LoadingTextWrapper>{children || 'Please wait...'}</LoadingTextWrapper>
    </div>
  </LoadingWrapper>
);

const Layout = ({ children, title, description, simple, loading }) => {
  /**
   * Set the default language.
   * You can also determine this any way you want.
   * For instance:
   *  - .com is "en"
   *  - .co.uk is "en"
   *  - .no is "no"
   */
  const language = 'en';

  const [queryResult] = useQuery({
    query: `
      query MENU_AND_TENANT($language: String!) {
        menu: catalogue(language: "en", path: "/") {
          ...item
          ...product
      
          children {
            ...item
            ...product
          }
        }
    
        tenant(language: $language) {
          name
          defaults {
            currency
            language
          }
        }
      }
    `,
    variables: {
      language
    }
  });

  const router = useRouter();

  if (queryResult.fetching) {
    return (
      <>
        <GlobalStyle />
        <Loader />
      </>
    );
  }

  const { data: menu } = queryResult;

  return (
    <>
      <Head>
        <title key="title">{title || ''}</title>
        {description && (
          <meta key="description" name="description" content={description} />
        )}

        {/* Set a canonical link for every page */}
        <link rel="canonical" href={`https://your.domain${router.asPath}`} />
      </Head>
      <GlobalStyle />
      <SettingsProvider language={language}>
        <IntlProvider locale={language}>
          <AuthGate>
            <CrystallizeLayout right={simple ? null : Aside}>
              <Header simple={simple} menuItems={menu} />
              <Main>{loading ? <Loader /> : children}</Main>
            </CrystallizeLayout>
          </AuthGate>
        </IntlProvider>
      </SettingsProvider>
    </>
  );
};

export default Layout;
