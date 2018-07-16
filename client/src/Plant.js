import React from 'react';
import PropTypes from 'prop-types'
import { compose, flattenProp, withHandlers, pure } from 'recompose'
import { withFirestore } from './utils';
import './Plant.css'

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
  <div className="container">
    <ul className="plant-info">
      <li><img src={imageUrl} alt={name}/></li>
      <li><h3>{name}</h3></li>
      <li><h5>{family}</h5></li>
      <li><h5>{fertilizerFrequency}</h5></li>
      <li><h5>{waterFrequency}</h5></li>
      <li><h5>{lightAmount}</h5></li>
      <li><h5>{lightNeeds}</h5></li>
      <li><h5>{location}</h5></li>
      <li className="tips"><h5>{tips}</h5></li>
    </ul>
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