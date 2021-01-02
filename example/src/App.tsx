import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home, Doc } from './Views'
import './style/tailwindPurge.scss'
import './style/main.scss'

// import { DtPicker } from 'react-datetime-picker'
// import 'react-datetime-picker/dist/index.css'

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/doc'>
            <Doc />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
