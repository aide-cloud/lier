import {
  Button,
  Dropdown,
  Menu,
  PaginationProps,
  Popconfirm,
  Space,
  Table,
  TableProps,
} from '@arco-design/web-react';
import { IconDown } from '@arco-design/web-react/icon';
import type { ColumnProps } from '@arco-design/web-react/es/Table';
import { SorterInfo } from '@arco-design/web-react/es/Table/interface';
import React, { useEffect } from 'react';
import TacerSearch, { OptionFunc, TacerSearchProps } from '../TacerSearch';
import type { TacerFormColumn } from '../TacerForm';
import TacerFormModal, { TacerFormModalProps } from '../TacerFormModal';

import './style';

export type ColumnOptionFunc<T = any> = (
  record: T,
  index: number
) => {
  onClick?: () => void;
  node?: React.ReactNode;
};

export interface TacerTableType<T> {
  modalProps?: TacerFormModalProps;
  searchProps?: TacerSearchProps;
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
  modalColumns?: (TacerFormColumn | TacerFormColumn[])[];
  searchColumns?: TacerFormColumn[];
  searchOptions?: OptionFunc[];
  columnOptions?: ColumnOptionFunc<T>[];
  columnOptionWidth?: number | string;
  showAdd?: boolean;
  disabledView?: boolean;
  disabledEdit?: boolean;
  disabledDelete?: boolean;
  handleEdit?: (record: T) => { [key: string]: any };
  handleView?: (record: T) => { [key: string]: any };
  handleDelete?: (record: T) => Promise<T>;
  handleBatchDelete?: (keys: any[], record: T[]) => Promise<T>;
  handleBatchExport?: (keys: any[], record: T[]) => Promise<T>;
  openModal?: (record: T) => void;
  handleModaOk?: (data, form, op: 'add' | 'edit' | 'view', origin: any) => Promise<T>;
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

const TacerTable: React.FC<TacerTableProps> = (props: TacerTableProps) => {
  const {
    modalProps,
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
    handleEdit = () => ({}),
    handleView = () => ({}),
    handleDelete = () => Promise.resolve(),
    handleBatchDelete,
    handleBatchExport,
    openModal = () => {},
    handleModaOk = () => Promise.resolve(),
    onSearch = () => {},
    showAdd = true,
    loading,
    onChange = () => {},
    handleOnChange = () => Promise.resolve(),
    disabledDelete,
    disabledEdit,
    disabledView,
    searchProps,
    columnOptions = [],
    columnOptionWidth = 200,
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

  const operateColumn = (record) => {
    const dropList = (
      <Menu>
        {columnOptions.length > 0 &&
          columnOptions.map((item, index) => {
            const { onClick, node } = item(record, index);
            return (
              <Menu.Item
                key={`${index}`}
                onClick={onClick}
                style={{ color: 'rgb(var(--arcoblue-7))' }}
              >
                {node}
              </Menu.Item>
            );
          })}
      </Menu>
    );
    return (
      <Dropdown droplist={dropList} position="bl">
        <Button type="text" size="mini">
          更多 <IconDown />
        </Button>
      </Dropdown>
    );
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
          width: columnOptionWidth,
          render: (_, record) => (
            <Space style={{ width: columnOptionWidth }} wrap>
              {!disabledView && (
                <Button type="primary" size="mini" onClick={() => openViewModalHandler(record)}>
                  查看
                </Button>
              )}
              {!disabledEdit && (
                <Button type="primary" size="mini" onClick={() => openEditModalHandler(record)}>
                  编辑
                </Button>
              )}
              {!disabledDelete && (
                <Popconfirm title="确认删除该设备吗？" onOk={() => handleDelete(record)}>
                  <Button type="outline" size="mini" status="danger">
                    删除
                  </Button>
                </Popconfirm>
              )}
              {operateColumn(record)}
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
    handleBatchDelete && handleBatchDelete(selectedRowKeys, selectedRows);
  };

  const handleBatchExportOnClick = () => {
    handleBatchExport && handleBatchExport(selectedRowKeys, selectedRows);
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
    handleModaOk(data, form, opration, initModalData).then(() => {
      setModalVisible(false);
    });
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
        {...modalProps}
      />
      <TacerSearch
        onSearch={onSearch}
        columns={searchColumns}
        showAdd={showAdd}
        handleAdd={openAddModalHandler}
        options={searchOptions}
        {...searchProps}
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
              {(handleBatchExport || handleBatchDelete) && (
                <span>已选择 {selectedRowKeys.length} 条</span>
              )}
              {handleBatchExport && (
                <Button
                  disabled={!selectedRowKeys.length}
                  size="mini"
                  onClick={handleBatchExportOnClick}
                >
                  导出
                </Button>
              )}
              {handleBatchDelete && (
                <Button
                  size="mini"
                  onClick={handleBatchDeleteOnClick}
                  disabled={!selectedRowKeys.length}
                  status="danger"
                >
                  批量删除
                </Button>
              )}
            </Space>
            {paginationNode}
          </div>
        )}
      />
    </>
  );
};

export default TacerTable;
