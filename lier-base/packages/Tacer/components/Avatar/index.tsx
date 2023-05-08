import React, { CSSProperties, ReactNode } from 'react';

/**
 * @title Avatar
 */
export interface AvatarProps {
  children?: ReactNode;
  style?: CSSProperties;
}

const Avatar: React.FC<AvatarProps> = ({ style, children }) => {
  return <h3 style={style}>{children}</h3>;
};

export default Avatar;
