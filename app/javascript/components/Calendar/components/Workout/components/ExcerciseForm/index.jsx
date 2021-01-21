// @flow
import React, { useState } from 'react'
import Redux from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as Selectors from 'javascript/redux/selectors'
import * as Actions from 'javascript/redux/reducers/excercisesSlice'
import { setsRepsSchemeList, excerciseList } from './components/excercises'
import { TextField, Tooltip, IconButton } from '@material-ui/core'
import { FitnessCenter, Delete, MoreVert } from '@material-ui/icons'

import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core'

const ExcerciseForm = props => {
  console.log(excerciseList)
  const { movement, weight_value, measurement_metric } = props.excercise
  const [isWeightShown, setWeightIsShown] = useState(weight_value)
  const [name, setName] = useState(movement)
  const [setsReps, setSetsReps] = useState(measurement_metric)
  const [weight, setWeight] = useState(weight_value)

// this is for excercise drop down
  const [open, toggleOpen] = useState(false)
  const [dialogValue, setDialogValue] = useState({
    title: '',
    category: '',
  })

  const handleClose = () => {
    setDialogValue({
      title: '',
      category: '',
    })

    toggleOpen(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // props.templateAdded({
    //   name: dialogValue.name,
    //   length: parseInt(dialogValue.length, 10),
    // })

    handleClose()
  }
  // endddd

  return (
    <table>
      <tbody>
        <tr>
          <td className='grabbable'>
            <MoreVert />
          </td>
          <td>
            <Autocomplete
              id="excercise"
              onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                  // timeout to avoid instant validation of the dialog's form.
                  setTimeout(() => {
                    toggleOpen(true)
                    setDialogValue({
                      title: newValue,
                      category: '',
                    })
                  })
                } else if (newValue && newValue.inputValue) {
                  toggleOpen(true)
                  setDialogValue({
                    title: newValue.inputValue,
                    category: '',
                  })
                } else {
                  props.updateExcercise({ movement: newValue.id })
                }
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              value={name}
              options={excerciseList}
              filterOptions={(options, params) => {
                const filter = createFilterOptions()
                const filtered = filter(options, params)
                // Suggest the creation of a new value
                if (params.inputValue !== '') {
                  filtered.push({
                    inputValue: params.inputValue,
                    title: `Add "${params.inputValue}"`,
                  })
                }
                return filtered
              }}
              getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                  return option
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                  return option.inputValue
                }
                // Regular option
                return option.title
              }}
              renderInput={(params) => (
                <TextField {...params}
                  InputProps={{ ...params.InputProps, endAdornment : null }}
                  autoFocus={true}
                  label='Excercise Name'
                  margin="dense"
                  size='small'
                  style={{ width: 200 }}
                  variant="outlined"
                />
              )}
              renderOption={(option, { inputValue }) => {
                const matches = match(option.title, inputValue)
                const parts = parse(option.title, matches)

                return (
                  <div>
                    {parts.map((part, index) => (
                      <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                        {part.text}
                      </span>
                    ))}
                  </div>
                )
              }}
            />
            <Dialog open={open} aria-labelledby="add-excercise">
              <form onSubmit={handleSubmit}>
                <DialogTitle id="add-excercise">Add a new excercise</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    id="excercise"
                    label="excercise"
                    margin="dense"
                    onChange={(event) => setDialogValue({ ...dialogValue, title: event.target.value })}
                    required={true}
                    type="text"
                    value={dialogValue.title}
                  />
                  <TextField
                    id="category"
                    label="category"
                    margin="dense"
                    onChange={(event) => setDialogValue({ ...dialogValue, category: event.target.value })}
                    required={true}
                    type="text"
                    value={dialogValue.category}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button type="submit" color="primary">
                    Add
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          </td>
          <td>
            <TextField
              label='Sets & Reps'
              onBlur={() => props.updateExcercise({ measurement_metric: setsReps })}
              onChange={e => setSetsReps(e.target.value)}
              options={setsRepsSchemeList}
              size='small'
              variant='outlined'
              value={setsReps}
              width='50'
              // helperText='Some important text' TODO
            />
          </td>
          { isWeightShown && (
            <td>
              <TextField
                label='Weight'
                onBlur={() => props.updateExcercise({ weight_value: weight })}
                onChange={e => setWeight(e.target.value)}
                size='small'
                variant='outlined'
                value={weight}
                width='50'
              />
            </td>
          )}
          <td>
            <Tooltip title='Add weight'>
              <IconButton onClick={() => { setWeightIsShown(!isWeightShown) }} >
                <FitnessCenter/>
              </IconButton>
            </Tooltip>
          </td>
          <td>
            <Tooltip title='Delete excercise'>
              <IconButton onClick={props.removeExcercise} >
                <Delete/>
              </IconButton>
            </Tooltip>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

ExcerciseForm.propTypes = {
  excercise_id: PropTypes.number.isRequired,
  excercise: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  excercise: Selectors.getExcerciseById(state, ownProps.excercise_id)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  removeExcercise: () => dispatch(Actions.removeExcercise(ownProps.excercise_id)),
  updateExcercise: (payload) => dispatch(Actions.updateExcercise(ownProps.excercise_id, payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ExcerciseForm)
