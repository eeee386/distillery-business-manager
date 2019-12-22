import {Field} from 'redux-form';
import * as React from 'react'
import './renderFormInput.scss';

type InputProps = {input: {[key:string]: any}, meta: {touched: boolean, error: boolean}}

const formInput = (props: InputProps): React.ReactNode => {
    const {touched, error} = props.meta;
    return <div className="form-wrapper"><input className={"form-input"} type='text' {...props.input}/>{touched && error && <div className={"form-error"}>{error}</div>}</div>
};

export const renderFormInput = (name: string, formName: string, validators?: Function[]): React.ReactNode => {
    return (
      <div>
        <label>{name}</label>
        <Field name={formName} component={formInput} type="text" validate={validators}/>
      </div>
    )
};