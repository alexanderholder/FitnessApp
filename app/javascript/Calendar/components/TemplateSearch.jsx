import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as Selectors from 'Calendar/redux/selectors'
import * as Actions from 'Calendar/redux/reducers/templatesSlice'
import { currentTemplateChanged } from 'Calendar/redux/reducers/usersSlice'
import DropSearch from 'components/DropSearch';
import FullPageModal from 'components/FullPageModal';

function TemplateSearch(props) {
  //   props.templateAdded({
  //     name: dialogValue.name,
  //     length: parseInt(dialogValue.length, 10),

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [templateValue, setTemplateValue] = useState(props.currentTemplate.name)

  function changeTemplate(name) {
    const template = props.templates.find((template) => template.name == name)
    setTemplateValue(name)
    props.templateChanged(template.id)
  }

  function DeleteTemplate() {
    return(
      <form onSubmit={null}>
      {/* () => props.templateRemoved(props.currentTemplate.id, props.templates[0].id)}> */}

      </form>
    )
  }

  function CreateTemplate() {
    return (
      <form onSubmit={null}>
        <input
          className='bg-white flex items-center border rounded-xl shadow-md w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none'
          id="name"
          label="Name your program"
          // margin="dense"
          // onChange={(event) => setDialogValue({ ...dialogValue, name: event.target.value })}
          // required={true}
          type="text"
          // value={dialogValue.name}
        />
        <input
          className='bg-white flex items-center border rounded-xl shadow-md w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none'
          // error={Boolean(Number(dialogValue.length) < 1)}
          // helperText={Boolean(Number(dialogValue.length) < 1) ? "Weeks must be greater than 0." : null}
          id="length"
          label="How many weeks?"
          // margin="dense"
          // onChange={(event) => setDialogValue({ ...dialogValue, length: event.target.value })}
          // required={true}
          type="number"
          // value={dialogValue.length}
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
          value={templateValue}
        />
        <button className="focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
        {/* <button className="focus:outline-none" onClick={() => setCreateOpen(true)}>
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
        />
        <button className="focus:outline-none" onClick={() => setDeleteOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
        <FullPageModal
          open={deleteOpen}
          setOpen={setDeleteOpen}
          title={`Are you sure you want to delete ${props.currentTemplate.name} template?`}
          submitText='Delete Program'
        /> */}
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
  templateChanged: (name) => dispatch(currentTemplateChanged(name)),
  templateRemoved: (current, next) => dispatch(Actions.deleteTrainingTemplate(current, next)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TemplateSearch)
