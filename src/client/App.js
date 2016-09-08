import React from 'react'
import NavLink from './NavLink'
import { IndexLink } from 'react-router'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <ul role="nav" >
          <li><NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink></li>
          <li><NavLink to="/about" >About</NavLink></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}
