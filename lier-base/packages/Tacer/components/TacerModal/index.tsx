import { Form, FormInstance, Input, Modal, ModalProps } from '@arco-design/web-react';
import React, { ReactNode, useEffect } from 'react';

export type TacerModalColumns<T = any> = {
  title: string;
  field: string;
  render?: (record: T, disabled?: boolean) => ReactNode;
  rules?: any[];
  placeholder?: string;
};

/**
 * @title TacerModal
 */
export type TacerModalProps<T = any> = ModalProps & {
  columns?: TacerModalColumns<T>[];
  initValues?: T;
  disabled?: boolean;
  handleOk?: (data: any, form: FormInstance) => void;
  handleCancel?: (form: FormInstance) => void;
};

const TacerModal: React.FC<TacerModalProps> = ({
  columns = [],
  visible = false,
  disabled = false,
  title = 'title',
  initValues = {},
  onOk,
  onCancel,
  handleOk = () => {},
  handleCancel = () => {},
}) => {
  const [form] = Form.useForm();

  const handleModalOk = (e) => {
    form.validate().then((values) => {
      handleOk(values, form);
      onOk?.(e);
    });
  };

  const handleModalCancel = () => {
    handleCancel(form);
    onCancel?.();
  };

  useEffect(() => {
    if (open && form) {
      form.setFieldsValue(initValues);
    }

    if (!open && form) {
      form.resetFields();
    }
  }, [form, open, initValues]);

  return (
    <Modal visible={visible} title={title} onOk={handleModalOk} onCancel={handleModalCancel}>
      <Form form={form} layout="vertical">
        {columns.map((item) => {
          return (
            <Form.Item label={item.title} field={item.field} rules={item.rules}>
              {item.render ? (
                item.render(initValues, disabled)
              ) : (
                <Input disabled={disabled} placeholder={item.placeholder} />
              )}
            </Form.Item>
          );
        })}
      </Form>
    </Modal>
  );
};

export default TacerModal;
