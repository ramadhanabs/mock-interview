/* External Import */
import React, { useState } from 'react'
import Image from 'next/image'
import { v4 as uuid } from 'uuid'

/* Internal Import */
import Navbar from '../components/Navbar'
import Timer from '../components/Timer'
import picture from '../public/illustration.png'
import Button from '../components/Button'
import FormQuestion from '../components/Form/Question'
import { DotsVerticalIcon, PlayIcon } from '@heroicons/react/solid'
import QuestionItem from '../components/Item/Question'

const Home = (props) => {
  const [isOpenDialog, setOpenDialog] = useState(false)
  const [listQuestion, setListQuestion] = useState([])
  const [toggleButton, setToggleButton] = useState(null)
  const [selectedQuestion, setQuestion] = useState('')

  const handlerDialog = () => {
    setOpenDialog((prev) => !prev)
  }

  const handleSubmit = (value) => {
    const tempArray = [...listQuestion]
    const newObj = {
      id: uuid().slice(0, 8),
      question: value,
    }
    tempArray.push(newObj)
    setListQuestion(tempArray)
  }

  const handleQuestionClick = (id) => {
    setToggleButton(id)

    const tempObj = listQuestion.find((item) => item.id === id)
    const { id: questionId } = tempObj
    setQuestion(questionId)
  }

  const handleDelete = (e, value) => {
    e.stopPropagation()

    const tempArray = [...listQuestion]
    const index = tempArray.findIndex((item) => item.id === value)
    console.log(index)
    tempArray.splice(index, 1)

    setListQuestion(tempArray)
    setQuestion('')
  }

  const handleNext = () => {
    const index = listQuestion.findIndex((item) => item.id === selectedQuestion)
    const tempObj = listQuestion[index + 1]
    if (tempObj) setQuestion(tempObj.id)
  }

  const handlePrev = () => {
    const index = listQuestion.findIndex((item) => item.id === selectedQuestion)
    const tempObj = listQuestion[index - 1]
    if (tempObj) setQuestion(tempObj.id)
  }

  return (
    <>
      <Navbar />
      <div className="max-w-lg mx-auto h-screen">
        <div className="h-full ">
          <div className="py-20">
            {/* Header */}
            <div className="mb-8">
              <div className="flex justify-center">
                <Image
                  src={picture}
                  alt="static-images"
                  width={150}
                  height={150}
                  className="text-center"
                />
              </div>
              <p className="text-4xl font-bold text-grey-scale-600 mb-2 text-center">
                Mock Interview
              </p>
              <p className="text-sm text-grey-scale-400 text-center">
                Easily <strong className="text-orange-300">Mock</strong> Your
                Interview Preparation!
              </p>
            </div>

            {/* Timer */}
            <Timer
              listQuestion={listQuestion}
              questionId={selectedQuestion}
              handleNext={handleNext}
              handlePrev={handlePrev}
              className="mb-8"
            />

            {/* List Question */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <button
                  data-tooltip-target="tooltip-default"
                  className="text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full mr-2 p-2"
                  type="button"
                >
                  <PlayIcon className="w-5 h-5" />
                </button>
                <div
                  id="tooltip-default"
                  role="tooltip"
                  className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
                >
                  Tooltip content
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <p className="text-slate-600 text-lg font-bold">
                  List of Question
                </p>
              </div>
              <Button className="text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg">
                <DotsVerticalIcon className="w-5 h-5" />
              </Button>
            </div>
            <hr className="border border-slate-200 mb-6" />
            {listQuestion.length === 0 && (
              <div className="mb-6">
                <p className="text-slate-400 text-lg text-center">
                  No Question Yet!
                </p>
              </div>
            )}
            {listQuestion.map((data) => {
              const { id, question } = data
              return (
                <QuestionItem
                  key={id}
                  data={data}
                  onClick={() => {
                    handleQuestionClick(id)
                  }}
                  active={id === selectedQuestion}
                  handleDelete={handleDelete}
                />
              )
            })}
            {isOpenDialog && (
              <FormQuestion onSubmit={handleSubmit} onClose={handlerDialog} />
            )}
            <Button
              className="bg-slate-200 text-grey-scale-600 block w-full justify-center opacity-50 hover:opacity-100 py-4 mt-6"
              onClick={handlerDialog}
            >
              Add Question
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
