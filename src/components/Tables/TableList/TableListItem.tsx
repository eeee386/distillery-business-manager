import React from 'react';
import { Distillation } from '../../../models/Distillation/Distillation';
import TableForm from '../TableForm/TableForm';
import { nameMap } from './NameMap';
import _ from 'lodash';
import Modal from 'react-modal';

interface ITableListItemProps extends React.Props<any> {
    data: Distillation,
    updateDistillation: (data: {[key: string]: string}) => Promise<Distillation>,
    deleteDistillation: (data: {[key: string]: string}) => Promise<Distillation>,
}

Modal.setAppElement('#root');

export default class TableListItem extends React.Component<ITableListItemProps> {
    state = {
        isEdit: false,
        isDeleteModalOpen: false,
    };

    renderDistillation = (data: Distillation) => {
            let dataObject = data.toObject();
            dataObject = _.omit(dataObject, ['_id', '_rev']);
            return Object.keys(dataObject).map((key: string) => <div key={`${key}-${data._id}`}>{`${nameMap[key]}:${dataObject[key]}`}</div>)
    };

    editModeToggle = () => {
      this.setState({isEdit: !this.state.isEdit});
    };

    deleteModalOpen = () => {
        this.setState({isDeleteModalOpen: true});
    };

    deleteModalClose = () => {
        this.setState({isDeleteModalOpen: false})
    };

    deleteHandler = () => {
        this.props.deleteDistillation(this.props.data.toObject());
        this.deleteModalClose();
    };

    onSubmitHandler = (data: {[key: string]: string}) => {
      this.props.updateDistillation(data);
      this.editModeToggle();
    };

    render() {
      const {data} = this.props;
      const {isEdit, isDeleteModalOpen} = this.state;
      return (
        <div>
          {isEdit ? <TableForm onSubmit={this.onSubmitHandler} data={data} form={`EditTableForm-${data._id}`}/> :  this.renderDistillation(data)}
          <button onClick={()=> this.editModeToggle()}>{isEdit ? 'Mégse' : 'Szerkesztés'}</button>
          <button onClick={()=> this.deleteModalOpen()}>Törlés</button>
            <Modal
                isOpen={isDeleteModalOpen}
                onRequestClose={this.deleteModalClose}
                contentLabel="Example Modal"
            >
                <div>
                    <div>Biztosan törölni akarod?</div>
                    <button onClick={this.deleteHandler}>Törlés</button>
                    <button onClick={this.deleteModalClose}>Mégse</button>
                </div>
            </Modal>
        </div>
      )
    }
  }