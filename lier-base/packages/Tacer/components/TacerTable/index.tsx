import { Button, Popconfirm, Space, Table, TableProps } from '@arco-design/web-react';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import React from 'react';
import TacerModal, { TacerModalColumns } from '../TacerModal';

export interface TacerTableType<T> {
  showOption?: boolean;
  showIndex?: boolean;
  height?: number | string;
  width?: number | string;
  page: {
    total?: number;
    pageSize?: number;
    current?: number;
  };
  modalColumns?: TacerModalColumns<T>[];
  handleEdit?: (record: T) => void;
  handleDelete?: (record: T) => void;
  openModal?: (record: T) => void;
  handleModaOk?: (data, form) => void;
}

/**
 * @title TacerTable
 */
export type TacerTableProps<T = any> = TableProps & TacerTableType<T>;

const TacerTable: React.FC<TacerTableProps> = ({
  style,
  columns = [],
  data,
  rowKey,
  hover = true,
  size = 'default',
  showOption = true,
  showIndex = true,
  height = 600,
  width = 1600,
  scroll = {
    x: width,
    y: height,
  },
  page = {
    total: 0 || data?.length,
    pageSize: 10,
    current: 1,
  },
  pagination = {
    sizeCanChange: true,
    showTotal: true,
    total: page.total,
    pageSize: page.pageSize,
    current: page.current,
    pageSizeChangeResetCurrent: true,
  },
  modalColumns = [],
  handleEdit = () => {},
  handleDelete = () => {},
  openModal = () => {},
  handleModaOk = () => {},
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleModalOk = () => {
    setModalVisible(false);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const openModalHandler = (record) => {
    setModalVisible(true);
    handleEdit(record);
    openModal(record);
  };

  const renderColumns = () => {
    let _columns = columns;
    if (showIndex) {
      _columns = [
        {
          title: '序号',
          dataIndex: '__index__',
          fixed: 'left',
        },
        ...columns,
      ];
    }

    if (showOption) {
      _columns = [
        ..._columns,
        {
          title: '操作',
          dataIndex: 'action',
          fixed: 'right',
          align: 'center',
          width: 200,
          render: (_, record) => (
            <Space>
              <Button type="primary" size="mini" onClick={() => openModalHandler(record)}>
                编辑
              </Button>
              <Popconfirm
                title="确认删除该设备吗？"
                onOk={() => handleDelete(record)}
                disabled={record.id === localStorage.getItem('userId')}
              >
                <Button
                  type="outline"
                  size="mini"
                  disabled={record.id === localStorage.getItem('userId')}
                  status="danger"
                >
                  删除
                </Button>
              </Popconfirm>
            </Space>
          ),
        },
      ];
    }

    return _columns as ColumnProps[];
  };

  return (
    <>
      <TacerModal
        columns={modalColumns}
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        handleOk={handleModaOk}
      />
      <Table
        size={size}
        hover={hover}
        style={{ ...style }}
        rowKey={rowKey}
        columns={renderColumns()}
        data={data}
        scroll={{ ...scroll }}
        pagination={pagination}
      />
    </>
  );
};

export default TacerTable;
