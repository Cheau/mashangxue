import React, { createContext, useState } from 'react'

export const CardContext = createContext(null)
export const WordContext = createContext(null)
export const DataContext= createContext(null)

function Providers({ children }) {
  const [card, setCard] = useState()
  const [word, setWord] = useState()
  const [partOfSpeech, setPartOfSpeech] = useState()
  const [defIndex, setDefIndex] = useState()
  const [data, setData] = useState()
  return (
      <CardContext.Provider value={{ card, setCard }}>
        <WordContext.Provider value={{
          word,
          partOfSpeech,
          defIndex,
          setWord: (text = '') => {
            const [_word, _partOfSpeech, _defIndex = 1] = text.split('/')
            setWord(_word)
            setPartOfSpeech(_partOfSpeech)
            setDefIndex(_defIndex)
            setCard(_partOfSpeech ? 'compact' : 'completed')
          }
        }}>
          <DataContext.Provider value={{ data, setData }}>
            {children}
          </DataContext.Provider>
        </WordContext.Provider>
      </CardContext.Provider>
  )
}

const withProviders = (Component) => (props) => <Providers><Component {...props} /></Providers>
export default withProviders
