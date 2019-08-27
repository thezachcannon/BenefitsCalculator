import React from 'react';
import { Dialog, DialogTitle, TextField, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import styled from 'styled-components';
interface EmployeeDialogProps {
  open: boolean,
  handleClose: Function,
  editMode?: boolean
}

const FormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`
export default function EmployeeDialog(props: EmployeeDialogProps) {
  return (
    <Dialog open={props.open} onClose={() => props.handleClose({action: 'close', payload: {}})}>
      <DialogTitle>{props.editMode ? "Edit" : "Add"} Employee</DialogTitle>
      <DialogContent>
        <FormContainer>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="First Name"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Last Name"
          />
        </FormContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.handleClose({action: 'close', payload: {}})} color="primary">
          Cancel
      </Button>
        <Button onClick={() => props.handleClose({action: 'close', payload: {}})} color="primary">
          Add
      </Button>
      </DialogActions>
    </Dialog>
  )
}
