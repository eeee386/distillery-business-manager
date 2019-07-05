import * as React from 'react'
import { Distillation } from '../../../models/Distillation/Distillation';

interface ITableListProps extends React.Props<any> {
    table: Distillation[];
}

export default class TableList extends React.Component<ITableListProps> {
  render() {
    return (
      <div>
        Hello!
      </div>
    )
  }
}