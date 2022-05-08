import React, { useState, useEffect } from 'react'
import { useStopwatch } from 'react-timer-hook'

import Button from '../Button'
import {
  MicrophoneIcon,
  PauseIcon,
  RewindIcon,
  PlayIcon,
  CheckCircleIcon,
  FastForwardIcon,
} from '@heroicons/react/solid'

const Timer = (props) => {
  const {
    listQuestion,
    questionId,
    className,
    handleNext,
    handlePrev,
    ...others
  } = props
  const { seconds, minutes, start, pause, reset } = useStopwatch({
    autoStart: false,
  })
  const secondTime = seconds < 10 ? `0${seconds}` : `${seconds}`
  const minuteTime = minutes < 10 ? `0${minutes}` : `${minutes}`

  const [isPlaying, setPlaying] = useState(false)
  const [isPause, setPause] = useState(false)
  const [question, setQuestion] = useState('')

  const handleStart = async () => {
    setPlaying(true)
    const res = await handleVoice()
    console.log(res)
    if (res) start()
  }

  const handleVoice = () => {
    const promise = new Promise((resolve, reject) => {
      const synth = window.speechSynthesis
      let msg = new SpeechSynthesisUtterance()
      msg.text = question

      synth.speak(msg)
      msg.onend = () => {
        resolve(true)
      }
    })

    return promise
  }

  const handlePause = () => {
    pause()
    setPause(true)
  }

  const handleContinue = () => {
    start()
    setPause(false)
  }

  const handleReset = () => {
    setPlaying(false)
    setPause(false)
    reset(undefined, false)
  }

  const handleNextPrev = (type) => {
    handleReset()
    setPause(false)

    if (type === 'prev') handlePrev()
    if (type === 'next') handleNext()
  }

  const getData = () => {
    const currentQuestion = listQuestion.find((item) => item.id === questionId)
    if (currentQuestion) {
      const { question: tempQuestion } = currentQuestion
      setQuestion(tempQuestion)
    }
  }

  useEffect(() => {
    getData()
    handleReset()
  }, [questionId])

  return (
    <div className={`flex justify-center ${className}`}>
      <div className="w-full bg-slate-200 p-4 rounded-md">
        {question && (
          <div className="flex justify-center items-center mb-8">
            <div className="relative h-10 w-10 rounded-full bg-gray-100 inline-flex items-center justify-center mr-4">
              {isPlaying && (
                <span className="animate-ping absolute h-10 w-10 rounded-full bg-blue-300 opacity-75"></span>
              )}
              <MicrophoneIcon className="h-5 w-5 text-slate-500" />
            </div>
            <div style={{ maxWidth: '80%' }}>
              <p className="text-slate-500">{question}</p>
            </div>
          </div>
        )}
        {!question && (
          <p className="text-slate-500 text-center mb-8">
            Please insert and pick your interview question below 😉
          </p>
        )}

        <p className="text-8xl font-bold text-slate-500 text-center mb-12">
          {minuteTime}:{secondTime}
        </p>

        {!isPlaying && (
          <Button
            className="bg-white hover:bg-grey-scale-100 text-grey-scale-600 block w-full justify-center"
            onClick={handleStart}
            disabled={!question}
          >
            <PlayIcon className="w-5 h-5 mr-2 text-slate-500" />
            Start
          </Button>
        )}

        {isPlaying && (
          <>
            {isPause ? (
              <Button
                className="bg-white hover:bg-grey-scale-100 text-grey-scale-600 block w-full justify-center mb-4"
                onClick={handleContinue}
              >
                <PlayIcon className="w-5 h-5 mr-2 text-slate-500" />
                Continue
              </Button>
            ) : (
              <Button
                className="bg-white hover:bg-grey-scale-100 text-grey-scale-600 block w-full justify-center mb-4"
                onClick={handlePause}
              >
                <PauseIcon className="w-5 h-5 mr-2 text-slate-500" />
                Pause
              </Button>
            )}

            <Button
              className="bg-white hover:bg-grey-scale-100 text-grey-scale-600 block w-full justify-center mb-4"
              onClick={handleReset}
            >
              <CheckCircleIcon className="w-5 h-5 mr-2 text-slate-500" />
              Finish
            </Button>
            <div className="flex space-x-2">
              <Button
                className="bg-white hover:bg-grey-scale-100 text-grey-scale-600 block w-full justify-center mb-4"
                onClick={() => handleNextPrev('prev')}
              >
                <RewindIcon className="w-5 h-5 mr-2 text-slate-500" />
                Previous Question
              </Button>
              <Button
                className="bg-white hover:bg-grey-scale-100 text-grey-scale-600 block w-full justify-center mb-4"
                onClick={() => handleNextPrev('next')}
              >
                <FastForwardIcon className="w-5 h-5 mr-2 text-slate-500" />
                Next Question
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Timer
