import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './createStore';
import Plants from './Plants';
import registerServiceWorker from './registerServiceWorker';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center'
};

const store = createStore();

const App = () => (
  <Provider store={store}>
    <div style={styles}>
      <h2>LOVE OF PLANTS</h2>
      <Plants />
    </div>
  </Provider>
);

render(<App />, document.getElementById('root'));

registerServiceWorker();