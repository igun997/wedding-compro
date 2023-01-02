import { Grid, Image, Layout, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.module.less';

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;
const BaseLayout: React.FC<any> = ({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { xs } = useBreakpoint();
  const onClose = () => {
    setCollapsed(!collapsed);
  };
  useEffect(() => {
    if (xs) {
      setCollapsed(false);
    }
  }, [xs]);

  return (
    <>
      <Layout className={styles.root}>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ paddingLeft: 20 }}>
            <Row justify={'space-between'}>
              <Image
                width={40}
                height={40}
                src={
                  'https://static.vecteezy.com/system/resources/previews/006/793/369/original/gamer-anime-boy-with-character-with-rock-hand-sign-mascot-esport-logo-free-vector.jpg'
                }
                preview={false}
                className={styles.logo}
              />
            </Row>
          </Header>
          <Content
            className="site-layout-background-content"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default BaseLayout;
