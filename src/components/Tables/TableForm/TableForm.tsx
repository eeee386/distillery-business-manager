import * as React from 'react'
import {Form, reduxForm, InjectedFormProps} from 'redux-form';
import './TableForm.scss';
import {renderFormInput} from '../../UtilComponents/renderFormInput'
import {renderDatePickerField} from "../../UtilComponents/renderDatePicker";
import {Validators} from "../../../utils/validators";
import { Distillation } from '../../../models/Distillation/Distillation';

const TABLE_FORM_NAME = 'TABLE_FORM';
const TAX_VALIDATORS = [Validators.required, Validators.length(10)];
const NAME_VALIDATORS = [Validators.required];

class TableForm extends React.Component<InjectedFormProps<any, {data: Distillation}> & {data: Distillation}> {
    constructor(props: InjectedFormProps<any, {data: Distillation}> & {data: Distillation}) {
      super(props);
      if(props.data){
        props.initialize(props.data.toObject());
      }
    }
    render(){
      return (
        <Form onSubmit={this.props.handleSubmit}>
          <div className={"root"}>        
            {renderDatePickerField('Dátum', 'date')}
            {renderFormInput('Név', 'name', NAME_VALIDATORS)}
            {renderFormInput('Lakcím', 'address')}
            {renderFormInput('AdóSzám', 'taxID', TAX_VALIDATORS)}
            {renderFormInput('Származási Igazolvány Szám', 'originID')}
            {renderFormInput('Hektoliterfok', 'HLF')}
            {renderFormInput('Tömeg', 'weightInKilograms')}
            <button className={"button is-success"} onClick={this.props.handleSubmit}>Küldés</button>
          </div>
        </Form>
      )
    }
  }

export default reduxForm({
    form: TABLE_FORM_NAME,
    //@ts-ignore
})(TableForm)