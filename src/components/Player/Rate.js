import React from 'react'

import { IonSelect, IonSelectOption } from '@ionic/react'

export default function Rate({ onChange, value }) {
  const rates = [1.2, 1.1, '1.0', 0.9, 0.8]
  return (
    <IonSelect
      interface="popover"
      mode="ios"
      onIonChange={({ detail }) => onChange(detail.value)}
      value={value}
    >
      {rates.map((rate) => (
        <IonSelectOption key={rate} value={Number(rate)}>{rate}x</IonSelectOption>
      ))}
    </IonSelect>
  )
}
