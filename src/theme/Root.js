import React from 'react'
import { setupIonicReact } from '@ionic/react'

import '@ionic/react/css/core.css'

setupIonicReact()

// Default implementation, that you can customize
export default function Root({ children }) {
  return <>{children}</>
}