import React from 'react';
import './style';

export interface MenuProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const Menu: React.FC<MenuProps> = (props: MenuProps) => {
  const { style, children } = props;
  return (
    <div className="menu" style={style}>
      menu
      {children}
    </div>
  );
};
