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

const NewPlant = ({
  onNameChange,
  onFamilyChange,
  onDescriptionChange,
  onImageChange,
  onLastFertilized,
  onFertilizerChange,
  onLastWatered,
  onWaterChange,
  onLightChange,
  onLocationChange,
  onTipsChange,
  onNewClick
}) => (
  <div style={styles.container}>
    name: <input onChange={onNameChange} type="text" />
    family: <input onChange={onFamilyChange} type="text" />
    description: <input onChange={onDescriptionChange} type="text" />
    image: <input onChange={onImageChange} type="text" />
    last fertilized: <input onChange={onLastFertilized} type="date" />
    fertilizer needs: <input onChange={onFertilizerChange} type="number" />
    last watered: <input onChange={onLastWatered} type="date" />
    water needs: <input onChange={onWaterChange} type="number" />
    light needs: <input onChange={onLightChange} type="number" />
    location: <input onChange={onLocationChange} type="text" />
    tips: <input onChange={onTipsChange} type="text" />
    <button onClick={onNewClick}>Submit</button>
  </div>
)

const enhance = compose(
  withStateHandlers(({
    initialInputValue = null
  }) => ({
    inputValue: initialInputValue
  }), {
    onNameChange: (state) => (e) => ({
      name: get(e, 'target.value', null)
    }),
    onFamilyChange: (state) => (e) => ({
      family: get(e, 'target.value', null)
    }),
    onDescriptionChange: (state) => (e) => ({
      description: get(e, 'target.value', null)
    }),
    onImageChange: (state) => (e) => ({
      image: get(e, 'target.value', null)
    }),
    onLastFertilized: (state) => (e) => ({
      lastFertilized: get(e, 'target.value', null)
    }),
    onFertilizerChange: (state) => (e) => ({
      fertilizer: get(e, 'target.value', null)
    }),
    onLastWatered: (state) => (e) => ({
      lastWatered: get(e, 'target.value', null)
    }),
    onWaterChange: (state) => (e) => ({
      water: get(e, 'target.value', null)
    }),
    onLightChange: (state) => (e) => ({
      light: get(e, 'target.value', null)
    }),
    onLocationChange: (state) => (e) => ({
      location: get(e, 'target.value', null)
    }),
    onTipsChange: (state) => (e) => ({
      tips: get(e, 'target.value', null)
    })
  }),
  withHandlers({
    onNewClick: props => () => {
      // Submit new plant
      props.onNewSubmit({
        name: props.name,
        family: props.family,
        description: props.description,
        imageUrl: props.image,
        lastFertilized: props.lastFertilized,
        fertilizerFrequency: props.fertilizer,
        lastWatered: props.lastWatered,
        waterFrequency: props.water,
        lightNeeds: props.light,
        location: props.location,
        tips: props.tips,
      })
    }
  })
)

export default enhance(NewPlant)