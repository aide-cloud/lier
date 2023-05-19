import React, { ReactNode } from 'react';
import dayjs from 'dayjs';
import {
  Checkbox,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  InputNumber,
  InputNumberProps,
  Radio,
  RangePickerProps,
  Select,
  TextAreaProps,
  TimePicker,
  TimePickerProps,
  Grid,
  RowProps,
} from '@arco-design/web-react';

import type {
  RadioProps,
  RadioGroupProps,
  InputProps,
  CheckboxGroupProps,
  CheckboxProps,
  FormProps,
  SelectProps,
} from '@arco-design/web-react';

import { InputPasswordProps } from '@arco-design/web-react/es/Input';

import './style';

const { RangePicker } = TimePicker;
const { Row, Col } = Grid;

/**
 * @title TacerFormInputType
 */
export type TacerFormInputType = {
  placeholder?: string;
  allowClear?: boolean;
  disabled?: boolean;
  props?: InputProps;
};

/**
 * @title TacerFormOption
 */
export type TacerFormItemOption =
  | string
  | number
  | {
      label: ReactNode | string;
      value: string | number;
      disabled?: boolean;
      extra?: any;
    };

/**
 * @title TacerFormSelectType
 */
export type TacerFormSelectType = {
  options: TacerFormItemOption[];
  showSearch?: boolean;
  width?: string | number;
  props?: SelectProps;
  placeholder?: string;
  allowClear?: boolean;
  disabled?: boolean;
};

/**
 * @title TacerFormRadioType
 */
export type TacerFormRadioType = {
  props?: RadioProps;
  disabled?: boolean;
};

/**
 * @title TacerFormCheckboxType
 */
export type TacerFormCheckboxType = {
  props?: CheckboxProps;
  disabled?: boolean;
};

/**
 * @title TacerFormRadioGroupType
 */
export type TacerFormRadioGroupType = {
  options: TacerFormItemOption[];
  props?: RadioGroupProps;
  disabled?: boolean;
};

/**
 * @title TacerFormCheckboxGroupType
 */
export type TacerFormCheckboxGroupType = {
  options: TacerFormItemOption[];
  props?: CheckboxGroupProps<any>;
  disabled?: boolean;
};

export type TacerFormTextAreaType = {
  props?: TextAreaProps;
  disabled?: boolean;
  maxLength?: number;
  maxRows?: number;
  minRows?: number;
  showCount?: boolean;
  placeholder?: string;
  allowClear?: boolean;
};

/**
 * @title TacerFormIntegerType
 */
export type TacerFormIntegerType = {
  props?: InputNumberProps;
};

/**
 * @title TacerFormFloatType
 */
export type TacerFormFloatType = {
  props?: InputNumberProps;
};

/**
 * @title TacerFormPasswordType
 * */
export type TacerFormPasswordType = TacerFormInputType & {
  props?: InputPasswordProps;
};

/**
 * @title TacerFormTimePickerType
 */
export type TacerFormTimePickerType = {
  props?: TimePickerProps;
};

/**
 * @title TacerFormTimeRangePickerType
 */
export type TacerFormTimeRangePickerType = {
  props?: RangePickerProps & {
    onSelect: (valueString: string[], value: dayjs.Dayjs[]) => void;
    disabled?: boolean;
  };
};

/**
 * @title TacerFormPickerType
 */
export type TacerFormDatePickerType = {
  props?: DatePickerProps;
};

/**
 * @title TacerFormDatePickerRangeType
 */
export type TacerFormDateRangePickerType = {
  props?: RangePickerProps & {
    onSelect: (valueString: string[], value: dayjs.Dayjs[]) => void;
    disabled?: boolean;
  };
};

/**
 * @title TacerFormColumn
 */
export type TacerFormColumn = (
  | TacerFormSelectType
  | TacerFormRadioType
  | TacerFormCheckboxType
  | TacerFormRadioGroupType
  | TacerFormCheckboxGroupType
  | TacerFormTextAreaType
  | TacerFormInputType
  | TacerFormIntegerType
  | TacerFormFloatType
  | TacerFormPasswordType
  | TacerFormTimePickerType
  | TacerFormTimeRangePickerType
  | TacerFormDatePickerType
  | TacerFormDateRangePickerType
) & {
  type?:
    | 'input'
    | 'select'
    | 'radio'
    | 'checkbox'
    | 'radio-group'
    | 'checkbox-group'
    | 'textarea'
    | 'integer'
    | 'float'
    | 'password'
    | 'date-picker'
    | 'date-range-picker'
    | 'time-picker'
    | 'time-range-picker';
  label: string | ReactNode;
  field: string;
};

/**
 * @title TacerForm
 */
export interface TacerFormProps {
  columns?: TacerFormColumn[];
  formProps?: FormProps;
  children?: ReactNode;
  columnNumber?: number; // 一行几列
  rowProps?: RowProps;
}

const TacerForm: React.FC<TacerFormProps> = ({
  columns = [],
  formProps,
  children,
  columnNumber = 0,
  rowProps,
}) => {
  const renderSelect = (column: TacerFormSelectType) => (
    <Select
      style={{ width: column.width }}
      placeholder={column.placeholder}
      options={column.options}
      showSearch={column.showSearch}
      allowClear={column.allowClear}
      disabled={column.disabled}
      {...column.props}
    />
  );

  const renderRadio = (column: TacerFormRadioType) => (
    <Radio disabled={column.disabled} {...column.props} />
  );

  const renderCheckbox = (column: TacerFormCheckboxType) => (
    <Checkbox disabled={column.disabled} {...column.props} />
  );

  const renderRadioGroup = (column: TacerFormRadioGroupType) => (
    <Radio.Group disabled={column.disabled} {...column.props} options={column.options} />
  );

  const renderCheckboxGroup = (column: TacerFormCheckboxGroupType) => (
    <Checkbox.Group disabled={column.disabled} {...column.props} options={column.options} />
  );

  const renderTextArea = (column: TacerFormTextAreaType) => (
    <Input.TextArea
      {...column.props}
      placeholder={column.placeholder}
      maxLength={column.maxLength}
      allowClear={column.allowClear}
      disabled={column.disabled}
      showWordLimit={column.showCount || column.maxLength > 0}
      rows={column.minRows}
    />
  );

  const renderPassword = (column: TacerFormPasswordType) => (
    <Input.Password
      placeholder={column.placeholder}
      allowClear={column.allowClear}
      disabled={column.disabled}
      {...column.props}
    />
  );

  const renderInteger = (column: TacerFormIntegerType) => (
    <InputNumber {...column.props} precision={1} />
  );

  const renderFloat = (column: TacerFormFloatType) => <InputNumber {...column.props} />;

  const renderTimePicker = (column: TacerFormTimePickerType) => <TimePicker {...column.props} />;

  const renderTimeRangePicker = (column: TacerFormTimeRangePickerType) => (
    <RangePicker {...column.props} />
  );

  const renderDatePicker = (column: TacerFormDatePickerType) => <DatePicker {...column.props} />;

  const renderDateRangePicker = (column: TacerFormDateRangePickerType) => (
    <DatePicker.RangePicker {...column.props} />
  );

  const renderInput = (column: TacerFormInputType) => (
    <Input
      placeholder={column.placeholder}
      allowClear={column.allowClear}
      disabled={column.disabled}
      {...column.props}
    />
  );

  const renderForm = () => {
    return columns.map((column) => {
      let formItem = null;
      switch (column.type) {
        case 'select':
          formItem = renderSelect(column as TacerFormSelectType);
          break;
        case 'radio':
          formItem = renderRadio(column as TacerFormRadioType);
          break;
        case 'checkbox':
          formItem = renderCheckbox(column as TacerFormCheckboxType);
          break;
        case 'radio-group':
          formItem = renderRadioGroup(column as TacerFormRadioGroupType);
          break;
        case 'checkbox-group':
          formItem = renderCheckboxGroup(column as TacerFormCheckboxGroupType);
          break;
        case 'textarea':
          formItem = renderTextArea(column as TacerFormTextAreaType);
          break;
        case 'password':
          formItem = renderPassword(column as TacerFormInputType);
          break;
        case 'integer':
          formItem = renderInteger(column as TacerFormIntegerType);
          break;
        case 'float':
          formItem = renderFloat(column as TacerFormIntegerType);
          break;
        case 'time-picker':
          formItem = renderTimePicker(column as TacerFormTimePickerType);
          break;
        case 'time-range-picker':
          formItem = renderTimeRangePicker(column as TacerFormTimeRangePickerType);
          break;
        case 'date-picker':
          formItem = renderDatePicker(column as TacerFormDatePickerType);
          break;
        case 'date-range-picker':
          formItem = renderDateRangePicker(column as TacerFormDateRangePickerType);
          break;
        default:
          formItem = renderInput(column as TacerFormInputType);
      }

      return (
        <>
          {columnNumber > 0 ? (
            <Col span={24 / columnNumber}>
              <Form.Item label={column.label} field={column.field} key={column.field}>
                {formItem}
              </Form.Item>
            </Col>
          ) : (
            <Form.Item label={column.label} field={column.field} key={column.field}>
              {formItem}
            </Form.Item>
          )}
        </>
      );
    });
  };
  return (
    <Form {...formProps} layout={columnNumber > 0 ? 'vertical' : formProps?.layout}>
      {columnNumber > 0 ? (
        <Row {...rowProps}>
          {renderForm()}
          <Col span={24 / columnNumber}>{children}</Col>
        </Row>
      ) : (
        <>
          {renderForm()}
          {children}
        </>
      )}
    </Form>
  );
};

export default TacerForm;
