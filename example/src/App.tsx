import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home, Doc } from './Views'
import './style/main.scss'

// import { DtPicker } from 'react-datetime-picker'
// import 'react-datetime-picker/dist/index.css'

export default function App() {
  return (
    <div className='container mx-auto'>
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
      <button className='btn'>Sign up</button>
    </div>
  )
}
