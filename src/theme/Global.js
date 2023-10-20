import React from 'react'

import HotKey from '@site/src/components/HotKey'
import Lookup from "@site/src/components/Word/Lookup"
import QrCode from '@site/src/components/QrCode'

export default function Global() {
  return (
      <>
        <HotKey />
        <Lookup />
        <QrCode />
      </>
  )
}
