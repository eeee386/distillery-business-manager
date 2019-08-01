import * as React from 'react'
import {Form, reduxForm} from 'redux-form';
import './TableForm.scss';
import {renderFormInput} from '../../UtilComponents/renderFormInput'
import {renderDatePickerField} from "../../UtilComponents/renderDatePicker";
import {Validators} from "../../../utils/validators";

const TABLE_FORM_NAME = 'TABLE_FORM';

const TableForm = (props: any) =>  {
    return (
      <Form onSubmit={props.handleSubmit}>
        <div className={"root"}>        
          {renderDatePickerField('Dátum', 'date')}
          {renderFormInput('Név', 'name', [Validators.required])}
          {renderFormInput('Lakcím', 'address')}
          {renderFormInput('AdóSzám', 'taxID')}
          {renderFormInput('Származási Igazolvány Szám', 'originID')}
          {renderFormInput('Hektoliterfok', 'HLF')}
          {renderFormInput('Tömeg', 'weightInKilograms')}
          <button onClick={props.handleSubmit}>Küldés</button>
        </div>
      </Form>
    )
  };

export default reduxForm({
    form: TABLE_FORM_NAME
})(TableForm)