import React from 'react';
import { TacerTable } from 'tacer-cloud';
import { Message } from '@arco-design/web-react';

export default () => {
  const searchColumns = [
    {
      label: '姓名',
      field: 'name',
    },
    {
      label: '性别',
      field: 'age',
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
          width: 1500,
        },
        {
          title: '年龄',
          dataIndex: 'age',
          width: 500,
        },
      ]}
      columnOptionWidth={200}
      searchColumns={searchColumns}
      onSearch={handleOnSearch}
      modalColumns={[
        {
          label: '姓名',
          field: 'name',
          rules: [],
          placeholder: '请输入姓名......',
        },
        {
          label: '年龄',
          field: 'age',
          rules: [],
          placeholder: '请输入年龄......',
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
      modalProps={{
        formProps: {
          columnNumber: 2,
          rowProps: {
            gutter: 16,
          },
        },
      }}
    />
  );
};
