import React, {useState, Fragment} from 'react';
import { Distillation } from '../../../models/Distillation/Distillation';
import TableListItem from './TableListItem';
import './TableListItemWrapper.scss';

interface ITableListItemWrapperProps extends React.Props<any> {
    data: Distillation;
    updateDistillation: (data: {[key: string]: string}) => Promise<Distillation>,
    deleteDistillation: (data: {[key: string]: string}) => Promise<Distillation>,
}

export const TableListItemWrapper = ({data, updateDistillation, deleteDistillation}: ITableListItemWrapperProps): JSX.Element => {
    const [showData, setShowData] = useState(false);
    return (
        <Fragment>
            <div onClick={() => setShowData((show)=> !show)} className={"table-list-header button is-warning"}>{data.name}</div>
            {showData && <TableListItem  updateDistillation={updateDistillation} data={data} deleteDistillation={deleteDistillation}/>}
        </Fragment>);
}