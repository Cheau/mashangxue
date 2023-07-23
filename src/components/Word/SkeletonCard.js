import React, { useContext } from 'react'

import { Context } from './withProviders'

function Block(props) {
  const style = {
    background: '#e0e0e0',
    borderRadius: '5px',
    height: '20px',
    marginTop: '10px',
    maxWidth: '100%',
    ...props
  }
  return <div style={style} />
}

export default function SkeletonCard() {
  const { word = '' } = useContext(Context)
  return (
      <>
        <Block marginTop="0" width={`${word.length * 18}px`} />
        <Block width="50px" />
        <Block width="100%" />
        <Block width="100%" />
        <Block width="100%" />
      </>
  )
}
