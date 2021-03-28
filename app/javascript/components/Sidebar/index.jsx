import React from 'react';
import SimpleAccordion from './components/Accordion';
import Modal from './components/Modal';
import TextField from '@material-ui/core/TextField';

export default function Sidebar() {
  return (
    <>
      <Modal
        buttonName="Program Builder"
        modalName="Quick Builder"
        textBody="Quickly build a program using a excercise and a progression template."
        textBodyTwo={
          <div style={{ textAlign: 'center' }} >
            <TextField label="Excercise" style={{ boder: 5, paddingRight: 5, }} />
            <TextField label="Progression" style={{ border: 5, }} />
          </div>
        }
        saveName="Create"
      />
      <SimpleAccordion />
    </>
  );
}
