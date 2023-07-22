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
    document.addEventListener('pointerup', lookup)
    return () => {
      document.removeEventListener('pointerup', lookup)
    }
  }, [true])
  return (
      <>
        {selection && <Lookup>{selection}</Lookup>}
        <QrCode />
      </>
  )
}
