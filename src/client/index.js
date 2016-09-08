import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router'

import browserHistory from './History'
import About from './About'
import App from './App'
import Home from './Home'
import routes from '../shared/routes'

render(
  <Router routes={routes} history={browserHistory} />,
  getElementById('app')
)
