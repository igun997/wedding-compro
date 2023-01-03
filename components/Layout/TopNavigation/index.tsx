import { Button, Col, Image, Layout, Row } from 'antd';
import styles from '../index.module.less';
import React from 'react';
import styled from '@emotion/styled';

const HeaderWrapper = styled.div`
  .ant-btn {
    color: #fff !important;
  }
`;
const { Header } = Layout;

const TopNavigation = () => {
  return (
    <Header className="site-layout-menu" style={{ paddingLeft: 20 }}>
      <HeaderWrapper>
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
                  src={
                    'https://static.vecteezy.com/system/resources/previews/006/793/369/original/gamer-anime-boy-with-character-with-rock-hand-sign-mascot-esport-logo-free-vector.jpg'
                  }
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
      </HeaderWrapper>
    </Header>
  );
};

export default TopNavigation;
