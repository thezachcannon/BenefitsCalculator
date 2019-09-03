import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, TextField, DialogContent, DialogActions, Button, DialogContentText, IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import styled from 'styled-components';

import { SAVE_EMPLOYEE, ADD_EMPLOYEE, CLOSE_EMPLOYEE_DIALOG } from '../constants'
import EmployeeService from '../services/EmployeeService'

interface EmployeeDialogProps {
  open: boolean,
  handleClose: Function,
  selectedEmployee?: { firstName: string, lastName: string, id: string, dependents?: any[] },
  handleDependentSave: Function
}

const DependentsHeader = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`

const DependentForm = styled.div`
display: flex;
align-items: center;
`

const DependentTextField = styled(TextField)`
  padding-right: 8px !important;

`
const DependentsSection = styled.div`
`
const DependentRow = styled.div`
  display: flex;
  .header {
    font-weight: bold;
  }
  div {
    width: 50%;
  }
`

const StyledDialog = styled(Dialog)`
  .MuiDialog-paperWidthSm {
  width: 600px;
}
`
const FormContainer = styled.form`
  display:flex;
  flex-direction: column;
`

const BenefitsSection = styled.div`
display: flex;
flex-direction: column;
`
const BenefitsRow = styled.div`
display: flex;
flex-direction: row;
div {
  width: 50%;
}
div:first-of-type {
  font-weight: bold;
}
`
const BenefitsButtonContainer = styled.div`
display:flex;
width: 100%;
padding: 16px 0 16px 0;
justify-content:center;
`
export default function EmployeeDialog(props: EmployeeDialogProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dependentFirstName, setDependentFirstName] = useState('')
  const [dependentLastName, setDependentLastName] = useState('')
  const [addingDependent, toggleAddingDependent] = useState(false)
  const [benefitsObj, setBenefitsObj] = useState(undefined)

  useEffect(() => {
    if (props.selectedEmployee) {
      setFirstName(props.selectedEmployee.firstName)
      setLastName(props.selectedEmployee.lastName)
    }
    return function cleanup() {
      setFirstName('')
      setLastName('')
      setDependentFirstName('')
      setDependentLastName('')
      toggleAddingDependent(false)
      setBenefitsObj(undefined)
    }
  }, [props.selectedEmployee])

  function isFormValid(): boolean {
    return !!(firstName && lastName);
  }

  function isDependentFormValid(): boolean {
    return !!(dependentFirstName && dependentLastName);

  }

  function handleClose(action: string) {
    const employee = { firstName, lastName }
    setLastName('')
    setFirstName('')
    setDependentFirstName('')
    setDependentLastName('')
    toggleAddingDependent(false)
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

  async function handleDependentSave(): Promise<any> {
    await props.handleDependentSave({ dependentFirstName, dependentLastName })
    setDependentFirstName('')
    setDependentLastName('')
    toggleAddingDependent(false)
  }

  async function handleCalculateBenefits(): Promise<any> {
    let benefitsResult = await EmployeeService.calculateBenefits(props.selectedEmployee.id)
    if (benefitsResult) {
      setBenefitsObj(benefitsResult.data)
    }
  }

  return (
    <StyledDialog open={props.open} onClose={() => handleClose(CLOSE_EMPLOYEE_DIALOG)}>
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
            disabled={!!props.selectedEmployee}
          />
          <TextField
            id="lastName"
            label="Last Name"
            value={lastName}
            required
            onChange={(event) => setLastName(event.target.value)}
            disabled={!!props.selectedEmployee}
          />
          {props.selectedEmployee &&
            <DependentsHeader>
              <div>
                Dependents
              </div>
              {
                !addingDependent && <IconButton onClick={() => toggleAddingDependent(true)} title="Add Employee" color="primary">
                  <Add />
                </IconButton>
              }
            </DependentsHeader>
          }
          {props.selectedEmployee && props.selectedEmployee.dependents.length > 0 &&
            <DependentsSection>
              <DependentRow>
                <div className="header">
                  First Name
                </div>
                <div className="header">
                  Last Name
                </div>
              </DependentRow>
              {props.selectedEmployee.dependents.map((dependent) => {
                return (
                  <DependentRow key={dependent.id}>
                    <div>
                      {dependent.firstName}
                    </div>
                    <div>
                      {dependent.lastName}
                    </div>
                  </DependentRow>)
              })}
            </DependentsSection>
          }
          {
            (props.selectedEmployee && addingDependent) && <DependentForm>
              <DependentTextField
                autoFocus
                id="firstName"
                label="First Name"
                value={dependentFirstName}
                required
                onChange={(event) => setDependentFirstName(event.target.value)}
              />
              <DependentTextField
                id="lastName"
                label="Last Name"
                value={dependentLastName}
                required
                onChange={(event) => setDependentLastName(event.target.value)}
              />
              <Button disabled={!isDependentFormValid()} onClick={handleDependentSave}>Add</Button>
            </DependentForm>
          }
        </FormContainer>

        {props.selectedEmployee &&
          <BenefitsButtonContainer>
            <Button onClick={handleCalculateBenefits} variant='contained'>
              Calculate Benefits Cost
            </Button>
          </BenefitsButtonContainer>
        }
        {benefitsObj && <BenefitsSection>
          <BenefitsRow>
            <div>
              Cost Without Discounts
            </div>
            <div>${benefitsObj.costWithoutDiscount}</div>
          </BenefitsRow>
          <BenefitsRow>
            <div>Cost With Discounts</div>
            <div>${benefitsObj.costWithDiscount}</div>
          </BenefitsRow>
          <BenefitsRow>
            <div>Discount(s)</div>
            <div>{benefitsObj.discounts.map((discount: number) => `${(discount * 100)}% `)}</div>
          </BenefitsRow>
          <BenefitsRow>
            <div>
              Net Salary After Cost
            </div>
            <div>
              ${benefitsObj.netSalaryAfterCost}
            </div>
          </BenefitsRow>
        </BenefitsSection>
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(CLOSE_EMPLOYEE_DIALOG)} color="primary">
          Cancel
      </Button>
        {!props.selectedEmployee &&
          <Button disabled={!isFormValid()} onClick={() => handleClose(props.selectedEmployee ? SAVE_EMPLOYEE : ADD_EMPLOYEE)} color="primary">
            Add
        </Button>
        }
      </DialogActions>
    </StyledDialog>
  )
}
