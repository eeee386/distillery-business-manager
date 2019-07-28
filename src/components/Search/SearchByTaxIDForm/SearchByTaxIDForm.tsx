import * as React from 'react'
import './SearchByTaxIDForm.scss';
import {renderFormInput} from '../../UtilComponents/renderFormInput'
import {Form, reduxForm} from 'redux-form'

const SearchByTaxIDForm = (props: any) => (
      <Form onSubmit={props.handleSubmit}>
        {renderFormInput('AdóSzám', 'TaxID')}
      </Form>
);

export default reduxForm({form: 'SearchByTaxIDForm'})(SearchByTaxIDForm);