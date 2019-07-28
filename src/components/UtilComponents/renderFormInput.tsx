import {Field} from 'redux-form';
import * as React from 'react'

export const renderFormInput = (name: string, formName: string) => {
    return (
      <div>
        <label>{name}</label>
        <Field name={formName} component="input" type="text" />
      </div>
    )
}