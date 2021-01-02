// @flow
import React from 'react'
import Redux from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as Selectors from 'javascript/redux/selectors'
import TextField from '@material-ui/core/TextField'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import { saveNewTrainingTemplate } from 'javascript/redux/reducers/templatesSlice'

const TemplateSearch = props => {
  return (
    <Autocomplete
      id="template-list"
      style={{ width: 300 }}
      onChange={(event, newValue) => {
        if (newValue && newValue.inputValue) {
          props.templateAdded(newValue.inputValue)
        } else {
          props.templateChanged(newValue.id);
        }
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      value={props.current_template}
      options={props.templates}
      filterOptions={(options, params) => {
        const filter = createFilterOptions()
        const filtered = filter(options, params);
        // Suggest the creation of a new value
        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            name: `Add "${params.inputValue}"`,
          })
        }
        return filtered;
      }}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name;
      }}
      renderInput={(params) => (
        <TextField {...params} label="Templates" variant="outlined" margin="normal" />
      )}
      renderOption={(option, { inputValue }) => {
        const matches = match(option.name, inputValue);
        const parts = parse(option.name, matches);

        return (
          <div>
            {parts.map((part, index) => (
              <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                {part.text}
              </span>
            ))}
          </div>
        );
      }}
    />
  );
}

TemplateSearch.propTypes = {
  templates: PropTypes.array.isRequired,
  current_template: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  templates: Selectors.getTemplatesByUserId(state, state.user.user_id),
  current_template: Selectors.getTemplateById(state, state.user.selected_template)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  templateChanged: (id) => dispatch({ type: 'user/temaplteChanged', payload: id }),
  templateAdded: (name) => dispatch(saveNewTrainingTemplate({ name: name }))
})

export default connect(mapStateToProps, mapDispatchToProps)(TemplateSearch)
