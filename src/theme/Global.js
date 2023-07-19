import React, { useEffect, useState } from 'react'

import Lookup from "@site/src/components/Word/Lookup"
import Modal from '@site/src/components/Modal'
import QrCode from '@site/src/components/QrCode'

const throttle = (fn) => {
  let id
  return () => {
    if (id) clearTimeout(id)
    id = setTimeout(fn, 500)
  }
}

export default function Global() {
  const [selection, setSelection] = useState()
  useEffect(() => {
    const lookup = throttle(() => {
      const text = document.getSelection().toString().trim()
      setSelection(text)
    })
    document.addEventListener('pointerup', lookup)
    return () => {
      document.removeEventListener('pointerup', lookup)
    }
  }, [true])
  return (
      <>
        <Modal open={!!selection}>
          {selection && <Lookup>{selection}</Lookup>}
        </Modal>
        <QrCode />
      </>
  )
}
