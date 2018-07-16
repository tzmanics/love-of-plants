import React from 'react';
import PropTypes from 'prop-types'
import { compose, flattenProp, withHandlers, pure } from 'recompose'
import { withFirestore } from './utils';

const styles = {
  container: {
    alignItems: 'center',
    border: '1px solid lightgrey',
    float: 'left',
    display: 'flex',
    margin: '1rem',
    padding: '.25rem',
    width: '200px'
  },
  image: {
    width: '200px'
  },
  owner: {
    fontSize: '.6rem'
  },
  meta: {
    display: 'flex',
    flexDirection: 'column'
  }
}

const Plant = ({
  family,
  fertilizerFrequency,
  imageUrl,
  lastFertilized,
  lastWatered,
  lightAmount,
  lightNeeds,
  location,
  name,
  tips,
  waterFrequency,
  onWaterClick
}) => (
  <div style={styles.container}>
    <div style={styles.meta}>
      <img src={imageUrl} alt={name} style={styles.image}/>
      <h3>{name}</h3>
      <h5 style={styles.owner}>{location}</h5>
    </div>
  </div>
);

Plant.propTypes = {
  family: PropTypes.string, // from enhancer (flattenProp)
  fertilizerFrequency: PropTypes.number, // from enhancer (flattenProp)
  imageUrl: PropTypes.string, // from enhancer (flattenProp)
  lastFertilized: PropTypes.object, // from enhancer (flattenProp)
  lastWatered: PropTypes.object, // from enhancer (flattenProp)
  lightAmount: PropTypes.number, // from enhancer (flattenProp)
  lightNeeds: PropTypes.number, // from enhancer (flattenProp)
  location: PropTypes.string, // from enhancer (flattenProp)
  name: PropTypes.string, // from enhancer (flattenProp)
  tips: PropTypes.string, // from enhancer (flattenProp)
  waterFrequency: PropTypes.number, // from enhancer (flattenProp)
  onWaterClick: PropTypes.func,
  firestore: PropTypes.shape({
    update: PropTypes.func.isRequired
  })
}

const enhance = compose(
  // Add props.firestore
  withFirestore,
  flattenProp('plant'),
  // Handlers as props
  withHandlers({
    onWaterClick: props => () => {
      return props.firestore.update(
        `plants/${props.id}`, { lastWatered: new Date() }
      )
    }
  }),
  // Prevent unnecessary re-renders by doing shallow comparison of props
  pure
)

export default enhance(Plant)