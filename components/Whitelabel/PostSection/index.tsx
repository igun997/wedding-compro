import { Col, Row, Typography } from 'antd';
import { FC } from 'react';
import { Resources } from '../../../types/types';
import styles from './index.module.less';
import parse from 'html-react-parser';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const fadeInAnimation = keyframes`${fadeIn}`;

const FadeInDiv = styled.div`
  animation: 1s ${fadeInAnimation};
`;

const PostSection: FC<Resources.SectionTypes> = (props) => {
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
          <FadeInDiv>{parse(props?.data?.contents ?? '')}</FadeInDiv>
        </Col>
      </Row>
    </div>
  );
};

export default PostSection;
