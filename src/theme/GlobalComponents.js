import React from 'react'

import Modal from '@site/src/components/Modal'
import Lookup from "../components/Word/Lookup"

function lookup() {
  const selection = document.getSelection()
  const text = selection.toString().trim()
  if (!text) return
  Modal.open(<Lookup>{text}</Lookup>)
}

function register() {
  if (typeof document === 'undefined') return
  document.addEventListener('pointerup', lookup)
}

register()
