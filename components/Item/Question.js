import React from 'react'
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/solid'

const ItemQuestion = (props) => {
  const { handleDelete, data, active, ...others } = props
  const { id, question } = data
  return (
    <button
      type="button"
      className={`bg-white border border-slate-200 rounded-lg flex justify-between items-center p-4 mb-4 w-full hover:bg-slate-100 ${
        active && 'ring-2'
      }`}
      {...others}
    >
      <div className="flex items-center">
        <CheckCircleIcon
          className={`h-5 w-5 mr-2 ${
            active ? 'text-blue-400' : 'text-slate-300'
          }`}
        />
        <div style={{ maxWidth: '90%' }}>
          <p className="text-slate-600 text-left">{question}</p>
        </div>
      </div>
      <button
        className="text-slate-400 hover:text-slate-700"
        onClick={(e) => handleDelete(e, id)}
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </button>
  )
}

export default ItemQuestion
