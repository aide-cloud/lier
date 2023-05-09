import React from 'react';
import { TacerTable } from 'tacer-cloud';
import { Input, Message } from '@arco-design/web-react';

export default () => {
  const searchColumns = [
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

  return (
    <TacerTable
      data={[
        {
          name: '张三',
          age: 18,
          id: 1,
        },
      ]}
      columns={[
        {
          title: '姓名',
          dataIndex: 'name',
        },
        {
          title: '年龄',
          dataIndex: 'age',
        },
      ]}
      searchColumns={searchColumns}
      onSearch={handleOnSearch}
      modalColumns={[
        {
          title: 'title',
          field: 'name',
          rules: [],
          placeholder: 'placeholder',
          render: (_, dis) => <Input disabled={dis} />,
        },
        {
          title: 'title1',
          field: 'age',
          rules: [],
          placeholder: 'placeholder',
        },
      ]}
      handleModaOk={(data, form) => {
        Message.info(JSON.stringify(data));
      }}
    />
  );
};
