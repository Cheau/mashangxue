import React, { useEffect, useMemo, useState } from 'react'
import { createScheduler, createWorker } from 'tesseract.js'

export default function Ocr({
  height = 360,
  lang = 'eng',
  width = 640,
  video,
}) {
  const scheduler = useMemo(createScheduler, [])
  const [messages, setMessages] = useState([])
  let timerId
  const doOcr = async () => {
    const canvas = document.createElement('canvas')
    canvas.height = height
    canvas.width = width
    canvas.getContext('2d').drawImage(video, 0, 0, width, height)
    const { data: { text } } = await scheduler.addJob('recognize', canvas)
    console.log(`Recognized: ${text}`)
  }
  useEffect(async () => {
    console.log('Initializing OCR...')
    for (let i = 0; i < 4; i++) {
      const worker = createWorker()
      await worker.load()
      await worker.loadLanguage(lang)
      await worker.initialize(lang)
      scheduler.addWorker(worker)
    }
    console.log('Initialized OCR.')
    video.addEventListener('play', () => {
      timerId = setInterval(doOcr, 1000)
    })
    video.addEventListener('pause', () => clearInterval(timerId))
    console.log('The video can be played now.')
    video.controls = true
  }, [video])
}
