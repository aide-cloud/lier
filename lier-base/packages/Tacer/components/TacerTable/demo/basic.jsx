import React from 'react';
import { TacerTable } from 'tacer-cloud';
import { Input, Checkbox, Message } from '@arco-design/web-react';

export default () => {
  return (
    <TacerTable
      data={[{}]}
      modalColumns={[
        {
          title: 'title',
          field: 'field',
          rules: [],
          placeholder: 'placeholder',
          render: () => <Input />,
        },
        {
          title: 'title1',
          field: 'field1',
          rules: [],
          placeholder: 'placeholder',
          render: () => <Checkbox />,
        },
      ]}
      handleModaOk={(data, form) => {
        Message.info(JSON.stringify(data));
      }}
    />
  );
};
