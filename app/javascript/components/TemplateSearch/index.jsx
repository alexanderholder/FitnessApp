/* eslint-disable no-use-before-define */
import React from 'react';
import Redux from 'redux';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import * as Selectors from '../../redux/selectors';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

const TemplateSearch = (props) => {
  const dispatch = useDispatch()

  const [template, setTemplate] = React.useState(
    { title: props.current_template.name, id: props.current_template.id }
  )

  const handleChange = (e, new_value) => {
    setTemplate(new_value)
    dispatch({ type: 'template/temaplteChanged', payload: template.id })
  }

  return (
    <Autocomplete
      id="template-list"
      style={{ width: 300 }}
      onChange={handleChange}
      value={template}
      options={props.templates.map(template => ({ title: template.name, id: template.id }))}
      getOptionLabel={(option) => option.title}
      renderInput={(params) => (
        <TextField {...params} label="Templates" variant="outlined" margin="normal" />
      )}
      renderOption={(option, { inputValue }) => {
        const matches = match(option.title, inputValue);
        const parts = parse(option.title, matches);

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
  // user_id: PropTypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const user_details = state.user_details
  const templates = Selectors.getTemplatesByUserId(state, user_details.user_id)
  const current_template = Selectors.getTemplateById(state, state.selected_template)
  return { templates, user_details, current_template }
}

export default connect(mapStateToProps)(TemplateSearch)
