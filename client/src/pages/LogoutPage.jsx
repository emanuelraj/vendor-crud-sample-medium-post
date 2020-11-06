import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'

import { connect } from 'react-redux'
import { userLogout } from '../actions/app'

class LogoutPage extends Component {
  componentDidMount() {
    this.props.userLogout()
  }

  render() {
    return <Redirect to='/login' />
  }
}

LogoutPage.propTypes = {
  userLogout: PropTypes.func.isRequired
}

export default connect(null, { userLogout })(LogoutPage)
