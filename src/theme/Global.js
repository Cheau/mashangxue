import React from 'react'

import HotKey from '@site/src/components/HotKey'
import Lookup from "@site/src/components/Word/Lookup"
import Sidebar from '@site/src/components/Sidebar'

export default function Global() {
  return (
      <>
        <HotKey />
        <Lookup />
        <Sidebar />
      </>
  )
}
