import * as React from 'react'
import { Field } from 'redux-form';
import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'

type DatePickerProps = {input: {onChange: Function, value: string}, meta: {touched: boolean, error: boolean}}

class renderDatePicker extends React.Component<DatePickerProps> {

    handleChange = (date: Date) => {
        this.props.input.onChange(moment(date).format('YYYY-MM-DD'))
    };

    render () {
        const {
            input,
            meta: {touched, error}
        } = this.props;

        return (
            <div>
                <DatePicker
                    {...input}
                    dateFormat="YYYY-MM-DD"
                    selected={input.value ? moment(input.value, 'YYYY-MM-DD').toDate() : null}
                    onChange={this.handleChange}
                />
                {touched && error && <span>{error}</span>}
            </div>
        )
    }
}

export const renderDatePickerField = (name: string, formName: string) => (
    <div>
        <label>{name}</label>
        <Field name={formName} component={renderDatePicker} type="text" />
    </div>
);