import { Button, Message } from '@arco-design/web-react';
import React from 'react';
import { TacerSearch } from 'tacer-cloud';

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
      width: 200,
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
      type: 'radio-group',
      options: [
        {
          label: '启用',
          value: 1,
        },
        {
          label: '禁用',
          value: 2,
        },
      ],
    },
  ];

  const options = [
    (key) => (
      <Button key={key} type="primary">
        按钮1
      </Button>
    ),
    (key) => (
      <Button key={key} type="primary">
        按钮2
      </Button>
    ),
    (key) => (
      <Button key={key} type="primary">
        按钮3
      </Button>
    ),
  ];

  const handleOnSearch = (data) => {
    Message.info(JSON.stringify(data));
  };
  return <TacerSearch columns={columns} onSearch={handleOnSearch} options={options} />;
};
