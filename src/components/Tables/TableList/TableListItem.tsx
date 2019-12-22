import React from 'react';
import { Distillation } from '../../../models/Distillation/Distillation';
import TableForm from '../TableForm/TableForm';
import { nameMap } from './NameMap';
import _ from 'lodash';
import Modal from 'react-modal';
import './TableListItem.scss';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

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

    renderDistillation = (data: Distillation): React.ReactNode => {
            let dataObject = data.toObject();
            dataObject = _.omit(dataObject, ['_id', '_rev']);
            return Object.keys(dataObject).map((key: string) => <div className={"data-row"} key={`${key}-${data._id}`}><div className={'data-name'}>{nameMap[key]}</div><div className={'data-value'}>{dataObject[key]}</div></div>)
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
        <div className={'tablelistitem-wrapper'}>
          {isEdit ? <TableForm onSubmit={this.onSubmitHandler} data={data} form={`EditTableForm-${data._id}`}/> :  this.renderDistillation(data)}
          <div className={'button-wrapper'}>          
            <button className={'button is-primary'} onClick={()=> this.editModeToggle()}>{isEdit ? 'Mégse' : 'Szerkesztés'}</button>
            <button className={'button is-danger'} onClick={()=> this.deleteModalOpen()}>Törlés</button>
          </div>
            <Modal
                isOpen={isDeleteModalOpen}
                onRequestClose={this.deleteModalClose}
                contentLabel="Example Modal"
                style={customStyles}
            >
                <div className={"modal-content-wrapper"}>
                    <div className={"modal-title"}>Biztosan törölni akarod?</div>
                    <div className={"modal-buttons"}>
                      <button className={'button is-danger'} onClick={this.deleteHandler}>Törlés</button>
                      <button className={'button'} onClick={this.deleteModalClose}>Mégse</button>
                    </div>
                </div>
            </Modal>
        </div>
      )
    }
  }