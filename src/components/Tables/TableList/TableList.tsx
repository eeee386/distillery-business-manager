import * as React from 'react'
import { Distillation } from '../../../models/Distillation/Distillation';
import { TableListItemWrapper } from './TableListItemWrapper';


interface ITableListProps extends React.Props<any> {
    table: Distillation[];
    updateDistillation: (data: {[key: string]: string}) => Promise<Distillation>,
    deleteDistillation: (data: {[key: string]: string}) => Promise<Distillation>,
}

export default class TableList extends React.Component<ITableListProps> {

  render() {
    const {table, updateDistillation, deleteDistillation} = this.props;
    return (
      <div>
        {table.map((data: Distillation) => (
            <div key={data._id}>
                <TableListItemWrapper updateDistillation={updateDistillation} data={data} deleteDistillation={deleteDistillation}/>
            </div>))}
      </div>
    )
  }
}