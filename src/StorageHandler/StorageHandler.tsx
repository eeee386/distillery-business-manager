import React from 'react';
import { connect } from "react-redux";
import { Action, ActionFactory } from "../ReduxStoreHandlers/actionFactory";
import { tableSagaTypes } from "../models/Types/TableTypes/TableTypes";
import { ConnectedComponentProps } from "../models/ConnectTypes/ConnectTypes";

let extendedWindow: any = window;

const StorageHandler = ({bulkAddDistillations}: ConnectedComponentProps) => {
    console.log(extendedWindow);
    return (
        <button 
            onClick={() => bulkAddDistillations(extendedWindow.rehydratedStore)} 
            className={'button is-primary'}>Tartós tárból visszatöltés</button>
    );
} 

const matchDispatchToProps = (dispatch: React.Dispatch<Action>) => ({
    bulkAddDistillations: (data: {[key: string]: any}) => dispatch(ActionFactory(tableSagaTypes.ADD_BULK, data)),
});

export default connect(null, matchDispatchToProps)(StorageHandler);