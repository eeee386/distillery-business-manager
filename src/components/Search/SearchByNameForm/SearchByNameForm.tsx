import * as React from 'react'
import {reduxForm, Form} from 'redux-form';
import './SearchByNameForm.scss';
import {renderFormInput} from '../../UtilComponents/renderFormInput'

const SearchByNameForm = (props: any) => (
  <Form onSubmit={props.handleSubmit}>
    {renderFormInput('Név', 'name')}
  </Form>
);

export default reduxForm({form: 'SearchByNameForm'})(SearchByNameForm);
