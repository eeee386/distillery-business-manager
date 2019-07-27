import { call, put, all, takeEvery, Effect } from 'redux-saga/effects'
import { SQLService } from '../SQLService/SQLService';
import { ActionFactory, Action } from './actionFactory';
import { searchTypes, searchSagaTypes } from '../models/Types/SearchTypes/SearchTypes';
import { tableTypes, tableSagaTypes } from '../models/Types/TableTypes/TableTypes';


const sqlService = new SQLService();
function* connectSql(): IterableIterator<Effect> {
    yield put(ActionFactory(tableTypes.CONNECTION_STARTED));
    try {
        yield put(ActionFactory(tableTypes.CONNECTION_COMPLETED));
    } catch (error) {
        yield put(ActionFactory(tableTypes.CONNECTION_FAILED, error));
    }
}

function* watchConnectSql(): IterableIterator<Effect> {
        console.log(tableSagaTypes.CONNECT_SQL.typeName);
        yield takeEvery(tableSagaTypes.CONNECT_SQL.typeName, connectSql);
}

function* disconnectSql(): IterableIterator<Effect> {
    yield put(ActionFactory(tableTypes.DISCONNECTION_STARTED));
    try {
        yield put(ActionFactory(tableTypes.DISCONNECTION_COMPLETED));
    } catch (error) {
        yield put(ActionFactory(tableTypes.DISCONNECTION_FAILED));
    }
}

function* watchDisconnectSql(): IterableIterator<Effect> {
    yield takeEvery(tableSagaTypes.DISCONNECT_SQL.typeName, disconnectSql);
}

function* fetchDistillations(): IterableIterator<Effect> {
    yield put(ActionFactory(tableTypes.FETCH_TABLE_STARTED));
    try {
        console.log('sqlService: ', sqlService)
        const distillations = yield call(sqlService.findAll);
        console.log('distillations: ', distillations);
        yield put(ActionFactory(tableTypes.FETCH_TABLE_COMPLETED, distillations));
    } catch (error) {
        yield put(ActionFactory(tableTypes.FETCH_TABLE_FAILED, error));
    }
}

export function* watchFetchDistillation(): IterableIterator<Effect> {
    yield takeEvery(tableSagaTypes.FETCH_TABLE.typeName, fetchDistillations);
}

function* createDistillation(action: Action): IterableIterator<Effect> {
    yield put(ActionFactory(tableTypes.ADD_NEW_STARTED));
    try {
        console.log('action: ', action);
        const payloadToSend = !!action.payload && !!tableSagaTypes.ADD_NEW.payloadName && action.payload[tableSagaTypes.ADD_NEW.payloadName];
        const newDist = yield call(() => {
            console.log('payloadToSend:', payloadToSend);
            return sqlService.createNewDistillation(payloadToSend)
        });
        yield put(ActionFactory(tableTypes.ADD_NEW_COMPLETED, newDist));
    } catch (error) {
        yield put(ActionFactory(tableTypes.ADD_NEW_FAILED, error));
    }
}

function* watchCreateDistillation(): IterableIterator<Effect> {
    yield takeEvery(tableSagaTypes.ADD_NEW.typeName, createDistillation);
}

function* updateDistillation(action: Action): IterableIterator<Effect> {
    yield put(ActionFactory(tableTypes.UPDATE_ONE_STARTED));
    try {
        const payloadToSend = !!action.payload && !!tableSagaTypes.UPDATE_ONE.payloadName && action.payload[tableSagaTypes.UPDATE_ONE.payloadName];
        const updatedDistillation = yield call(() => sqlService.updateDistillation(payloadToSend));
        yield put(ActionFactory(tableTypes.UPDATE_ONE_COMPLETED, updatedDistillation));
    } catch (error) {
        yield put(ActionFactory(tableTypes.UPDATE_ONE_FAILED, error));
    }
}

function* watchUpdateDistillation(): IterableIterator<Effect> {
    yield takeEvery(tableSagaTypes.UPDATE_ONE.typeName, updateDistillation);

}


function* deleteDistillation(action: Action): IterableIterator<Effect> {
    yield put(ActionFactory(tableTypes.DELETE_ONE_STARTED));
    try {
        const payloadToSend = !!action.payload && !!tableSagaTypes.DELETE_ONE.payloadName && action.payload[tableSagaTypes.DELETE_ONE.payloadName];
        const deletedDistillation = yield call(() => sqlService.deleteDistillation(payloadToSend));
        yield put(ActionFactory(tableTypes.DELETE_ONE_COMPLETED, deletedDistillation));
    } catch (error) {
        yield put(ActionFactory(tableTypes.DELETE_ONE_FAILED, error));
    }
}

function* watchDeleteDistillation(): IterableIterator<Effect> {
    yield takeEvery(tableSagaTypes.DELETE_ONE.typeName, deleteDistillation);
}

function* searchByName(action: Action): IterableIterator<Effect> {
    const {payload, payloadName} = action;
    yield put(ActionFactory(searchTypes.START_SEARCH_BY_NAME));
    try {
        const payloadToSend = !!payload && !!payloadName && payload[payloadName]
        const results = yield call(() => sqlService.findAllByName(payloadToSend));
        yield put(ActionFactory(searchTypes.SEARCH_BY_NAME_COMPLETED, results));
    } catch (error) {
        yield put(ActionFactory(searchTypes.SEARCH_BY_NAME_FAILED, error));
    }
}

function* watchSearchByName(): IterableIterator<Effect> {
    yield takeEvery(searchSagaTypes.SEARCH_BY_NAME.typeName, searchByName);
}

function* searchByTaxID(action: Action): IterableIterator<Effect> {
    const {payload, payloadName} = action;
    yield put(ActionFactory(searchTypes.START_SEARCH_BY_NUMBER));
    try {
        const payloadToSend = !!payload && !!payloadName && payload[payloadName]
        const results = yield call(() => sqlService.findAllByTaxID(payloadToSend));
        yield put(ActionFactory(searchTypes.SEARCH_BY_NUMBER_COMPLETED, results));
    } catch (error) {
        yield put(ActionFactory(searchTypes.SEARCH_BY_NUMBER_FAILED, error))
    }
}

function* watchSearchByTaxID(): IterableIterator<Effect> {
    yield takeEvery(searchSagaTypes.SEARCH_BY_TAXID.typeName, searchByTaxID);
}

export function* watcherSagas(): IterableIterator<Effect> {
    yield all([
        watchConnectSql(),
        watchDisconnectSql(),
        watchFetchDistillation(),
        watchCreateDistillation(),
        watchUpdateDistillation(),
        watchDeleteDistillation(),
        watchSearchByName(),
        watchSearchByTaxID(),
    ])
}