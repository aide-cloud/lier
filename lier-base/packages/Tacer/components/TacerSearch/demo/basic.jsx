import { Button, Message } from '@arco-design/web-react';
import React from 'react';
import { TacerSearch } from 'tacer-cloud';

export default () => {
  const columns = [
    {
      title: '姓名',
      name: 'name',
    },
    {
      title: '性别',
      name: 'age',
      type: 'radio-group',
      options: [
        {
          label: '男',
          value: '1',
        },
        {
          label: '女',
          value: '2',
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
