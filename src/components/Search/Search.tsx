import * as React from 'react'
import { connect } from 'react-redux';
import {payloadNames, searchSagaTypes} from '../../models/Types/SearchTypes/SearchTypes';
import { ConnectedComponentProps, StateProps } from '../../models/ConnectTypes/ConnectTypes';
import { Action, ActionFactory } from '../../ReduxStoreHandlers/actionFactory';
import './Search.scss';
import SearchByNameForm from './SearchByNameForm/SearchByNameForm'
import SearchByTaxIDForm from './SearchByTaxIDForm/SearchByTaxIDForm';

class Search extends React.Component<ConnectedComponentProps> {

  render() {
    return (
      <div>
        <SearchByNameForm onSubmit={this.props.searchByName} />
        <SearchByTaxIDForm onSubmit={this.props.searchByTaxID} />
      </div>
    );
  }
}

const mapStateToProps = (state: StateProps) => ({
  results: state[payloadNames.SEARCH_RESULT],
  loading: state[payloadNames.SEARCH_LOADING],
});

const matchDispatchToProps = (dispatch: React.Dispatch<Action>) => ({
  searchByName: (values: {[key: string]: string}) => dispatch(ActionFactory(searchSagaTypes.SEARCH_BY_NAME, values.name)),
  searchByTaxID: (values: {[key: string]: string}) => dispatch(ActionFactory(searchSagaTypes.SEARCH_BY_TAXID, values.taxID)),
});

export default connect(mapStateToProps, matchDispatchToProps)(Search);