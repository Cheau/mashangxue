import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useHookstate } from '@hookstate/core'
import Landscape from '@site/src/components/HomepageFeatures/Landscape'
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Carousel from '@site/src/components/Gallery/Carousel'
import Gallery from '@site/src/components/Gallery'

import styles from './index.module.css';

function Subtitle() {
  const { siteConfig } = useDocusaurusContext()
  const tagline = useHookstate(true)
  useEffect(() => {
    const timeId = setInterval(() => tagline.set(!tagline.value), 3000)
    return () => clearInterval(timeId)
  }, [])
  if (tagline.value) {
    return <p className="hero__subtitle">{siteConfig.tagline}</p>
  }
  return (
    <div className={styles.buttons}>
      <Link
        className="button button--secondary button--lg"
        to="/blog/intro">
        Just do IT - 2min ⏱️
      </Link>
    </div>
  )
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <Subtitle />
        <Carousel />
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <Landscape />
        <Gallery />
      </main>
    </Layout>
  );
}
