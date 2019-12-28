import * as React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import TableManager from './components/Tables/TableManager';
import Search from './components/Search/Search';
import { ActionFactory, Action } from './ReduxStoreHandlers/actionFactory';
import { tableSagaTypes } from './models/Types/TableTypes/TableTypes';
import { ConnectedComponentProps } from './models/ConnectTypes/ConnectTypes';
import StorageHandler from './StorageHandler/StorageHandler';

class App extends React.Component<ConnectedComponentProps> {
  constructor(props: ConnectedComponentProps) {
    super(props);
    props.connectSQL();
  }

  componentWillUnmount() {
    this.props.disconnectSQL();
  }

  render() {
    return (
      <Router>
        <div className={'root'}>
          <div className={'navbar'}>
            <div className={'container'}>
              <Link className={'.navbar-link link'} to={'/search'}>Keresés</Link>
              <Link className={'.navbar-link link'} to={'/'}>Főzetések</Link>
              <Link className={'.navbar-link link'} to={'/store'}>Tartós tár</Link>
            </div>
          </div>
            <div className={'routeRoot'} style={{width: '100%'}}>
              <Route exact path='/' component={TableManager} />
              <Route exact path='/search' component={Search} />
              <Route exact path='/store' component={StorageHandler} />
            </div>
        </div>
      </Router>
    );
  }
}

const matchDispatchToProps = (dispatch: React.Dispatch<Action>) => ({
  connectSQL: () => dispatch(ActionFactory(tableSagaTypes.CONNECT_SQL)),
  disconnectSQL: () => dispatch(ActionFactory(tableSagaTypes.DISCONNECT_SQL)) 
});

export default connect(null, matchDispatchToProps) (App);