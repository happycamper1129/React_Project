import React, { PropTypes } from 'react'
import {
  counter as counterType
} from './PropTypes'

class MatchCountProvider extends React.Component {
  static propTypes = {
    match: PropTypes.any,
    children: PropTypes.node
  }

  static childContextTypes = {
    matchCounter: counterType.isRequired
  }

  state = { count: 0 }
  count = 0

  increment = () => {
    // have to manage manually since calling setState on same tick of event loop
    // would result in only `1` even though many may have registered
    this.count += 1
    this.forceUpdate()
  }

  decrement = () => {
    this.count -= 1
    this.forceUpdate()
  }

  getChildContext() {
    return {
      matchCounter: {
        increment: this.increment,
        decrement: this.decrement,

        // This is a weird one...
        matchFound: this.count > 0
      }
    }
  }

  render() {
    return this.props.children
  }
}

export default MatchCountProvider