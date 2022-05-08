import React from 'react'
import { CogIcon } from '@heroicons/react/solid'

import Button from '../Button'

const Navbar = () => {
  return (
    <div className="drop-shadow-sm border-b py-4 fixed w-full z-10 bg-white">
      <div className="max-w-screen-sm mx-auto">
        <div className="flex justify-between items-center">
          <p className="text-grey-scale-600 font-bold">Mock Interview</p>
          <Button className="bg-slate-100 hover:bg-slate-200 text-slate-400">
            <div className="inline-block">
              <CogIcon className="h-5 w-5 mr-2" />
            </div>
            Settings
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
