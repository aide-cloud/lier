## 属性/Props


### `<TacerTable>`

|参数名|描述|类型|默认值|
|---|:---:|:---:|---:|
|style|节点样式|`CSSProperties`|`-`|
|className|节点类名|`string \| string[]`|`-`|
|tableLayoutFixed|@zh 表格的 `table-layout` 属性设置为 `fixed`，设置为 `fixed` 后，表格的宽度不会被内容撑开超出 100%。
@en The table's `table-layout` property is set to `fixed`. After set to `fixed`, the width of the table will not be stretched by the content beyond 100%.|`boolean`|`-`|
|rowKey|@zh 表格行 key 的取值字段
@en Table row key
@defaultValue key|`any`|`-`|
|columns|@zh 列描述数据对象的数组
@en An array of column objects|`ColumnProps<any>[]`|`-`|
|components|@zh 覆盖原生表格标签
@en Override native table tag|`ComponentsProps`|`-`|
|data|@zh 表格数据
@en Data record array to be displayed|`any[]`|`-`|
|border|@zh 边框设置
@en Configure border
@defaultValue true|`boolean \| { wrapper?: boolean; headerCell?: boolean; bodyCell?: boolean; cell?: boolean; }`|`-`|
|borderCell|@zh 是否显示单元格边框，作用等同于 `border={{ cell: true }}`
@en Whether to display the table cell border, equivalent to `border={{ cell: true }}`|`boolean`|`-`|
|hover|@zh 是否开启鼠标悬浮效果
@en Whether to enable the hover style
@defaultValue true|`boolean`|`-`|
|defaultExpandAllRows|@zh 默认展开所有可展开的行
@en Expand all expandable rows by default|`boolean`|`-`|
|expandedRowKeys|@zh 展开的行（受控）
@en To set expanded rows.|`(string \| number)[]`|`-`|
|defaultExpandedRowKeys|@zh 默认展开的行
@en To set default expanded rows|`(string \| number)[]`|`-`|
|expandedRowRender|@zh 点击展开额外的行，渲染函数。返回值为 `null` 时，不会渲染展开按钮
@en Click to expand additional rows, rendering functions. When the return value is `null`, the expand button will not be rendered|`(record: any, index: number) => ReactNode`|`-`|
|expandProps|@zh 自定义展开/关闭列的图标，宽度，标题，具体用法看[这个例子](/react/components/table#定制展开参数)
@en Customize the icon, width, and title of the expandable column, see [this example](/react/components/table#custom expand parameters) for usage|`ExpandProps<any>`|`-`|
|onExpand|@zh 点击展开的回调
@en Callback when click to expand|`(record: any, expanded: boolean) => void`|`-`|
|onExpandedRowsChange|@zh 点击展开时触发，参数为展开行数组
@en Callback when expanded button is clicked, the parameter is an array of expanded rows|`(expandedRows: (string \| number)[]) => void`|`-`|
|loading|@zh 表格是否在加载中
@en Whether the table is in loading|`boolean \| SpinProps`|`-`|
|noDataElement|@zh 没有数据的时候显示的元素
@en Element to be displayed when there is no data|`ReactNode`|`-`|
|showHeader|@zh 是否显示表头
@en Whether to show the header
@defaultValue true|`boolean`|`-`|
|showSorterTooltip|@zh 表头是否显示下一次排序的 tooltip 提示。可以设置对象，可以传 `Tooltip` 组件的所有参数。
@en Whether the header shows the tooltip for the next sorting. The object can be set,
and all the parameters of the `Tooltip` component can be passed.
@version 2.19.0
@defaultValue true|`boolean \| TooltipProps`|`-`|
|stripe|@zh 是否开启斑马纹
@en Whether to show stripe style|`boolean`|`-`|
|size|@zh 表格尺寸，分为 默认，`默认` `中` `小` `迷你` 四个尺寸
@en The table size is divided into four sizes, `default` `medium` `small` `mini`|`"default" \| "middle" \| "small" \| "mini"`|`-`|
|onChange|@zh 分页、排序、筛选时的回调
@en Callback when pagination, sorting, and filtering changes
@version extra in `2.19.0`|`(pagination: PaginationProps, sorter: SorterInfo, filters: Partial<Record<string \| number \| symbol, string[]>>, extra: { currentData: any[]; action: "paginate" \| ... 1 more ... \| "filter"; }) => void`|`-`|
|pagination|@zh 分页器设置，参考[Pagination组件](/react/components/pagination)，设置 `false` 不展示分页
@en Pagination settings, refer to [Pagination components](/react/components/pagination), set `false` to hide pagination|`boolean \| PaginationProps`|`-`|
|renderPagination|@zh 自定义分页渲染。
@en Customized pagination render
@version 2.11.0|`(paginationNode?: ReactNode) => ReactNode`|`-`|
|scroll|@zh 设置x轴或y轴的滚动。`x` 设置为 `true`，会给 table 添加 `table-layout: fixed` 以及给父元素添加 `overflow: auto`。
`y` 设置为 `true`，表头和表身会分离，放在两个 table 中
@en Set the scroll of x-axis or y-axis. Setting `x` to `true` will add `table-layout: fixed` to the table and `overflow: auto` to the parent element.
If `y` is set to `true`, the header and body will be separated and placed in two tables|`{ x?: string \| number \| boolean; y?: string \| number \| boolean; }`|`-`|
|rowClassName|@zh 表格行的类名
@en ClassName of table row|`(record: any, index: number) => string`|`-`|
|rowSelection|@zh 设置表格行是否可选，选中事件等。[配置项](#rowselection)
@en Set whether the table row is selectable, select event, etc. [Configuration item](#rowselection)|`RowSelectionProps<any>`|`-`|
|onHeaderRow|@zh 设置表头行单元格的各项事件回调
@en Set the event callback of the header row|`(columns: ColumnProps<any>[], index: number) => RowCallbackProps`|`-`|
|onRow|@zh 设置表格行的各项事件回调
@en Set the event callback of the table row|`(record: any, index: number) => RowCallbackProps`|`-`|
|placeholder|@zh 当单元格内容为空时，显示占位符，优先级低于 `column.placeholder`。
@en When the cell content is empty, a placeholder is displayed, and the priority is lower than `column.placeholder`.
@version 2.23.0|`ReactNode`|`-`|
|pagePosition|@zh 设置分页器的位置，有四个方位 `右下` `左下` `右上` `左上` `上中` `下中`
@en Set the position of the pagination, there are six positions `bottom right` `bottom left` `top right` `top left` `top center` `bottom center`
@defaultValue br|`"br" \| "bl" \| "tr" \| "tl" \| "topCenter" \| "bottomCenter"`|`-`|
|childrenColumnName|@zh 树形数据在 `data` 中的字段名，默认是 `children`
@en The field name of the tree data in `data`, default is `children`
@defaultValue children|`string`|`-`|
|indentSize|@zh 树形数据每个层级向左偏移的像素
@en The pixel offset to the left of each level of the tree data
@defaultValue 15|`number`|`-`|
|footer|@zh 表格尾部
@en The footer of the table|`(currentPageDate: any) => ReactNode`|`-`|
|virtualized|@zh 表格开启虚拟滚动，用于处理大数据场景。( 注意：虚拟滚动会自动关闭对树形数据的支持 )
@en The table enables virtual scrolling for processing big data scenarios.
(Note: Virtual scrolling will automatically turn off support for tree data)|`boolean`|`-`|
|virtualListProps|@zh 用于配置虚拟滚动。
@en Used to configure `VirtualList`.
@version 2.46.0|`AvailableVirtualListProps`|`-`|
|summary|@zh 总结栏
@en Table Summary
@version 2.17.0|`(currentData?: any[]) => ReactNode`|`-`|
  
