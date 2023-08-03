import React, { ReactNode } from 'react';

import { Button } from '@arco-design/web-react';
import { IconBug } from '@arco-design/web-react/icon';

import './style';

export interface PluginItem {
  title: string | ReactNode;
  icon?: ReactNode;
}

export interface PluginKind {
  label: string | ReactNode;
  list?: PluginItem[];
}

export interface PluginProps {
  style?: React.CSSProperties;
  lugins?: PluginKind[];
}

const pluginList: PluginKind[] = [
  {
    label: '文本框',
    list: [
      {
        title: '文本',
        icon: <IconBug />,
      },
      {
        title: '文本',
        icon: <IconBug />,
      },
      {
        title: '文本',
        icon: <IconBug />,
      },
    ],
  },
  {
    label: '数字',
    list: [
      {
        title: '文本',
        icon: <IconBug />,
      },
      {
        title: '文本',
        icon: <IconBug />,
      },
      {
        title: '文本',
        icon: <IconBug />,
      },
    ],
  },
  {
    label: '滑动输入',
    list: [
      {
        title: '文本',
        icon: <IconBug />,
      },
      {
        title: '文本',
        icon: <IconBug />,
      },
      {
        title: '文本',
        icon: <IconBug />,
      },
    ],
  },
  {
    label: '时间',
    list: [
      {
        title: '文本',
        icon: <IconBug />,
      },
      {
        title: '文本',
        icon: <IconBug />,
      },
      {
        title: '文本',
        icon: <IconBug />,
      },
    ],
  },
  {
    label: '选择器',
    list: [
      {
        title: '文本',
        icon: <IconBug />,
      },
      {
        title: '文本',
        icon: <IconBug />,
      },
      {
        title: '文本',
        icon: <IconBug />,
      },
    ],
  },
  {
    label: '时间',
    list: [
      {
        title: '文本',
        icon: <IconBug />,
      },
      {
        title: '文本',
        icon: <IconBug />,
      },
      {
        title: '文本',
        icon: <IconBug />,
      },
    ],
  },
  {
    label: '选择器',
    list: [
      {
        title: '文本',
        icon: <IconBug />,
      },
      {
        title: '文本',
        icon: <IconBug />,
      },
      {
        title: '文本',
        icon: <IconBug />,
      },
    ],
  },
  {
    label: '时间',
    list: [
      {
        title: '文本',
        icon: <IconBug />,
      },
      {
        title: '文本',
        icon: <IconBug />,
      },
      {
        title: '文本',
        icon: <IconBug />,
      },
    ],
  },
  {
    label: '选择器',
    list: [
      {
        title: '文本',
        icon: <IconBug />,
      },
      {
        title: '文本',
        icon: <IconBug />,
      },
      {
        title: '文本',
        icon: <IconBug />,
      },
    ],
  },
];

export const Plugin: React.FC<PluginProps> = (props: PluginProps) => {
  const { style, lugins = pluginList } = props;
  return (
    <div className="plugin" style={style}>
      {lugins.map((pluginItem, pluginIndex) => {
        return (
          <div className="plugin-content" key={pluginIndex}>
            <div className="plugin-title">
              <b>{pluginItem?.label}</b>
            </div>
            <div className="plugin-list">
              {pluginItem?.list?.map((kindItem, kindIndex) => {
                return (
                  <Button key={kindIndex} type="secondary" icon={kindItem?.icon}>
                    {kindItem?.title}
                  </Button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
