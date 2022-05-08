import React, { useState } from 'react'
import Button from '../Button'

const Question = (props) => {
  const { onSubmit, onClose } = props
  const [question, setQuestion] = useState('')

  const handleChange = (value) => {
    setQuestion(value)
  }

  const handleSubmit = () => {
    setQuestion('')
    onSubmit(question)
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="bg-white drop-shadow border border-slate-100 rounded-lg p-6">
      <input
        type="text"
        className="w-full border-0 focus:outline-none focus:border-transparent focus:ring-0 text-grey-scale-500 text-xl placeholder:text-slate-300"
        placeholder="What is your interview question?"
        value={question}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e) => handleEnter(e)}
      />
      <div className="flex justify-end mt-8 ">
        <Button
          className="border text-slate-400 hover:bg-slate-50 mr-2"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          className="bg-slate-600 hover:bg-slate-400 text-white disabled:bg-slate-300"
          onClick={handleSubmit}
          disabled={!question}
        >
          Save
        </Button>
      </div>
    </div>
  )
}

export default Question
