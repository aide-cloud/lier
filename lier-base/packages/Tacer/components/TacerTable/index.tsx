import { Button, Popconfirm, Space, Table, TableProps } from '@arco-design/web-react';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import React from 'react';
import TacerModal, { TacerModalColumns } from '../TacerModal';
import TacerSearch, { TacerSearchColumns } from '../TacerSearch';

export interface TacerTableType<T> {
  title?: string;
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
  searchColumns?: TacerSearchColumns<T>[];
  handleEdit?: (record: T) => void;
  handleDelete?: (record: T) => void;
  handleBatchDelete?: (keys: any[], record: T[]) => void;
  openModal?: (record: T) => void;
  handleModaOk?: (data, form) => void;
  onSearch?: (data, form) => void;
}

/**
 * @title TacerTable
 */
export type TacerTableProps<T = any> = TableProps & TacerTableType<T>;

const TacerTable: React.FC<TacerTableProps> = ({
  title = '',
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
  rowSelection = {},
  modalColumns = [],
  searchColumns = [],
  handleEdit = () => {},
  handleDelete = () => {},
  handleBatchDelete = () => {},
  openModal = () => {},
  handleModaOk = () => {},
  onSearch = () => {},
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<any[]>([]);
  const [selectedRows, setSelectedRows] = React.useState<any[]>([]);
  const [initModalData, setInitModalData] = React.useState({});
  const [opration, setOpration] = React.useState<'add' | 'edit' | 'view'>('add');

  const handleModalOk = () => {
    setModalVisible(false);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const openEditModalHandler = (record) => {
    setOpration('edit');
    setInitModalData(record);
    setModalVisible(true);
    handleEdit(record);
    openModal(record);
  };

  const openViewModalHandler = (record) => {
    setOpration('view');
    setInitModalData(record);
    setModalVisible(true);
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
          align: 'center',
          width: data?.length > 10000 ? 100 : 80,
          render: (_, __, index) => index + 1,
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
              <Button type="primary" size="mini" onClick={() => openViewModalHandler(record)}>
                查看
              </Button>
              <Button type="primary" size="mini" onClick={() => openEditModalHandler(record)}>
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

  const _rowSelection = rowSelection || {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys as string[]);
      setSelectedRows(selectedRows);
    },
  };

  const handleBatchDeleteOnClick = () => {
    handleBatchDelete(selectedRows, selectedRows);
  };

  const renderModalTitle = () => {
    if (opration === 'add') {
      return `新增${title}`;
    }
    if (opration === 'edit') {
      return `编辑${title}`;
    }
    if (opration === 'view') {
      return `查看${title}`;
    }
  };

  return (
    <>
      <TacerModal
        columns={modalColumns}
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        handleOk={handleModaOk}
        initValues={initModalData}
        title={renderModalTitle()}
        disabled={opration === 'view'}
      />
      <TacerSearch onSearch={onSearch} columns={searchColumns} />
      <Table
        size={size}
        hover={hover}
        style={{ ...style }}
        rowKey={rowKey}
        columns={renderColumns()}
        data={data}
        scroll={{ ...scroll }}
        pagination={pagination}
        rowSelection={_rowSelection}
        renderPagination={(paginationNode) => (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 10,
              color: 'var(--color-text-1)',
            }}
          >
            <Space>
              <span>已选择 {selectedRowKeys.length} 条</span>
              <Button size="mini">导出</Button>
              <Button
                size="mini"
                onClick={handleBatchDeleteOnClick}
                disabled={!selectedRowKeys.length}
                status="danger"
              >
                批量删除
              </Button>
            </Space>
            {paginationNode}
          </div>
        )}
      />
    </>
  );
};

export default TacerTable;
