import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {
  Home,
  QuickStart,
  Example,
  Api,
  Customization,
  Utilities
} from './Views'
import './style/tailwindPurge.scss'
import './style/main.scss'

// import { DtPicker } from 'react-calendar-datetime-picker'
// import 'react-calendar-datetime-picker/dist/index.css'

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/docs/api'>
            <Api />
          </Route>
          <Route path='/docs/examples'>
            <Example />
          </Route>
          <Route path='/docs/quick-start'>
            <QuickStart />
          </Route>
          <Route path='/docs/Utilities'>
            <Utilities />
          </Route>
          <Route path='/docs/Customization'>
            <Customization />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
