import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import EmployeeTable from './components/EmployeeTable';
import EmployeeService from './services/EmployeeService';
import { IconButton, AppBar, Toolbar, Typography, Container, Grid, Paper, CircularProgress } from '@material-ui/core';
import { Add } from '@material-ui/icons'
import EmployeeDialog from './components/EmployeeDialog';
import {SAVE_EMPLOYEE, ADD_EMPLOYEE} from './constants'


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
        console.log(event.payload)
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
    const employee = employees.filter((employee: any) => employee.id === id)[0]
    if (employee) {
      setSelectedEmployee(employee)
      setShowEmployeeModal(true)
    }
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
        <EmployeeDialog selectedEmployee={selectedEmployee} open={showEmployeeModal} handleClose={(event: any) => handleEmployeeDialogClose(event)} />
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
    // <div>
    //   <TextField value={this.state.firstName} label="First Name" onChange={(event)=> this.updateEmployeeField('firstName', event.target.value)}></TextField>
    //   <TextField value={this.state.lastName} label="Last Name" onChange={(event)=> this.updateEmployeeField('lastName', event.target.value)}></TextField>
    //   <Button onClick={()=> this.addEmployee()}>Add Employee</Button>
    //   <EmployeeTable employees={this.state.employees} />
    // </div>
  );
}

export default App;
