import { Form, FormInstance, Modal, ModalProps } from '@arco-design/web-react';
import React, { ReactNode } from 'react';
import TacerForm, { TacerFormColumn } from '../TacerForm';

/**
 * @title TacerFormModal
 */
export interface TacerFormModalProps<T = any> {
  title: ReactNode;
  category?: 'create' | 'edit' | 'view';
  mudule?: string;
  children?: ReactNode;
  style?: React.CSSProperties;
  modalProps?: ModalProps;
  visible?: boolean;
  columns?: TacerFormColumn[];
  onOk?: (data: T, form: FormInstance) => void;
  onCancel?: (form: FormInstance) => void;
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
  onOk = () => {},
  onCancel = () => {},
}) => {
  const [form] = Form.useForm();

  const handleOnOk = () => {
    form.validate().then((val) => onOk(val, form));
  };

  const handleOnCancel = () => {
    onCancel(form);
  };

  const showTitle = () => {
    switch (category) {
      case 'create':
        return `新建${mudule}`;
      case 'edit':
        return `编辑${mudule}`;
      case 'view':
        return `查看${mudule}`;
      default:
        return mudule || title;
    }
  };

  return (
    <Modal
      {...modalProps}
      style={style}
      visible={visible}
      onOk={handleOnOk}
      onCancel={handleOnCancel}
      title={showTitle()}
    >
      {columns.length > 0 ? (
        <TacerForm
          formProps={{
            form,
            layout: 'vertical',
          }}
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
