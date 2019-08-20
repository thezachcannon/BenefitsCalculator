import React, { ReactNode, Fragment } from 'react';
import {Table, TableRow, TableCell, TableHead, TableBody} from '@material-ui/core';

interface EmployeeTableProps {
  employees: Array<any>;
}
export default class EmployeeTable extends React.Component<EmployeeTableProps> {
  render(): ReactNode{
    return <Fragment>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.employees.map(row => (
            <TableRow key={row.name}>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.lastName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  }
}