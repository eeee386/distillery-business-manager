import * as React from 'react'
import { Field } from 'redux-form';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './renderDatePicker.scss';
import {DateTime} from "luxon";

interface DatePickerProps {input: {onChange: Function, value: string}, meta: {touched: boolean, error: boolean}}

class renderDatePicker extends React.Component<DatePickerProps> {

    componentDidUpdate(prevProps: Readonly<DatePickerProps>, prevState: Readonly<{}>, snapshot?: any) {
        console.log(this.props.input.value === prevProps.input.value);
    }

    handleChange = (date: Date) => {
        this.props.input.onChange(date.toLocaleDateString('hu-hu'));
    };

    render () {
        const {
            input,
            meta: {touched, error}
        } = this.props;
        console.log(input.value);
        return (
            <div>
                <DatePicker
                    {...input}
                    dateFormat="YYYY-MM-dd"
                    selected={input.value ? new Date(input.value) : null}
                    onChange={this.handleChange}
                    autoComplete={"off"}
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