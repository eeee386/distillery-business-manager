import * as React from 'react'
import { connect } from 'react-redux';
import {payloadNames, searchSagaTypes} from '../../models/Types/SearchTypes/SearchTypes';
import { ConnectedComponentProps, StateProps } from '../../models/ConnectTypes/ConnectTypes';
import { Action, ActionFactory } from '../../ReduxStoreHandlers/actionFactory';
import './Search.scss';

class Search extends React.Component<ConnectedComponentProps> {
  render() {
    return (
      <div>
        HELLO!
      </div>
    );
  }
}

const mapStateToProps = (state: StateProps) => ({
  results: state[payloadNames.SEARCH_RESULT],
  loading: state[payloadNames.SEARCH_LOADING],
});

const matchDispatchToProps = (dispatch: React.Dispatch<Action>) => ({
  searchByName: (name: string) => dispatch(ActionFactory(searchSagaTypes.SEARCH_BY_NAME, name)),
  searchByTaxID: (taxID: string) => dispatch(ActionFactory(searchSagaTypes.SEARCH_BY_TAXID, taxID)),
});

export default connect(mapStateToProps, matchDispatchToProps)(Search);