import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as Selectors from 'Calendar/redux/selectors'
import * as Actions from 'Calendar/redux/reducers/templatesSlice'
import { currentTemplateChanged } from 'Calendar/redux/reducers/usersSlice'
import DropSearch from 'components/DropSearch';
import FullPageModal from 'components/FullPageModal';

function TemplateSearch(props) {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [templateValue, setTemplateValue] = useState(props.currentTemplate.name)
  const [newTemplate, setNewTemplate] = useState('')
  const [newTemplateLength, setNewTemplateLength] = useState(6)

  function changeTemplate(name) {
    const template = props.templates.find((template) => template.name == name)
    setTemplateValue(name)
    if (template) {
      props.templateChanged(template.id)
    }
  }

  function CreateTemplate() {
    return (
      <form>
        <label>Name your program</label>
        <input
          className='bg-white flex items-center border rounded-xl shadow-md w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none'
          id="name"
          onChange={(event) => setNewTemplate(event.target.value)}
          type="text"
          value={newTemplate}
        />
        <label>How many weeks?</label>
        <input
          className='bg-white flex items-center border rounded-xl shadow-md w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none'
          id="length"
          onChange={(event) => setNewTemplateLength(event.target.value)}
          type="number"
          value={newTemplateLength}
        />
      </form>
    )
  }

  return (
    <React.Fragment>
      <div className={`flex ${props.className}`}>
        <DropSearch
          className='bg-white flex items-center border rounded-xl shadow-md w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none'
          datalist={props.templates.map(template => template.name)}
          id='template-search'
          onChange={(e) => changeTemplate(e)}
          onClick={() => changeTemplate('')} // TODO: I think there is a better way...
          onFocus={() => changeTemplate('')}
          value={templateValue}
        />

        <button className="focus:outline-none" onClick={() => setCreateOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <FullPageModal
          open={createOpen}
          setOpen={setCreateOpen}
          title='Create New Program'
          body={<CreateTemplate />}
          submitText='Create Program'
          submitFunction={() =>
            props.templateAdded({
              name: newTemplate,
              length: parseInt(newTemplateLength, 10),
            })
          }
        />

        <button className="focus:outline-none" onClick={() => setDeleteOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <FullPageModal
          open={deleteOpen}
          setOpen={setDeleteOpen}
          title={`Are you sure you want to delete ${props.currentTemplate.name} template?`}
          submitText='Delete Program'
          submitFunction={() => props.templateRemoved(props.currentTemplate.id, props.templates[0].id)}
        />
      </div>
    </React.Fragment>
  )
}

TemplateSearch.propTypes = {
  templates: PropTypes.array.isRequired,
  currentTemplate: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  templates: Selectors.getTemplatesByUserId(state, state.user.user_id),
  currentTemplate: Selectors.getTemplateById(state, state.user.selected_template),
})

const mapDispatchToProps = (dispatch) => ({
  templateAdded: (template) => dispatch(Actions.saveNewTrainingTemplate(template)),
  templateChanged: (id) => dispatch(currentTemplateChanged(id)),
  templateRemoved: (current, next) => dispatch(Actions.deleteTrainingTemplate(current, next)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TemplateSearch)
