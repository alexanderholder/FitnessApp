// @flow
import React from 'react';
import Redux from 'redux';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import * as Selectors from '../../redux/selectors';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

const TemplateSearch = props => {
  const [template, setTemplate] = React.useState(props.current_template)
  const dispatch = useDispatch()

  const handleChange = (e, new_value) => {
    if (new_value) {
      setTemplate(new_value)
      dispatch({ type: 'template/temaplteChanged', payload: new_value.id })
    }
  }

  return (
    <Autocomplete
      id="template-list"
      style={{ width: 300 }}
      onChange={handleChange}
      value={template}
      options={props.templates}
      getOptionLabel={(option) => option.name}
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

const mapStateToProps = state => {
  const templates = Selectors.getTemplatesByUserId(state, state.user.user_id)
  const current_template = Selectors.getTemplateById(state, state.selected_template)
  return { templates, current_template }
}

export default connect(mapStateToProps)(TemplateSearch)
