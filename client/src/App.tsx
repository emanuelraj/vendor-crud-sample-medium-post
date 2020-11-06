import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import Routes from './Routes';

interface RecipeProps {
  history?: any;
}

class App extends Component<RecipeProps> {
  render() {
    const { history } = this.props;
    return (
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    );
  }
}

function mapStateToProps(state: any) {
  return { appState: state };
}

export default connect(mapStateToProps)(App);
