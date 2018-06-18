import React from 'react'

import Sidebar from './components/Sidebar'
import Routes from './routes'

const App = () => {
  return (
    <div>
      {/* <div className="flex"> */}
        <Sidebar />
        <Routes />
      {/* </div> */}
    </div>
  )
}

export default App
