import React, { ReactNode } from 'react';
import { Checkbox, Form, Input, Radio, Select, TextAreaProps } from '@arco-design/web-react';

import type {
  RadioProps,
  RadioGroupProps,
  InputProps,
  CheckboxGroupProps,
  CheckboxProps,
  FormProps,
  SelectProps,
} from '@arco-design/web-react';

import './style';

/**
 * @title TacerFormInputType
 */
export type TacerFormInputType = {
  label: string | ReactNode;
  field: string;
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
  options?: TacerFormItemOption[];
  showSearch?: boolean;
  width?: string | number;
  props?: SelectProps;
};

/**
 * @title TacerFormRadioType
 */
export type TacerFormRadioType = {
  props?: RadioProps;
};

/**
 * @title TacerFormCheckboxType
 */
export type TacerFormCheckboxType = {
  props?: CheckboxProps;
};

/**
 * @title TacerFormRadioGroupType
 */
export type TacerFormRadioGroupType = {
  options: TacerFormItemOption[];
  props?: RadioGroupProps;
};

/**
 * @title TacerFormCheckboxGroupType
 */
export type TacerFormCheckboxGroupType = {
  options: TacerFormItemOption[];
  props?: CheckboxGroupProps<any>;
};

export type TacerFormTextAreaType = {
  props?: TextAreaProps;
  disabled?: boolean;
  maxLength?: number;
  maxRows?: number;
  minRows?: number;
  showCount?: boolean;
};

/**
 * @title TacerFormColumn
 */
export type TacerFormColumn = TacerFormSelectType &
  TacerFormRadioType &
  TacerFormCheckboxType &
  TacerFormRadioGroupType &
  TacerFormCheckboxGroupType &
  TacerFormTextAreaType &
  TacerFormInputType & {
    type?:
      | 'input'
      | 'select'
      | 'radio'
      | 'checkbox'
      | 'radio-group'
      | 'checkbox-group'
      | 'textarea';
  };

/**
 * @title TacerForm
 */
export interface TacerFormProps {
  columns?: TacerFormColumn[];
  formProps?: FormProps;
  children?: ReactNode;
}

const TacerForm: React.FC<TacerFormProps> = ({ columns = [], formProps, children }) => {
  const renderSelect = (column: TacerFormColumn) => (
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

  const renderRadio = (column: TacerFormColumn) => (
    <Radio disabled={column.disabled} {...column.props} />
  );

  const renderCheckbox = (column: TacerFormColumn) => (
    <Checkbox disabled={column.disabled} {...column.props} />
  );

  const renderRadioGroup = (column: TacerFormColumn) => (
    <Radio.Group disabled={column.disabled} {...column.props} options={column.options} />
  );

  const renderCheckboxGroup = (column: TacerFormColumn) => (
    <Checkbox.Group disabled={column.disabled} {...column.props} options={column.options} />
  );

  const renderTextArea = (column: TacerFormColumn) => (
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

  const renderForm = () => {
    return columns.map((column) => {
      let formItem = null;
      switch (column.type) {
        case 'select':
          formItem = renderSelect(column);
          break;
        case 'radio':
          formItem = renderRadio(column);
          break;
        case 'checkbox':
          formItem = renderCheckbox(column);
          break;
        case 'radio-group':
          formItem = renderRadioGroup(column);
          break;
        case 'checkbox-group':
          formItem = renderCheckboxGroup(column);
          break;
        case 'textarea':
          formItem = renderTextArea(column);
          break;
        default:
          formItem = (
            <Input
              placeholder={column.placeholder}
              allowClear={column.allowClear}
              disabled={column.disabled}
              {...column.props}
            />
          );
      }

      return (
        <Form.Item label={column.label} field={column.field} key={column.field}>
          {formItem}
        </Form.Item>
      );
    });
  };
  return (
    <Form {...formProps}>
      {renderForm()}
      {children}
    </Form>
  );
};

export default TacerForm;
