import { LayoutConfigWithNextPage } from '../configs/layout.config';
import React from 'react';
import { Row } from 'antd';

const Home: LayoutConfigWithNextPage = () => {
  return <Row gutter={[10, 10]}></Row>;
};
Home.layout = 'base';
Home.title = 'Imagenic';
Home.description = 'Photoshoot Website';

export default Home;
