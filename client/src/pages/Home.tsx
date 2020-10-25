// Home page and container for the app
import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/threat';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RecipeProps {
  history?: any;
  listStore?: any;
  match?: any;
  loadList: any;
  resetList: any;
}

class Home extends Component<RecipeProps> {
  componentDidMount() {
  }

  render() {
    return (
      <>
        <div>test</div>
      </>
    );
  }

  handleReset = () => {
    const {
      props: {
        listStore: { listId },
        resetList
      }
    } = this;
    resetList({ listId });
  };
}

const dispatchProps = {
  loadThreats: actions.loadThreats
};

const mapStateToProps = (state: any) => {
  const { listStore } = state;
  return { listStore };
};

export default connect(mapStateToProps, dispatchProps)(Home);
