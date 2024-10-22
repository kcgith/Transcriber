import React from 'react'

import { useState, useRef, useEffect } from 'react'
import MainPage from './Pages/MainPage'
import Header from './Pages/Header'
import Information from './Pages/Information'
import FileDisplay from './Pages/FileDisplay'
import Transcribing from './Pages/Transcribing'
import { MessageTypes } from './utils/presets'

function App() {
  const [file, setFile] = useState(null)
  const [audioStream, setAudioStream] = useState(null)
  const [output, setOutput] = useState(null)
  const [downloading, setDownloading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)

  const isAudioAvailable = file || audioStream

  function handleAudioReset() {
    setFile(null)
    setAudioStream(null)
  }

  const worker = useRef(null)

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('./utils/whisper.worker.js', import.meta.url), {
        type: 'module'
      })
    }

    const onMessageReceived = async (e) => {
      switch (e.data.type) {
        case 'DOWNLOADING':
          setDownloading(true)
          console.log('DOWNLOADING')
          break;
        case 'LOADING':
          setLoading(true)
          console.log('LOADING')
          break;
        case 'RESULT':
          setOutput(e.data.results)
          console.log(e.data.results)
          break;
        case 'INFERENCE_DONE':
          setFinished(true)
          console.log("DONE")
          break;
      }
    }

    worker.current.addEventListener('message', onMessageReceived)

    return () => worker.current.removeEventListener('message', onMessageReceived)
  })

  async function readAudioFrom(file) {
    const sampling_rate = 16000
    const audioCTX = new AudioContext({ sampleRate: sampling_rate })
    const response = await file.arrayBuffer()
    const decoded = await audioCTX.decodeAudioData(response)
    const audio = decoded.getChannelData(0)
    return audio
  }

  async function handleFormSubmission() {
    if (!file && !audioStream) { return }

    let audio = await readAudioFrom(file ? file : audioStream)
    const model_name = 'openai/whisper-tiny.en'

    worker.current.postMessage({
      type: MessageTypes.INFERENCE_REQUEST,
      audio,
      model_name  
    })
  }

 return (
  <div className="flex flex-col md:flex-row h-screen">
        
        
        <div className=" w-full md:w-1/2 h-1/2 md:h-full  bg-gradient-to-r from-blue-900 via-darkblue-500 to-blue-100 flex items-center justify-center">
          <div className="flex sm:h-1/2 flex-col word-container  space-y-4 text-6xl font-bold text-white">
            <span className="animated-word">Record.</span>
            <span className="animated-word !text-gray-700 bold ">Transcribe.</span>
            <span className="animated-word">Translate.</span>
            <span className='animated-word text-sm font-mono'>Record a chunk of audio or upload and convert to text</span>
          </div>
        </div>
    
        
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-white flex flex-col items-center justify-center">

          <a href="/" className='flex items-center gap-2 specialBtn px-3 py-2 rounded-lg text-blue-400'>
                    <p>Record New</p>
                    <i className="fa-solid fa-plus"></i> </a>
          
            <section >
            <Header/>
            {output ? (
              <Information output={output} finished={finished}/>
            ) : loading ? (
              <Transcribing />
            ) : isAudioAvailable ? (
              <FileDisplay handleFormSubmission={handleFormSubmission} handleAudioReset={handleAudioReset} file={file} audioStream={audioStream} />
            ) : (
              <MainPage setFile={setFile} setAudioStream={setAudioStream} />
            )}
          </section>
          
          
        </div>
      </div>
        )
  }
export default App
