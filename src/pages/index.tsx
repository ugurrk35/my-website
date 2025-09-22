import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import Head from '@docusaurus/Head';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header
      className={clsx('hero hero--primary', styles.heroBanner)}
      style={{
        backgroundColor: '#d4edff',
        backgroundImage: 'url(/img/doc-bg-5.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container">
        <Heading as="h1" className="hero__title" style={{ color: '#000' }}>
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            style={{ color: '#000' }}
            to="/docs/intro"
          >
            Dökümasyonlara giriş için tıkalyın ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}
    >
      {/* Sayfa bazlı meta tag */}
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
