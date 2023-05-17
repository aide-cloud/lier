import React from 'react';
import { TacerForm } from 'tacer-cloud';
import { Button, Form, Input, Message } from '@arco-design/web-react';

export default () => {
  const columns = [
    {
      label: '姓名',
      field: 'name',
    },
    {
      label: '年龄',
      field: 'age',
    },
    {
      label: 'money',
      field: 'money',
      type: 'integer',
    },
    {
      label: '日期',
      field: 'date',
      type: 'time-picker',
    },
    {
      label: '日期范围',
      field: 'date-all',
      type: 'time-range-picker',
    },
    {
      label: '日期2',
      field: 'date2',
      type: 'date-picker',
    },
    {
      label: '日期3',
      field: 'date3',
      type: 'date-range-picker',
    },
    {
      label: '性别',
      field: 'gender',
      type: 'select',
      // width: 200,
      options: [
        {
          label: '男',
          value: 1,
        },
        {
          label: '女',
          value: 2,
        },
      ],
    },
    {
      label: '状态',
      field: 'status',
      type: 'radio',
    },
    {
      label: '爱好',
      field: 'hobby',
      type: 'checkbox',
    },
    {
      label: '爱好2',
      field: 'hobby2',
      type: 'radio-group',
      options: [
        {
          label: '篮球',
          value: 1,
        },
        {
          label: '足球',
          value: 2,
          disabled: true,
        },
      ],
    },
    {
      label: '爱好3',
      field: 'hobby2-1',
      type: 'checkbox-group',
      options: [
        {
          label: '篮球',
          value: 1,
        },
        {
          label: '足球',
          value: 2,
          // disabled: true,
        },
      ],
    },
    {
      label: '备注',
      field: 'remark',
      type: 'textarea',
      // showCount: true,
      minRows: 10,
      maxLength: 100,
    },
  ];

  const [form] = Form.useForm();

  return (
    <TacerForm
      formProps={{
        // layout: 'inline',
        form,
      }}
      columns={columns}
    >
      <Form.Item label="自定义" field="name-1">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          onClick={() => {
            form.validate().then((data) => {
              Message.success(JSON.stringify(data));
            });
          }}
        >
          提交
        </Button>
      </Form.Item>
      <Form.Item shouldUpdate>
        {(value) => {
          return <pre>{JSON.stringify(value, null, 2)}</pre>;
        }}
      </Form.Item>
    </TacerForm>
  );
};
