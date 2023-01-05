import { FC, useState } from 'react';
import { Resources } from '../../../types/types';
import styles from './index.module.less';
import { Col, Grid, Row, Typography } from 'antd';
import { InstagramOutlined } from '@ant-design/icons';

const { useBreakpoint } = Grid;
const InstagramFull: FC<Resources.SectionTypes> = (props) => {
  const { xs } = useBreakpoint();
  const [recentPhotos, setRecentPhotos] = useState<string[]>([]);
  return (
    <div className={styles.root}>
      <Row gutter={[10, 10]}>
        <Col
          xs={24}
          md={{
            span: 10,
            offset: 7,
          }}>
          <Row gutter={[10, 10]} align="middle">
            <Col xs={24} md={12}></Col>
            <Col xs={24} md={12}>
              <Row
                gutter={[10, 20]}
                align="middle"
                style={{
                  textAlign: 'center',
                }}>
                <Col xs={24}>
                  <InstagramOutlined style={{ fontSize: 30 }} />
                </Col>
                <Col xs={24}>
                  <Typography.Text className={'label'}>Follow our Instagram</Typography.Text>
                </Col>
                <Col xs={24}>
                  <Typography.Text className={'username'}>@{props?.data?.username}</Typography.Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default InstagramFull;
