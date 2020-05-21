/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './App.css';
import Card from './components/Card/Card';
import { getData } from './store/actions';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

const App = (props) => {

  useEffect(() => {
    props.getData();
  }, []);

  return (
    <div className="App" style={{ margin: '5% 20%' }}>
      {props.data.length > 0 ?
        <Card></Card> :
        <CircularProgress />
      }

    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.data
  }
}
export default connect(mapStateToProps, { getData })(App);
