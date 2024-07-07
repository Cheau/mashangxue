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

const pages = {
  ad: [{
    description: '一键开启中医五音疗法的正确养生模式',
    image: '/img/e-tcm/player.png',
    keywords: ['电子中药', '养生音乐', '心肝脾肺肾'],
    link: '/e-tcm',
    rate: 3,
    title: 'E-TCM Player'
  }]
}

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

function HomepageHeader({ data }) {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <Subtitle />
        <Carousel data={data} />
      </div>
    </header>
  );
}

export default function Home({ recommend }) {
  const {siteConfig} = useDocusaurusContext();
  const { latest, random } = recommend
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader data={random} />
      <main>
        <Landscape />
        <Gallery data={pages} />
        <Gallery data={latest} />
      </main>
    </Layout>
  );
}
