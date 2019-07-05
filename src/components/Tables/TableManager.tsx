import * as React from 'react'
import { connect } from 'react-redux';
import { tableSagaTypes, payloadNames } from '../../models/Types/TableTypes/TableTypes';
import './TableManager.scss';
import {isEmpty} from 'lodash';
import TableList from './TableList/TableList';
import TableForm from './TableForm/TableForm';
import { ConnectedComponentProps, StateProps } from '../../models/ConnectTypes/ConnectTypes';
import { Distillation } from '../../models/Distillation/Distillation';
import { ActionFactory, Action } from '../../ReduxStoreHandlers/actionFactory';

class TableManager extends React.Component<ConnectedComponentProps> {
    constructor(props: ConnectedComponentProps) {
        super(props)
        props.fetchDistillation();
    }
  render() {
    const {table, addNewDistillation} = this.props;
    console.log(table);
    return (
      <div>
        <a href={'/search'}>Keresés</a>
        {isEmpty(table) ? "Nincsenek főzetések": <TableList table={table} />}
        <TableForm onSubmit={addNewDistillation}/>
      </div>
    )
  }
}

const mapStateToProps = (state: StateProps) => ({
  table: state.tables[payloadNames.TABLES],
  tableLoading: state.tables[payloadNames.TABLE_LOADING],
});

const matchDispatchToProps = (dispatch: React.Dispatch<Action>) => ({
  fetchDistillation: () => dispatch(ActionFactory(tableSagaTypes.FETCH_TABLE)),
  addNewDistillation: (newDist: Distillation) => dispatch(ActionFactory(tableSagaTypes.ADD_NEW, newDist)),
  updateDistillation: (updatedDist: Distillation) => dispatch(ActionFactory(tableSagaTypes.UPDATE_ONE, updatedDist)),
  deleteDistillation: (deletedDist: Distillation) => dispatch(ActionFactory(tableSagaTypes.DELETE_ONE, deletedDist)),
});

export default connect(mapStateToProps, matchDispatchToProps)(TableManager);