import React from 'react'

export default function LandingPage() {
    return (
        <div className="flex flex-col md:flex-row h-screen">
        
        <div className="w-full md:w-1/2 h-1/2 md:h-full  bg-gradient-to-r from-blue-500 via-purple-500 to-blue-100 flex items-center justify-center">
          <div className="flex sm:h-1/2 flex-col word-container  space-y-4 text-6xl font-bold text-white">
            <span className="animated-word">Record.</span>
            <span className="animated-word">Transcribe.</span>
            <span className="animated-word">Translate.</span>
          </div>
        </div>
    
        
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-white flex flex-col items-center justify-center">
          <h2 className="text-4xl sm:h-1/2">Welcome!</h2>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Log in</button>
          <button className="bg-white hover:bg-blue-100 text-blue font-bold py-2 px-3 rounded">Sign up</button>
        </div>
      </div>
        )
}
