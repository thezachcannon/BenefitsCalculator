import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import EmployeeTable from './components/EmployeeTable';
import EmployeeService from './services/EmployeeService';
import { Button, TextField } from '@material-ui/core';

class App extends React.Component {
  state = {
    employees: [],
    loading: false,
    firstName: '',
    lastName: '',
  }

  componentDidMount(): void{
    this.setState({loading: true});
    EmployeeService.getEmployees().then((response) => {
      this.setState({employees: response.data})
    }).catch((err)=>{
      console.log(err)
    })
  }
  updateEmployeeField(field: string, value: string): void {
    this.setState({[field]: value})
  }
  async addEmployee(): Promise<any> {
    let employeeResp = await EmployeeService.saveEmployee({firstName: this.state.firstName, lastName: this.state.lastName})
    employeeResp.data
  }

  render(): React.ReactNode {
    return (
      <div>
        <TextField value={this.state.firstName} label="First Name" onChange={(event)=> this.updateEmployeeField('firstName', event.target.value)}></TextField>
        <TextField value={this.state.lastName} label="Last Name" onChange={(event)=> this.updateEmployeeField('lastName', event.target.value)}></TextField>
        <Button onClick={()=> this.addEmployee()}>Add Employee</Button>
        <EmployeeTable employees={this.state.employees} />
      </div>
    );
  }
}

export default App;
