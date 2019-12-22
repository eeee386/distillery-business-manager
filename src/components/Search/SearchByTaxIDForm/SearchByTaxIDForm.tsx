import * as React from 'react'
import './SearchByTaxIDForm.scss';
import {renderFormInput} from '../../UtilComponents/renderFormInput'
import {Form, reduxForm} from 'redux-form'
import { Validators } from '../../../utils/validators';

const TAX_VALIDATORS = [Validators.required, Validators.length(10)];

const SearchByTaxIDForm = (props: any) => (
      <Form onSubmit={props.handleSubmit}>
        {renderFormInput('Adóazonosító szám', 'taxID', TAX_VALIDATORS)}
        <button className={'button is-primary'} onClick={props.handleSubmit}>Keresés adószám alapján</button>
      </Form>
);

export default reduxForm({form: 'SearchByTaxIDForm'})(SearchByTaxIDForm);