import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home, QuickStart, Example, Api, Props, Customization } from './Views'
import './style/tailwindPurge.scss'
import './style/main.scss'

// import { DtPicker } from 'react-datetime-picker'
// import 'react-datetime-picker/dist/index.css'

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/docs/api'>
            <Api />
          </Route>
          <Route path='/docs/props'>
            <Props />
          </Route>
          <Route path='/docs/quick-start'>
            <QuickStart />
          </Route>
          <Route path='/docs/Customization'>
            <Customization />
          </Route>
          <Route path='/examples'>
            <Example />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
