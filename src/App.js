import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { FETCH_DATA_REQUEST } from './duck';

const App = ({ data, dispatch }) => {
  useEffect(() => {
    dispatch({ type: FETCH_DATA_REQUEST });
  }, []);

  return (
    <div className="App">
      <h1>App awesome</h1>
      <ul>{data && data.map((item, index) => <li key={index.toString()}>{item}</li>)}</ul>
    </div>
  );
};

export default connect(state => ({
  data: state.data,
}))(App);
