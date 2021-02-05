import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {
  Home,
  QuickStart,
  Example,
  Props,
  Customization,
  Utilities,
  Typescript
} from './Views'
import './style/tailwindPurge.scss'
import './style/main.scss'

// import { DtPicker } from 'react-calendar-datetime-picker'
// import 'react-calendar-datetime-picker/dist/index.css'

export default function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div>
        <Switch>
          <Route path='/docs/props'>
            <Props />
          </Route>
          <Route path='/docs/examples'>
            <Example />
          </Route>
          <Route path='/docs/get-started'>
            <QuickStart />
          </Route>
          <Route path='/docs/utilities'>
            <Utilities />
          </Route>
          <Route path='/docs/typescript'>
            <Typescript />
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
