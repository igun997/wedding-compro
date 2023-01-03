import { LayoutConfigWithNextPage } from '../configs/layout.config';
import React, { useEffect } from 'react';
import { Row } from 'antd';
import { getSliders } from '../services/root';
import { RootResources } from '../types/services/root';
import useLoading from '../components/useLoading';
import { useAppDispatch } from '../configs/hooks.config';
import { setSliders } from '../redux/slices/pageProps';

const Home: LayoutConfigWithNextPage = () => {
  const dispatch = useAppDispatch();
  const sliderLoading = useLoading();
  const sliderRequest: RootResources.getSliderTypes.request = {
    fields: ['name', 'description'],
    populate: ['media'],
  };
  const loadSliders = () => {
    sliderLoading.handleLoading(true);
    getSliders(sliderRequest)
      .then((res) => {
        const sliders = res.data.map((slider) => slider.attributes);
        dispatch(setSliders(sliders));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        sliderLoading.handleLoading(false);
      });
  };
  useEffect(() => {
    loadSliders();
  }, []);
  return <Row gutter={[10, 10]}></Row>;
};
Home.layout = 'base';
Home.title = 'Imagenic';
Home.description = 'Photoshoot Website';

export default Home;
