import { Col, Row, Typography } from 'antd';
import { FC } from 'react';
import { Resources } from '../../../types/types';
import styles from './index.module.less';
import parse from 'html-react-parser';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const fadedIn = keyframes`${fadeIn}`;

const BouncyDiv = styled.div`
  animation: 3s ${fadedIn};
`;

const PostSection: FC<Resources.SectionTypes> = (props) => {
  console.log('timer');
  return (
    <div className={styles.root}>
      <Row gutter={[10, 10]}>
        <Col
          xs={24}
          style={{
            marginBottom: 20,
          }}
          md={{
            span: 10,
            offset: 7,
          }}>
          <Typography.Text className="postTitle">{props?.data?.title}</Typography.Text>
        </Col>
        <Col
          xs={24}
          md={{
            span: 10,
            offset: 7,
          }}>
          <BouncyDiv>{parse(props?.data?.contents ?? '')}</BouncyDiv>
        </Col>
      </Row>
    </div>
  );
};

export default PostSection;
