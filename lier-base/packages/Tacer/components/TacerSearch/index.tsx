import {
  Button,
  Checkbox,
  Form,
  FormInstance,
  Input,
  Radio,
  Select,
  Grid,
} from '@arco-design/web-react';
import React from 'react';
import './style';

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

export interface TacerSearchColumns<T> {
  title: string;
  name: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  width?: number;
  type?: TacerSearchType;
  placeholder?: string;
  options?: any[];
}

export type OptionFunc = (key: number) => React.ReactNode;

/**
 * @title TacerSearch
 */
export interface TacerSearchProps<T = any> {
  onSearch?: (data: T, form: FormInstance<T, T, string | number | symbol>) => void;
  handleAdd?: () => void;
  columns?: TacerSearchColumns<T>[];
  showAdd?: boolean;
  options?: OptionFunc[];
}

const { Row, Col } = Grid;

const TacerSearch: React.FC<TacerSearchProps> = ({
  onSearch = () => {},
  handleAdd = () => {},
  columns = [],
  showAdd = false,
  options = [],
}) => {
  const [form] = Form.useForm();

  const renderFormItem = (item: TacerSearchColumns<any>) => {
    switch (item.type) {
      case TacerSearchType.Select:
        return <Select placeholder={item.placeholder} options={item.options} />;
      case TacerSearchType.RadioGroup:
        return <Radio.Group options={item.options} />;
      case TacerSearchType.Checkbox:
        return <Checkbox.Group options={item.options} />;
      default:
        return <Input placeholder={item.placeholder} />;
    }
  };

  const handleSearch = () => {
    onSearch(form.getFieldsValue(), form);
  };

  return (
    <>
      <Row justify="space-between">
        <Col span={18}>
          <Form form={form} layout="inline">
            {columns.map((item, index) => {
              return (
                <Form.Item key={index} field={item.name} label={item.title}>
                  {renderFormItem(item)}
                </Form.Item>
              );
            })}
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
          </Form>
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
