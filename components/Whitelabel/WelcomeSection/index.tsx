import styles from './index.module.less';
import { FC } from 'react';
import { Resources } from '../../../types/types';
import { Col, Divider, Row, Typography } from 'antd';

const WelcomeSection: FC<Resources.SectionTypes> = (props) => {
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
              <Divider orientation="center" type="horizontal" />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default WelcomeSection;
