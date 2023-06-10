import { Tooltip } from '@arco-design/web-react';
import React, { CSSProperties } from 'react';
import './style';

/**
 * @title OmitText
 */
export interface OmitTextProps {
  children: string;
  maxLine?: number;
  width?: number | string;
  showTooltip?: boolean;
  style?: CSSProperties;
  placeholder?: string;
}

const OmitText: React.FC<OmitTextProps> = ({
  children,
  maxLine = 1,
  width = '100%',
  showTooltip,
  style,
  placeholder,
}) => {
  const Width = typeof width === 'number' ? `${width}px` : width;
  const Style: CSSProperties = {
    // 超出显示省略号, 最多两行
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: maxLine,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordBreak: 'break-all',
    wordWrap: 'break-word',
    width: Width,
  };
  return (
    <Tooltip content={showTooltip ? children : ''}>
      <div
        style={{
          ...style,
          ...Style,
        }}
      >
        {children || placeholder}
      </div>
    </Tooltip>
  );
};

export default OmitText;
