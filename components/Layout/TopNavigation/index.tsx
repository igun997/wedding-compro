import { Button, Col, Drawer, Grid, Image, Layout, Row } from 'antd';
import styles from '../index.module.less';
import React from 'react';
import styled from '@emotion/styled';
import { MenuOutlined } from '@ant-design/icons';

const logo =
  'https://static.vecteezy.com/system/resources/previews/006/793/369/original/gamer-anime-boy-with-character-with-rock-hand-sign-mascot-esport-logo-free-vector.jpg';
const HeaderWrapper: any = styled.div`
  .ant-btn {
    color: ${(props: any) => (props?.gotBlack ? '#1c1c1a' : '#fff')} !important;
    font-size: 1rem;
  }
`;
const { Header } = Layout;
const { useBreakpoint } = Grid;
const TopNavigation = (props: any) => {
  const { xs } = useBreakpoint();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Header
      className="site-layout-menu"
      style={xs ? { paddingLeft: 10, paddingRight: 10 } : { marginTop: 20 }}>
      <HeaderWrapper gotBlack={props?.black}>
        {xs ? (
          <>
            <Row justify={'space-between'} align="middle">
              <Col>
                <Image width={40} height={40} src={logo} preview={false} className={styles.logo} />
              </Col>
              <Col>
                <Button onClick={handleOpen} type="link">
                  Menu <MenuOutlined />
                </Button>
              </Col>
            </Row>
            <Drawer placement="right" onClose={handleOpen} visible={open} key={'right-drawer'}>
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Drawer>
          </>
        ) : (
          <Row justify={'space-between'} align="middle">
            <Col
              xs={24}
              md={{
                span: 10,
                offset: 7,
              }}>
              <Row gutter={[5, 5]} justify={'space-between'} align="middle">
                <Col>
                  <Button type="link">Home</Button>
                </Col>
                <Col>
                  <Button type="link">About</Button>
                </Col>
                <Col>
                  <Button type="link">Portfolio</Button>
                </Col>
                <Col>
                  <Image
                    width={40}
                    height={40}
                    src={logo}
                    preview={false}
                    className={styles.logo}
                  />
                </Col>
                <Col>
                  <Button type="link">Contact</Button>
                </Col>
                <Col>
                  <Button type="link">Family</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </HeaderWrapper>
    </Header>
  );
};

export default TopNavigation;
