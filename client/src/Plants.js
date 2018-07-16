import React from 'react';
import PropTypes from 'prop-types'
import { compose } from 'redux';
import { withHandlers, lifecycle } from 'recompose'
import { connect } from 'react-redux';
import { withFirestore } from './utils';
import Plant from './Plant';
import NewPlant from './NewPlant';

const Plants = ({ plants, onNewSubmit, onWaterClick }) => (
  <div>
    <NewPlant onNewSubmit={onNewSubmit} />
    {
      plants === undefined
      ? <span>Loading</span>
      : !plants.length
        ? <span>No plants found</span>
        :
          plants.map((plant, i) => (
            <Plant
              key={`${plant.id}-${i}`}
              plant={plant}
            />
          ))
    }
  </div>
)

Plants.propTypes = {
  plants: PropTypes.array,
  onNewSubmit: PropTypes.func.isRequired,
  store: PropTypes.shape({
    firestore: PropTypes.object
  })
}

const listenerSettings = {
  collection: 'plants',
  orderBy: ['location'],
  limit: 20
}

// Create HOC that loads data and adds it as plants prop
const enhance = compose(
  // add redux store (from react context) as a prop
  withFirestore,
  // Handler functions as props
  withHandlers({
    loadData: props => err => props.firestore.setListener(listenerSettings),
    onNewSubmit: props => newPlant =>
      props.firestore.add('plants', {
        ...newPlant,
        createdAt: props.firestore.FieldValue.serverTimestamp()
      }),
  }),
  // Run functionality on component lifecycle
  lifecycle({
    // Load data when component mounts
    componentWillMount() {
      this.props.loadData()
    },
    componentWillUnmount() {
      this.props.firestore.unsetListener(listenerSettings)
    }
  }),
  // Connect plants from redux state to props.plants
  connect(({ firestore }) => ({ // state.firestore
    plants: firestore.ordered.plants, // document data in array
    // plants: firestore.data.plants, // document data by id
  }))
)

export default enhance(Plants)