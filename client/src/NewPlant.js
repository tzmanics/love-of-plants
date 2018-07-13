import React from 'react';
import { get } from 'lodash';
import { withHandlers, withStateHandlers, compose } from 'recompose'

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    margin: '2rem'
  }
};

const NewPlant = ({ onInputChange, onNewClick }) => (
  <div style={styles.container}>
    <input onChange={onInputChange} type="text" />
    <button onClick={onNewClick}>Submit</button>
  </div>
)

const enhance = compose(
  withStateHandlers(({
    initialInputValue = null
  }) => ({
    inputValue: initialInputValue
  }), {
    onInputChange: (state) => (e) => ({
      inputValue: get(e, 'target.value', null)
    })
  }),
  withHandlers({
    onNewClick: props => () => {
      // Submit new plant
      props.onNewSubmit({
        text: props.inputValue,
        done: false
      })
      // Reset input
      props.onInputChange()
    }
  })
)

export default enhance(NewPlant)