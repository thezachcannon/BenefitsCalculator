import React, { ReactNode, Fragment } from 'react';
import {Table, TableRow, TableCell, TableHead, TableBody} from '@material-ui/core';
import { Employee } from '../services/EmployeeService';

interface EmployeeTableProps {
  employees: Array<any>;
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
            <TableRow key={row.id}>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.lastName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>)
}