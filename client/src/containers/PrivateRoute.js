import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router'
import PropTypes from 'prop-types'

class PrivateRoute extends Component {
  render() {
    const { isAuthenticated, component: Comp, ...props } = this.props
    return (
      <Route
        {...props}
        render={p =>
          false ? (
            <Comp {...p} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: p.location }
              }}
            />
          )
        }
      />
    )
  }
}

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
}

function mapStateToProps(state) {
  
}

export default connect(mapStateToProps, {})(PrivateRoute)
