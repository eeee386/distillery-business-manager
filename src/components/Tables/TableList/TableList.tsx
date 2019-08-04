import * as React from 'react'
import { Distillation } from '../../../models/Distillation/Distillation';
import TableListItem from './TableListItem';


interface ITableListProps extends React.Props<any> {
    table: Distillation[];
    updateDistillation: () => Promise<Distillation>,
}

export default class TableList extends React.Component<ITableListProps> {

  render() {
    const {table, updateDistillation} = this.props;
    return (
      <div>
        {table.map((data: Distillation) => <div key={data._id}><TableListItem  updateDistillation={updateDistillation} data={data}/></div>)}
      </div>
    )
  }
}