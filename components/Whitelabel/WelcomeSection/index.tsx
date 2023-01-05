import styles from './index.module.less';
import { FC } from 'react';
import { Resources } from '../../../types/types';
import { Col, Divider, Grid, Row, Space, Typography } from 'antd';
import styled from '@emotion/styled';
import { RightOutlined } from '@ant-design/icons';

const onXs = 450;
const onMd = 269;
const images = [
  'https://picsum.photos/200/300',
  'https://picsum.photos/200/300',
  'https://picsum.photos/200/300',
];
const CardList: any = styled.div`
  background: url('${(props: any) => props.image}');
  color: #fff;
  width: auto;
  box-shadow: inset 0 0 0 2000px rgba(19, 18, 18, 0.4);
  height: ${(props: any) => props?.height}px;
  background-size: cover;
  cursor: pointer;

  .centering {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 6rem;
    transition: all 0.3s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
  }

  .ant-typography {
    font-family: 'Tenor Sans', sans-serif;
    color: #fff;
    font-size: ${(props: any) => (props?.isMobile ? 1.7 : 1.25)}rem;
  }

  &:hover {
    box-shadow: inset 0 0 0 2000px rgba(19, 18, 18, 0.6);
  }
`;
const { useBreakpoint } = Grid;
const WelcomeSection: FC<Resources.SectionTypes> = (props) => {
  const { xs } = useBreakpoint();
  return (
    <div className={styles.root}>
      <Row gutter={[10, 10]}>
        <Col
          xs={24}
          md={{
            span: 10,
            offset: 7,
          }}>
          <Row gutter={[10, 10]}>
            <Col
              xs={24}
              style={{
                textAlign: 'center',
              }}>
              <Typography.Text className={'header'}>{props.data.title}</Typography.Text>
            </Col>
            <Col xs={24}>
              <Row
                gutter={[20, 20]}
                style={{
                  padding: 10,
                }}>
                {props?.data?.paragraphs &&
                  props?.data?.paragraphs?.map((item, index) => (
                    <Col key={index} xs={24}>
                      <Typography.Text className={'content'}>{item}</Typography.Text>
                    </Col>
                  ))}
              </Row>
            </Col>
            <Col xs={24}>
              <Row
                style={{
                  padding: 10,
                }}>
                <Col xs={24}>
                  <Divider orientation="center" type="horizontal" />
                </Col>
                <Col xs={24}>
                  <Col xs={24} className={'portfolio'}>
                    <Row gutter={[10, 10]}>
                      {images.map((item, index) => (
                        <Col key={`image-${index}`} xs={24} md={8}>
                          <CardList height={269} isMobile={xs} image={item}>
                            <div className={'centering'}>
                              <Space direction={'vertical'} align="center">
                                <Typography.Text className={'cardTitle'}>Wedding</Typography.Text>
                                <Typography.Text className={'cardSubtitle'}>
                                  Redo - Ali
                                </Typography.Text>
                                <RightOutlined />
                              </Space>
                            </div>
                          </CardList>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default WelcomeSection;
