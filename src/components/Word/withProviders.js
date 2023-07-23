import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react'

export const Context = createContext(null)

const init = (props, setter) => {
  const [ word, partOfSpeech, defIndex = 1] = props.children.split('/')
  const card = props.card ?? (partOfSpeech ? 'compact' : 'completed')
  setter({
    card,
    word,
    partOfSpeech,
    defIndex,
  })
}

function Providers(props) {
  const { card, children, Component } = props
  const [local, setLocal] = useState({})
  const setCard = useCallback((card) => setLocal({ ...local, card }), [local])
  const setData = useCallback((data) => setLocal({ ...local, data }), [local])
  useEffect(() => init(props, setLocal), [children, card])
  const context = useMemo(() => ({
    ...local,
    setCard,
    setData,
  }), [local])
  return (
      <Context.Provider value={context}>
        <Component {...props} context={context} />
      </Context.Provider>
  )
}

const withProviders = (Component) => (props) => (
    <Providers {...props} Component={Component} />
)
export default withProviders
