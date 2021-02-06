// @flow
import React, { useState } from 'react'
import Redux from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as Selectors from 'javascript/redux/selectors'
import * as Actions from 'javascript/redux/reducers/excercisesSlice'
import { setsRepsSchemeList, excerciseList } from './components/excercises'
import { Menu, Delete, MoreVert } from '@material-ui/icons' // TODO FitnessCenter
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Tooltip, IconButton } from '@material-ui/core'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import Drawer from './components/Drawer'

function ExcerciseForm(props) {
  const { movement, measurement_value } = props.excercise
  const [name, setName] = useState(movement || '')
  const [setsReps, setSetsReps] = useState(measurement_value || '')

  // this is for excercise drop down TODO
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
                  props.updateExcercise({ movement: newValue.title })
                  setName(newValue.title)
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
              disableClearable
              forcePopupIcon={false}
              renderInput={(params) => (
                <TextField {...params}
                  autoFocus={true}
                  label='Excercise Name'
                  margin="dense"
                  size='small'
                  style={{ width: 300, textOverlow:'none' }}
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
              onChange={e => {
                setSetsReps(e.target.value)
                props.updateExcercise({ measurement_value: e.target.value })
              }}
              options={setsRepsSchemeList}
              size='small'
              variant='outlined'
              value={setsReps}
              width='25'
              // helperText='Some important text' TODO
            />
          </td>
          <td>
            <IconButton onClick={() => props.setShowExcerciseDetails(props.excerciseId) }>
              <Menu/>
            </IconButton>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

ExcerciseForm.propTypes = {
  excerciseId: PropTypes.number.isRequired,
  excercise: PropTypes.object.isRequired,
  setShowExcerciseDetails: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  excercise: Selectors.getExcerciseById(state, ownProps.excerciseId)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  removeExcercise: () => dispatch(Actions.removeExcercise(ownProps.excerciseId)),
  updateExcercise: (payload) => dispatch(Actions.updateExcercise(ownProps.excerciseId, payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ExcerciseForm)
