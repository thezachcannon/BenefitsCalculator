import React, { Fragment } from 'react';
import {Table, TableRow, TableCell, TableHead, TableBody} from '@material-ui/core';
import { Employee } from '../services/EmployeeService';

interface EmployeeTableProps {
  employees: Array<any>;
  handleRowClick: Function;
}
export default function EmployeeTable (props: EmployeeTableProps) {
  return (<Fragment>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.employees.map((row: Employee) => (
            <TableRow key={row.id} onClick={()=> props.handleRowClick(row.id)}>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.lastName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>)
}