import React from 'react'

const Button = (props) => {
  const { children, className, ...others } = props
  return (
    <button
      className={`py-2 px-4  text-center rounded-md font-semibold flex items-center disabled:opacity-75 disabled:cursor-not-allowed ${className}`}
      {...others}
    >
      {children}
    </button>
  )
}

export default Button
