/**
 * @see @docusaurus/theme-classic/src/theme/Layout.
 *
 */

import React from 'react'
import { Analytics } from '@vercel/analytics/react'
import clsx from 'clsx'
import ErrorBoundary from '@docusaurus/ErrorBoundary'
import {PageMetadata, ThemeClassNames} from '@docusaurus/theme-common'
import {useKeyboardNavigation} from '@docusaurus/theme-common/internal'
import SkipToContent from '@theme/SkipToContent'
import AnnouncementBar from '@theme/AnnouncementBar'
import Navbar from '@theme/Navbar'
import Footer from '@theme/Footer'
import LayoutProvider from '@theme/Layout/Provider'
import ErrorPageContent from '@theme/ErrorPageContent'
import styles from '@docusaurus/theme-classic/lib/theme/Layout/styles.module.css'

import Global from './Global'

export default function Layout(props) {
  const {
    children,
    noFooter,
    wrapperClassName,
    // Not really layout-related, but kept for convenience/retro-compatibility
    title,
    description,
  } = props

  useKeyboardNavigation()

  return (
      <LayoutProvider>
        <PageMetadata title={title} description={description} />

        <SkipToContent />

        <AnnouncementBar />

        <Navbar />

        <div
            className={clsx(
                ThemeClassNames.wrapper.main,
                styles.mainWrapper,
                wrapperClassName,
            )}>
          <ErrorBoundary fallback={(params) => <ErrorPageContent {...params} />}>
            {children}
          </ErrorBoundary>
        </div>

        <Global />
        <Analytics />

        {!noFooter && <Footer />}
      </LayoutProvider>
  )
}
