import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import EmployeeTable from './components/EmployeeTable';
import EmployeeService from './services/EmployeeService';
import { IconButton, AppBar, Toolbar, Typography, Container, Grid, Paper, CircularProgress } from '@material-ui/core';
import { Add } from '@material-ui/icons'
import EmployeeDialog from './components/EmployeeDialog';
import {SAVE_EMPLOYEE, ADD_EMPLOYEE} from './constants';


const StyledContainer = styled(Container)`
  padding: 32px;
`
const AppBarSpacer = styled.div`
  min-height: 64px;
`

const EmployeeActionContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 8px;
`

const EmployeesTableContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 0 16px 0 16px;
`
function App() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(false)
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(undefined);
  useEffect(() => {
    async function getEmployees() {
      let employeesResp = await EmployeeService.getEmployees()
      setEmployees(employeesResp.data)
    }
    setLoading(true)
    getEmployees();
    setLoading(false)
  }, [])

  async function handleEmployeeDialogClose(event: any) {
    switch (event.action) {
      case ADD_EMPLOYEE:
        try {
          let employee = await EmployeeService.saveEmployee(event.payload)
          setEmployees(employees.concat(employee.data))
        }
        catch (e) {
          console.log(e)
        }
        break;
      case SAVE_EMPLOYEE:
        try {
          let employee = await EmployeeService.saveEmployee(event.payload)
          setEmployees(employees.concat(employee.data))
        }
        catch (e) {
          console.log(e)
        }
        break;
    }
    setShowEmployeeModal(false)
    setSelectedEmployee(undefined)
  }

  function employeeRowClick(id: string) {
    const employee = employees.find((employee: any) => employee.id === id)
    if (employee) {
      setSelectedEmployee(employee)
      setShowEmployeeModal(true)
    }
  }

  async function handleDependentSave(dependentObj: {dependentFirstName: string, dependentLastName: string}){
    if(selectedEmployee){
      let dependentResult = await EmployeeService.saveDependent({firstName: dependentObj.dependentFirstName, lastName: dependentObj.dependentLastName, employeeId: selectedEmployee.id})
      addDependentToEmployeeLocal(selectedEmployee.id, dependentResult.data)
    }
  }

  function addDependentToEmployeeLocal(employeeId: string, dependent: {}): void {
    const employeeIndex = employees.findIndex((employee) => employee.id === employeeId);
    const employee = Object.assign({}, employees[employeeIndex])
    if(employee.dependents) {
      let arrayCopy = [...employee.dependents, dependent]
      employee.dependents = arrayCopy
    }
    else {
      employee.dependents = [dependent]
    }
    const newEmployeeArray = [...employees]
    newEmployeeArray.splice(employeeIndex, 1, employee)
    setEmployees(newEmployeeArray)
    setSelectedEmployee(employee)
  }

  return (
    <div>
      <AppBar position="absolute">
        <Toolbar>
          <Typography component="h1" variant="h6" color="inherit" noWrap>
            Benefits Calculator
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <AppBarSpacer />
        <EmployeeDialog handleDependentSave={handleDependentSave} selectedEmployee={selectedEmployee} open={showEmployeeModal} handleClose={(event: any) => handleEmployeeDialogClose(event)} />
        <StyledContainer maxWidth="lg">
          <Grid container spacing={3}>
            {/* Employee Table */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper>
                <EmployeeActionContainer>
                  <IconButton onClick={() => setShowEmployeeModal(true)} title="Add Employee" color="primary">
                    <Add />
                  </IconButton>
                </EmployeeActionContainer>
                <EmployeesTableContainer>
                  {loading ? <CircularProgress /> : <EmployeeTable handleRowClick={employeeRowClick} employees={employees} />}
                </EmployeesTableContainer>
              </Paper>
            </Grid>
          </Grid>
        </StyledContainer>
      </main>
    </div>
  );
}

export default App;
