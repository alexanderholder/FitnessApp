// @flow
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as Selectors from '../redux/selectors'
import * as Actions from '../redux/reducers/templatesSlice'
import { currentTemplateChanged } from '../redux/reducers/usersSlice'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import DeleteIcon from '@material-ui/icons/Delete'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'

const TemplateSearch = props => {
  const [open, toggleOpen] = useState(false)
  const [openDelete, toggleOpenDelete] = useState(false)
  const [dialogValue, setDialogValue] = useState({
    name: '',
    length: '',
  })

  const handleClose = () => {
    setDialogValue({
      name: '',
      length: '',
    })

    toggleOpen(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.templateAdded({
      name: dialogValue.name,
      length: parseInt(dialogValue.length, 10),
    })

    handleClose()
  }

  return (
    <React.Fragment>
      <div className="vertical-inline-block">
        <Autocomplete
          id="template-list"
          style={{ width: 300 }}
          onChange={(event, newValue) => {
            if (typeof newValue === 'string') {
              // timeout to avoid instant validation of the dialog's form.
              setTimeout(() => {
                toggleOpen(true)
                setDialogValue({
                  name: newValue,
                  length: '',
                })
              })
            } else if (newValue && newValue.inputValue) {
              toggleOpen(true)
              setDialogValue({
                name: newValue.inputValue,
                length: '',
              })
            } else {
              props.templateChanged(newValue.id)
            }
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          value={props.currentTemplate}
          options={props.templates}
          filterOptions={(options, params) => {
            const filter = createFilterOptions()
            const filtered = filter(options, params)
            // Suggest the creation of a new value
            if (params.inputValue !== '') {
              filtered.push({
                inputValue: params.inputValue,
                name: `Add "${params.inputValue}"`,
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
            return option.name
          }}
          renderInput={(params) => (
            <TextField {...params} label="Programs" variant="outlined" margin="normal" />
          )}
          renderOption={(option, { inputValue }) => {
            const matches = match(option.name, inputValue)
            const parts = parse(option.name, matches)

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
        <Dialog open={open} aria-labelledby="add-template">
          <form onSubmit={handleSubmit}>
            <DialogTitle id="add-template">Add a new template</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                id="name"
                label="Name your program"
                margin="dense"
                onChange={(event) => setDialogValue({ ...dialogValue, name: event.target.value })}
                required={true}
                type="text"
                value={dialogValue.name}
              />
              <TextField
                error={Boolean(Number(dialogValue.length) < 1)}
                helperText={Boolean(Number(dialogValue.length) < 1) ? "Weeks must be greater than 0." : null}
                id="length"
                label="How many weeks?"
                margin="dense"
                onChange={(event) => setDialogValue({ ...dialogValue, length: event.target.value })}
                required={true}
                type="number"
                value={dialogValue.length}
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
      </div>
      <IconButton onClick={() => toggleOpenDelete(true)}>
        <DeleteIcon/>
      </IconButton>
      <Dialog open={openDelete} onClose={() => toggleOpenDelete(false)} aria-labelledby="confirm-delete">
          <form onSubmit={() => props.templateRemoved(props.currentTemplate.id, props.templates[0].id)}>
            <DialogTitle id="confirm-delete">
              Are you sure you want to delete {props.currentTemplate.name} template?
            </DialogTitle>
            <DialogActions>
              <Button onClick={() => toggleOpenDelete(false)} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Delete
              </Button>
            </DialogActions>
          </form>
        </Dialog>
    </React.Fragment>
  )
}

TemplateSearch.propTypes = {
  templates: PropTypes.array.isRequired,
  currentTemplate: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  templates: Selectors.getTemplatesByUserId(state, state.user.user_id),
  currentTemplate: Selectors.getTemplateById(state, state.user.selected_template),
})

const mapDispatchToProps = (dispatch) => ({
  templateAdded: (template) => dispatch(Actions.saveNewTrainingTemplate(template)),
  templateChanged: (id) => dispatch(currentTemplateChanged(id)),
  templateRemoved: (current, next) => dispatch(Actions.deleteTrainingTemplate(current, next)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TemplateSearch)
