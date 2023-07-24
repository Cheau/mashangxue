import React, { useEffect, useState } from 'react'

import Lookup from "@site/src/components/Word/Lookup"
import QrCode from '@site/src/components/QrCode'

export default function Global() {
  const [selection, setSelection] = useState()
  useEffect(() => {
    const lookup = () => {
      const text = document.getSelection().toString().trim()
      if (text) setSelection(text)
    }
    document.addEventListener('selectionchange', lookup)
    return () => {
      document.removeEventListener('selectionchange', lookup)
    }
  }, [true])
  return (
      <>
        {selection && <Lookup onClose={() => setSelection()}>{selection}</Lookup>}
        <QrCode />
      </>
  )
}
