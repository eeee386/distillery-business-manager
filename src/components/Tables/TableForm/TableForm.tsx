import * as React from 'react'
import {Form, Field, reduxForm} from 'redux-form';
import './TableForm.scss';

const TABLE_FORM_NAME = 'TABLE_FORM';

const TableForm = (props: any) =>  {

  const renderFormInput = (name: string, formName: string) => {
    return (
      <div>
        <label>{name}</label>
        <Field name={formName} component="input" type="text" />
      </div>
    )
  }

    return (
      <Form onSubmit={props.handleSubmit}>
        <div className={"root"}>        
          {renderFormInput('Dátum', 'date')}
          {renderFormInput('Név', 'name')}
          {renderFormInput('Lakcím', 'address')}
          {renderFormInput('AdóSzám', 'taxID')}
          {renderFormInput('Származási Igazolvány Szám', 'originID')}
          {renderFormInput('Hektoliterfok', 'HLF')}
          {renderFormInput('Tömeg', 'weightInKilograms')}
          <button onClick={props.handleSubmit}>Küldés</button>
        </div>
      </Form>
    )
  }

export default reduxForm({
    form: TABLE_FORM_NAME
})(TableForm)