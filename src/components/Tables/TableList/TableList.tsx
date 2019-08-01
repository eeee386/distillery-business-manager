import * as React from 'react'
import { Distillation } from '../../../models/Distillation/Distillation';

interface ITableListProps extends React.Props<any> {
    table: Distillation[];
}

export default class TableList extends React.Component<ITableListProps> {
  render() {
    const {table} = this.props;
    return (
      <div>
        {table.map((data: Distillation) => {
          const dataObject = data.toObject();
          return Object.keys(dataObject).map((key: string) => <div>{`${key}:${dataObject[key]}`}</div>)})}
      </div>
    )
  }
}