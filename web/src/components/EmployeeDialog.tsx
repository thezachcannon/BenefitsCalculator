import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, TextField, DialogContent, DialogActions, Button } from '@material-ui/core';
import styled from 'styled-components';

import { SAVE_EMPLOYEE, ADD_EMPLOYEE, CLOSE_EMPLOYEE_DIALOG } from '../constants'


interface EmployeeDialogProps {
  open: boolean,
  handleClose: Function,
  selectedEmployee?: { firstName: string, lastName: string, id: string }
}

const FormContainer = styled.form`
  display:flex;
  flex-direction: column;
`

export default function EmployeeDialog(props: EmployeeDialogProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  useEffect(() => {
    if (props.selectedEmployee) {
      setFirstName(props.selectedEmployee.firstName)
      setLastName(props.selectedEmployee.lastName)
    }
  }, [props.selectedEmployee])

  function isFormValid(): boolean {
    return !!(firstName && lastName);
  }

  function handleClose(action: string) {
    const employee = { firstName, lastName }
    setLastName('')
    setFirstName('')
    switch (action) {
      case CLOSE_EMPLOYEE_DIALOG:
        props.handleClose({ action })
        break;
      case (ADD_EMPLOYEE):
        props.handleClose({ action, payload: employee })
        break;
      case (SAVE_EMPLOYEE):
        if (props.selectedEmployee) {
          props.handleClose({
            action,
            payload: Object.assign({}, employee, { id: props.selectedEmployee.id })
          })
        }
        break;
      default:
        props.handleClose({ action })
        break;
    }
  }
  return (
    <Dialog open={props.open} onClose={() => handleClose(CLOSE_EMPLOYEE_DIALOG)}>
      <DialogTitle>{props.selectedEmployee ? "Edit" : "Add"} Employee</DialogTitle>
      <DialogContent>
        <FormContainer>
          <TextField
            autoFocus
            id="firstName"
            label="First Name"
            value={firstName}
            required
            onChange={(event) => setFirstName(event.target.value)}
          />
          <TextField
            id="lastName"
            label="Last Name"
            value={lastName}
            required
            onChange={(event) => setLastName(event.target.value)}
          />
          {
            props.selectedEmployee && <div>
              Dependents Here
            </div>
          }
        </FormContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(CLOSE_EMPLOYEE_DIALOG)} color="primary">
          Cancel
      </Button>
        <Button disabled={!isFormValid()} onClick={() => handleClose(props.selectedEmployee ? SAVE_EMPLOYEE : ADD_EMPLOYEE)} color="primary">
          {props.selectedEmployee ? 'Save' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
