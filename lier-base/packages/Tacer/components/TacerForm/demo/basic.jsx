import React from 'react';
import { TacerForm } from 'tacer-cloud';

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
      field: 'hobby2',
      type: 'checkbox-group',
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
  ];
  return (
    <TacerForm
      formProps={
        {
          // layout: 'inline',
        }
      }
      columns={columns}
    />
  );
};
