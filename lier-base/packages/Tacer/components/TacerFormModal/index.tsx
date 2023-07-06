import { Form, FormInstance, Modal } from '@arco-design/web-react';
import type { ModalProps } from '@arco-design/web-react';
import React, { ReactNode, useEffect, useState } from 'react';
import TacerForm, { TacerFormColumn, TacerFormProps } from '../TacerForm';

import './style';

/**
 * @title TacerFormModal
 */
export interface TacerFormModalProps<T = any> {
  title?: ReactNode;
  category?: 'add' | 'edit' | 'view';
  mudule?: string;
  children?: ReactNode;
  style?: React.CSSProperties;
  modalProps?: ModalProps;
  visible?: boolean;
  columns?: TacerFormColumn[] | TacerFormColumn[][];
  disabled?: boolean;
  initValue?: any;
  onOk?: (data: T, form: FormInstance) => void;
  onCancel?: (form: FormInstance) => void;
  formProps?: TacerFormProps;
}

const TacerFormModal: React.FC<TacerFormModalProps> = ({
  title = '',
  category,
  mudule = '',
  children,
  modalProps,
  style,
  visible,
  columns = [],
  disabled,
  initValue,
  formProps,
  onOk = () => {},
  onCancel = () => {},
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleOnOk = () => {
    setLoading(true);
    form
      .validate()
      .then((val) => onOk(val, form))
      .finally(() => setLoading(false));
  };

  const handleOnCancel = () => {
    onCancel(form);
  };

  const showTitle = () => {
    switch (category) {
      case 'add':
        return `新增${mudule}`;
      case 'edit':
        return `编辑${mudule}`;
      case 'view':
        return `查看${mudule}`;
      default:
        return mudule || title;
    }
  };

  useEffect(() => {
    if (visible && form) {
      form.setFieldsValue(initValue);
    }

    if (!visible && form) {
      form.resetFields();
    }
  }, [initValue, form, visible]);

  return (
    <Modal
      {...modalProps}
      style={style}
      visible={visible}
      onOk={handleOnOk}
      onCancel={handleOnCancel}
      title={showTitle()}
      confirmLoading={loading}
    >
      {columns.length > 0 ? (
        <TacerForm
          {...formProps}
          formProps={{ form }}
          disabled={disabled || category === 'view'}
          columns={columns}
        >
          {children}
        </TacerForm>
      ) : (
        children
      )}
    </Modal>
  );
};

export default TacerFormModal;
