import {
  Button,
  PaginationProps,
  Popconfirm,
  Space,
  Table,
  TableProps,
} from '@arco-design/web-react';
import type { ColumnProps } from '@arco-design/web-react/es/Table';
import { SorterInfo } from '@arco-design/web-react/es/Table/interface';
import React, { useEffect } from 'react';
import TacerSearch, { OptionFunc } from '../TacerSearch';
import type { TacerFormColumn } from '../TacerForm';
import TacerFormModal from '../TacerFormModal';

import './style';

export interface TacerTableType<T> {
  mudule?: string;
  showOption?: boolean;
  showIndex?: boolean;
  height?: number | string;
  width?: number | string;
  total?: number;
  page?: {
    total?: number;
    pageSize?: number;
    current?: number;
  };
  modalColumns?: TacerFormColumn[];
  searchColumns?: TacerFormColumn[];
  searchOptions?: OptionFunc[];
  showAdd?: boolean;
  handleEdit?: (record: T) => any;
  handleView?: (record: T) => any;
  handleDelete?: (record: T) => void;
  handleBatchDelete?: (keys: any[], record: T[]) => void;
  handleBatchExport?: (keys: any[], record: T[]) => void;
  openModal?: (record: T) => void;
  handleModaOk?: (data, form, op: 'add' | 'edit' | 'view') => void;
  onSearch?: (data, form) => void;
  handleOnChange?: (
    pg: PaginationProps,
    sorter: SorterInfo,
    filters: Partial<Record<string | number | symbol, string[]>>,
    extra: {
      currentData: any[];
      action: 'sort' | 'filter' | 'paginate';
    }
  ) => Promise<T>;
}

/**
 * @title TacerTable
 */
export type TacerTableProps<T = any> = TableProps & TacerTableType<T>;

const TacerTable = (props: TacerTableProps) => {
  const {
    mudule = '',
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
    total = 0 || data?.length,
    page = {
      total,
      pageSize: 10,
      current: 1,
    },
    rowSelection,
    modalColumns = [],
    searchColumns = [],
    searchOptions = [],
    handleEdit = () => {},
    handleView = () => {},
    handleDelete = () => {},
    handleBatchDelete = () => {},
    handleBatchExport = () => {},
    openModal = () => {},
    handleModaOk = () => {},
    onSearch = () => {},
    showAdd = true,
    loading,
    onChange = () => {},
    handleOnChange = () => Promise.resolve(),
  } = props;
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<any[]>([]);
  const [selectedRows, setSelectedRows] = React.useState<any[]>([]);
  const [initModalData, setInitModalData] = React.useState({});
  const [opration, setOpration] = React.useState<'add' | 'edit' | 'view'>('add');

  const [pagination, setPagination] = React.useState<PaginationProps>({
    sizeCanChange: true,
    showTotal: true,
    total: page.total,
    pageSize: page.pageSize,
    current: page.current,
    pageSizeChangeResetCurrent: true,
  });

  useEffect(() => {
    setPagination({
      ...pagination,
      total,
    });
  }, [total]);

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const openAddModalHandler = () => {
    setOpration('add');
    setInitModalData({});
    setModalVisible(true);
    openModal({});
  };

  const openEditModalHandler = (record) => {
    setOpration('edit');
    setInitModalData(handleEdit(record));
    setModalVisible(true);
    openModal(record);
  };

  const openViewModalHandler = (record) => {
    setOpration('view');
    setInitModalData(handleView(record));
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
          dataIndex: '__action__',
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
              <Popconfirm title="确认删除该设备吗？" onOk={() => handleDelete(record)}>
                <Button type="outline" size="mini" status="danger">
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
    onChange: (rowKeys, rows) => {
      setSelectedRowKeys(rowKeys);
      setSelectedRows(rows);
    },
  };

  const handleBatchDeleteOnClick = () => {
    handleBatchDelete(selectedRowKeys, selectedRows);
  };

  const handleBatchExportOnClick = () => {
    handleBatchExport(selectedRowKeys, selectedRows);
  };

  const onChangeTable = (
    pg: PaginationProps,
    sorter: SorterInfo,
    filters: Partial<Record<string | number | symbol, string[]>>,
    extra: {
      currentData: any[];
      action: 'sort' | 'filter' | 'paginate';
    }
  ) => {
    onChange(pg, sorter, filters, extra);
    handleOnChange(pg, sorter, filters, extra).then(() => {
      setPagination({
        ...pg,
      });
    });
  };

  const onModalOk = (data, form) => {
    handleModaOk(
      {
        ...initModalData,
        ...data,
      },
      form,
      opration
    );
  };

  return (
    <>
      <TacerFormModal
        columns={modalColumns}
        visible={modalVisible}
        onOk={onModalOk}
        onCancel={handleModalCancel}
        category={opration}
        initValue={initModalData}
        mudule={mudule}
      />
      <TacerSearch
        onSearch={onSearch}
        columns={searchColumns}
        showAdd={showAdd}
        handleAdd={openAddModalHandler}
        options={searchOptions}
      />
      <Table
        size={size}
        hover={hover}
        style={style}
        rowKey={rowKey || 'id'}
        columns={renderColumns()}
        data={data}
        loading={loading}
        scroll={scroll}
        pagination={pagination}
        rowSelection={_rowSelection}
        onChange={onChangeTable}
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
              <Button
                disabled={!selectedRowKeys.length}
                size="mini"
                onClick={handleBatchExportOnClick}
              >
                导出
              </Button>
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
