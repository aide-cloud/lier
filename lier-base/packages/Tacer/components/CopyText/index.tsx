import { Button, ButtonProps, Message, Tag, TagProps, Tooltip } from '@arco-design/web-react';
import React, { CSSProperties } from 'react';

/**
 * @title CopyText
 */
export interface CopyTextProps {
  children: string;
  style?: CSSProperties;
  showTooltip?: boolean;
  mode?: 'button' | 'text' | 'tag';
  buttonProps?: ButtonProps;
  tagProps?: TagProps;
  showMessage?: boolean;
  message?: string;
  disabled?: boolean;
  messageFunc?: (text: string) => string;
  copyFunc?: (text: string) => void;
}

const CopyText: React.FC<CopyTextProps> = ({
  children,
  style,
  showTooltip,
  showMessage,
  message,
  buttonProps,
  tagProps,
  disabled,
  mode = 'text',
  messageFunc,
  copyFunc,
}) => {
  const handOnClick = () => {
    if (disabled) return;

    copyFunc ? copyFunc(children) : navigator?.clipboard?.writeText(children);

    if (showMessage || message) {
      Message.success(message || `复制"${children}"成功, 去粘贴吧📋`);
      return;
    }

    messageFunc && messageFunc(children);
  };

  const Text = () => {
    switch (mode) {
      case 'button':
        return (
          <Button {...buttonProps} disabled={disabled}>
            {children}
          </Button>
        );
      case 'tag':
        return <Tag {...tagProps}>{children}</Tag>;
      default:
        return <>{children}</>;
    }
  };

  return (
    <Tooltip content={showTooltip ? children : ''}>
      <div style={style} onClick={handOnClick}>
        <Text />
      </div>
    </Tooltip>
  );
};

export default CopyText;
