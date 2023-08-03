import React, { CSSProperties, ReactNode } from 'react';

import {
  IconCode,
  IconCommon,
  IconEdit,
  IconEraser,
  IconExport,
  IconEye,
  IconMindMapping,
  IconSend,
} from '@arco-design/web-react/icon';
import { Button } from '@arco-design/web-react';
import './style';
import { Menu } from './Menu';
import { Plugin } from './Plugin';
import { Config } from './Config';

/**
 * @title RenderForm
 */
export interface RenderFormProps {
  children?: ReactNode;
  style?: CSSProperties;
  headerClassName?: string;
  headerStyle?: CSSProperties;
  headerHeight?: number | string;
  title?: string | ReactNode;
}

const ButtonGroup = Button.Group;

const RenderForm: React.FC<RenderFormProps> = (props: RenderFormProps) => {
  const { style, children, headerClassName, headerStyle, headerHeight, title } = props;
  const [selectButton, setSelectButton] = React.useState<'view' | 'edit'>('edit');
  const [showMenu, setShowMenu] = React.useState<'tree' | 'common'>('tree');
  const [menuVisible, setMenuVisible] = React.useState(false);

  const isPrimary = (t: 'view' | 'edit') => {
    return selectButton === t ? 'primary' : 'secondary';
  };

  const handleSelectChange = (t: 'view' | 'edit') => {
    setSelectButton(t);
  };

  const handleMenuVisibleChange = (module: 'tree' | 'common') => {
    if (showMenu === module) {
      setMenuVisible(!menuVisible);
    } else {
      setMenuVisible(true);
    }
    setShowMenu(module);
  };

  return (
    <div className="render-form" style={style}>
      <div
        className={`render-form-header ${headerClassName}`}
        style={{
          height: headerHeight || '48px',
          ...headerStyle,
        }}
      >
        {title || (
          <div className="default-title">
            <b>表单设计器</b>
          </div>
        )}

        <ButtonGroup>
          <Button type={isPrimary('edit')} onClick={() => handleSelectChange('edit')}>
            <IconEdit /> 编辑
          </Button>
          <Button type={isPrimary('view')} onClick={() => handleSelectChange('view')}>
            <IconEye /> 预览
          </Button>
        </ButtonGroup>
        <div
          style={{
            display: 'flex',
            gap: '8px',
          }}
        >
          <Button type="secondary">
            <IconExport />
            导出
          </Button>
          <Button type="secondary">
            <IconEraser />
            清空
          </Button>
          <Button type="primary">
            <IconSend />
            发布
          </Button>
        </div>
      </div>
      <div className="render-form-body">
        <div className="render-form-menu">
          <div className="render-form-menu-item">
            <Button
              type="secondary"
              icon={<IconMindMapping />}
              onClick={() => handleMenuVisibleChange('tree')}
            />
            <Button
              type="secondary"
              icon={<IconCommon />}
              onClick={() => handleMenuVisibleChange('common')}
            />
          </div>
          <Button className="render-form-menu-end" type="secondary" icon={<IconCode />} />
        </div>
        <div className="pop-box" style={{ display: menuVisible ? 'block' : 'none' }}>
          {showMenu === 'tree' ? <Menu /> : <Plugin />}
        </div>
        <div className="render-form-content">{children}</div>
        <div className="render-form-props">
          <Config />
        </div>
      </div>
    </div>
  );
};

export default RenderForm;
