import React from 'react';
import { Distillation } from '../../../models/Distillation/Distillation';
import TableForm from '../TableForm/TableForm';
import { nameMap } from './NameMap';

interface ITableListItemProps extends React.Props<any> {
    data: Distillation,
    updateDistillation: () => Promise<Distillation>,
}

export default class TableListItem extends React.Component<ITableListItemProps> {
    state = {
        isEdit: false
    }

    renderDistillation = (data: Distillation) => {
            const dataObject = data.toObject();
            delete dataObject._id;
            delete dataObject._rev;
            return Object.keys(dataObject).map((key: string) => <div key={`${key}-${data._id}`}>{`${nameMap[key]}:${dataObject[key]}`}</div>)
    }

    render() {
      const {updateDistillation, data} = this.props;
      const {isEdit} = this.state;
      return (
        <div>
          {isEdit ? <TableForm onSubmit={updateDistillation} data={data} form={`EditTableForm-${data._id}`}/> :  this.renderDistillation(data)}
          <button onClick={()=> this.setState({isEdit: !isEdit})}>{isEdit ? 'Mégse' : 'Szerkesztés'}</button>
        </div>
      )
    }
  }