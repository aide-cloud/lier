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
      total={100}
      data={[
        {
          name: '张三',
          age: 18,
          id: 1,
        },
        ...Array(10)
          .fill(0)
          .map((_, index) => ({
            name: `张三${index}`,
            age: 18,
            id: index + 2,
          })),
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
        Message.info('编辑提交');
        Message.info(JSON.stringify(data));
      }}
      handleBatchExport={(selectedRowKeys, selectedRows) => {
        Message.info('导出');
        Message.info(JSON.stringify(selectedRowKeys));
        Message.info(JSON.stringify(selectedRows));
      }}
      handleBatchDelete={(selectedRowKeys, selectedRows) => {
        Message.info('批量删除');
        Message.info(JSON.stringify(selectedRowKeys));
        Message.info(JSON.stringify(selectedRows));
      }}
      handleDelete={(record) => {
        Message.info('删除');
        Message.info(JSON.stringify(record));
      }}
    />
  );
};
