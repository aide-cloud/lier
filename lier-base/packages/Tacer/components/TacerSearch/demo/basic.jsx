import { Message } from '@arco-design/web-react';
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

  const handleOnSearch = (data) => {
    Message.info(JSON.stringify(data));
  };
  return <TacerSearch columns={columns} onSearch={handleOnSearch} />;
};
