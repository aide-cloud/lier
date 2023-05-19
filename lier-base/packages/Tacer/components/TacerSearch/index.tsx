import { Button, Form, FormInstance, Grid } from '@arco-design/web-react';
import React from 'react';
import './style';
import TacerForm, { TacerFormColumn, TacerFormProps } from '../TacerForm';

export enum TacerSearchType {
  Input = 'input',
  Select = 'select',
  DatePicker = 'datePicker',
  RangePicker = 'rangePicker',
  TimePicker = 'timePicker',
  RadioGroup = 'radio-group',
  Checkbox = 'checkbox',
  Switch = 'switch',
}

export type OptionFunc = (key: number) => React.ReactNode;

/**
 * @title TacerSearch
 */
export interface TacerSearchProps<T = any> {
  onSearch?: (data: T, form: FormInstance) => void;
  handleAdd?: () => void;
  columns?: TacerFormColumn[];
  showAdd?: boolean;
  options?: OptionFunc[];
  formProps?: TacerFormProps;
}

const { Row, Col } = Grid;

const TacerSearch: React.FC<TacerSearchProps> = ({
  onSearch = () => {},
  handleAdd = () => {},
  columns = [],
  showAdd = false,
  options = [],
  formProps,
}) => {
  const [form] = Form.useForm();

  const handleSearch = () => {
    onSearch(form.getFieldsValue(), form);
  };

  return (
    <>
      <Row justify="space-between">
        <Col span={18}>
          <TacerForm formProps={{ ...formProps, form, layout: 'inline' }} columns={columns}>
            <Form.Item>
              {columns.length > 0 && (
                <div style={{ gap: 8, display: 'flex' }}>
                  <Button type="primary" onClick={handleSearch}>
                    搜索
                  </Button>
                  <Button onClick={() => form.resetFields()}>重置</Button>
                </div>
              )}
            </Form.Item>
          </TacerForm>
        </Col>
        <Col
          span={6}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 8,
          }}
        >
          {options.map((item, index) => item(index))}
          {showAdd && (
            <Button type="primary" onClick={handleAdd}>
              新增
            </Button>
          )}
        </Col>
      </Row>
    </>
  );
};

export default TacerSearch;
