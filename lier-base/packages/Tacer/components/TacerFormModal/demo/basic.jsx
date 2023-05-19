import React from 'react';
import { TacerFormModal } from 'tacer-cloud';
import { Button, Message } from '@arco-design/web-react';

export default () => {
  const [visible, setVisible] = React.useState(false);

  const handleOnOK = (data, form) => {
    Message.info();
    form.resetFields();
    setVisible(false);
  };

  const handleCancel = (form) => {
    setVisible(false);
    form.resetFields();
  };

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

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        打开弹窗
      </Button>
      <TacerFormModal
        mudule="用户"
        category="edit"
        visible={visible}
        onOk={handleOnOK}
        onCancel={handleCancel}
        columns={columns}
        style={{ width: 1600 }}
        formProps={{ columnNumber: 2, rowProps: { gutter: 20 } }}
      />
    </>
  );
};
