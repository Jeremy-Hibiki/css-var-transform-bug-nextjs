'use client';

import { legacyLogicalPropertiesTransformer, StyleProvider } from '@ant-design/cssinjs';
import { useDeepCompareEffect } from 'ahooks';
import type { MenuRef } from 'antd';
import { ConfigProvider, Divider, Menu, Space } from 'antd';
import { useRef, useState } from 'react';

const MenuComponent = () => {
  const [selected, setSelected] = useState('2');
  const ref = useRef<MenuRef>(null);
  const css = useRef<CSSStyleDeclaration>();

  useDeepCompareEffect(() => {
    css.current = getComputedStyle(ref.current?.menu?.list.firstElementChild as HTMLElement);
  }, [ref.current, selected]);

  return (
    <Space>
      <Menu
        items={[
          { key: '1', label: 'One' },
          { key: '2', label: 'Two' },
        ]}
        selectedKeys={[selected]}
        mode="horizontal"
        ref={ref}
        onSelect={(e) => setSelected(e.key)}
      />
      <pre>padding: {css.current?.getPropertyValue('padding')}</pre>
    </Space>
  );
};

export default function Home() {
  return (
    <StyleProvider transformers={[legacyLogicalPropertiesTransformer]}>
      <Divider>transform &amp; </Divider>
      <Divider>不使用 CSS 变量</Divider>

      <ConfigProvider>
        <MenuComponent />
      </ConfigProvider>

      <Divider>使用 CSS 变量</Divider>

      <ConfigProvider theme={{ cssVar: true }}>
        <MenuComponent />
      </ConfigProvider>

      {/* (切换 Menu Tab 刷新显示 CSS) */}
    </StyleProvider>
  );
}
