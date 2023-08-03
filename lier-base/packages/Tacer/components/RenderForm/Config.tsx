import React, { useState } from 'react';

import { Breadcrumb } from '@arco-design/web-react';

import './style';

export interface ConfigProps {
  style?: React.CSSProperties;
}

const BreadcrumbItem = Breadcrumb.Item;

export const Config: React.FC<ConfigProps> = (props: ConfigProps) => {
  const { style } = props;

  const [selectTab, setSelectTab] = useState<'1' | '2' | '3'>('1');

  const returnSelectClassName = (t: '1' | '2' | '3') => {
    return selectTab === t ? 'config-header-item-border-bottom' : '';
  };

  const handleSelectChange = (t: '1' | '2' | '3') => {
    setSelectTab(t);
  };

  return (
    <div className="config" style={style}>
      <div className="config-header-breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem href="#">Channel</BreadcrumbItem>
          <BreadcrumbItem>News</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="config-header-tabs">
        <div
          onClick={() => handleSelectChange('1')}
          className={`config-header-item ${returnSelectClassName('1')}`}
        >
          属性
        </div>
        <div
          onClick={() => handleSelectChange('2')}
          className={`config-header-item ${returnSelectClassName('2')}`}
        >
          校验
        </div>
        <div
          onClick={() => handleSelectChange('3')}
          className={`config-header-item ${returnSelectClassName('3')}`}
        >
          布局
        </div>
      </div>
    </div>
  );
};
