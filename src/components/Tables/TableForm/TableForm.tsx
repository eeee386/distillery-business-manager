import * as React from 'react'
import {Form, reduxForm, InjectedFormProps} from 'redux-form';
import './TableForm.scss';
import {renderFormInput} from '../../UtilComponents/renderFormInput'
import {renderDatePickerField} from "../../UtilComponents/renderDatePicker";
import {Validators} from "../../../utils/validators";
import { Distillation } from '../../../models/Distillation/Distillation';

const TABLE_FORM_NAME = 'TABLE_FORM';

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
            {renderFormInput('Név', 'name', [Validators.required])}
            {renderFormInput('Lakcím', 'address')}
            {renderFormInput('AdóSzám', 'taxID')}
            {renderFormInput('Származási Igazolvány Szám', 'originID')}
            {renderFormInput('Hektoliterfok', 'HLF')}
            {renderFormInput('Tömeg', 'weightInKilograms')}
            <button onClick={this.props.handleSubmit}>Küldés</button>
          </div>
        </Form>
      )
    }
  }

export default reduxForm({
    form: TABLE_FORM_NAME,
    //@ts-ignore
})(TableForm)