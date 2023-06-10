import { Message, Space } from '@arco-design/web-react';
import React from 'react';
import { CopyText } from 'tacer-cloud';

export default () => {
  return (
    <Space size={12}>
      <CopyText showMessage>第一个text</CopyText>
      <CopyText showMessage mode="button">
        第二个button
      </CopyText>
      <CopyText
        showMessage
        mode="tag"
        tagProps={{
          color: 'red',
        }}
      >
        第三个tag
      </CopyText>

      <CopyText
        showMessage
        mode="button"
        buttonProps={{
          type: 'primary',
        }}
      >
        第二个primary button
      </CopyText>

      <CopyText
        showMessage
        mode="button"
        buttonProps={{
          type: 'primary',
        }}
        message="我复制成功了"
      >
        自定义message
      </CopyText>

      <CopyText
        mode="button"
        buttonProps={{
          type: 'primary',
        }}
        messageFunc={(text) => {
          Message.warning(`我是自定义message触发函数, 我复制的内容是: ${text}`);
        }}
      >
        自定义message触发函数
      </CopyText>

      <CopyText
        mode="button"
        buttonProps={{
          type: 'text',
        }}
        copyFunc={(text) => {
          Message.error(`我是自定义copy函数, 我复制的内容是: ${text}`);
          navigator?.clipboard?.writeText(text);
        }}
      >
        自定义copy函数
      </CopyText>

      <CopyText
        mode="button"
        buttonProps={{
          type: 'text',
        }}
        copyFunc={(text) => {
          Message.error(`我是自定义copy函数, 我复制的内容是: ${text}`);
          navigator?.clipboard?.writeText(text);
        }}
        disabled
      >
        disabled
      </CopyText>
    </Space>
  );
};
