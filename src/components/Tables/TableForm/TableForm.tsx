import * as React from 'react'
import {Form, Field, reduxForm} from 'redux-form';
import './TableForm.scss';

const TABLE_FORM_NAME = 'TABLE_FORM';

const TableForm = (props: any) =>  {

  const renderFormInput = (name: string, type: string) => {
    return (
      <div>
        <label>{name}</label>
        <input type={type} />
      </div>
    )
  }

    return (
      <Form onSubmit={props.handleSubmit}>
        <div className={"root"}>        
          <Field name="date" component={() => renderFormInput("Dátum", "text")} />
          <Field name="name" component={() => renderFormInput("Név", "text")} />
          <Field name="address" component={() => renderFormInput("Lakcím", "text")} />
          <Field name="taxID" component={() => renderFormInput("AdóSzám", "text")} />
          <Field name="originID" component={() => renderFormInput("Származási Igazolvány Szám", "text")} />
          <Field name="HLF" component={() => renderFormInput("Hektoliterfok", "text")} />
          <Field name="weightInKilograms" component={() => renderFormInput("Tömeg", "text")} />
          <button onClick={props.handleSubmit}>Küldés</button>
        </div>
      </Form>
    )
  }

export default reduxForm({
    form: TABLE_FORM_NAME
})(TableForm)