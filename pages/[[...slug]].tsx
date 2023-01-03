import { LayoutConfigWithNextPage } from '../configs/layout.config';
import React, { useEffect } from 'react';
import { Button, Result, Row } from 'antd';
import { getPage, getSliders } from '../services/root';
import { RootResources } from '../types/services/root';
import useLoading from '../components/useLoading';
import { useAppDispatch } from '../configs/hooks.config';
import {
  clearError,
  setDescription,
  setHaveSlider,
  setIsError,
  setKeywords,
  setSections,
  setSliders,
  setTitle,
} from '../redux/slices/pageProps';
import { useRouter } from 'next/router';

const Home: LayoutConfigWithNextPage = (props) => {
  const router = useRouter();
  const [pageError, setPageError] = React.useState<boolean>(false);
  const slug = (router.query.slug as string[]) || [];
  const dispatch = useAppDispatch();
  const sliderLoading = useLoading();
  const pageLoading = useLoading();
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
  const loadPage = (_slug: string) => {
    pageLoading.handleLoading(true);
    getPage(_slug)
      .then((res) => {
        const isPage = res.data.length > 0;
        if (isPage) {
          const page = res.data[0].attributes;
          dispatch(setTitle(page?.title ?? ''));
          dispatch(setDescription(page?.description ?? ''));
          dispatch(setKeywords(page?.keywords ?? ''));
          dispatch(setSections(page?.sections ?? []));
          dispatch(setHaveSlider(page?.haveSlider ?? false));
          setPageError(false);
          dispatch(clearError());
        } else {
          dispatch(setIsError(true));
          setPageError(true);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        pageLoading.handleLoading(false);
      });
  };
  useEffect(() => {
    if (!pageError) {
      loadSliders();
    }
  }, [pageError]);
  useEffect(() => {
    loadPage(slug.length > 0 ? slug[0] : 'home');
  }, [slug]);
  if (pageError) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => router.push('/')}>
            Back Home
          </Button>
        }
      />
    );
  } else {
    return <Row gutter={[10, 10]}></Row>;
  }
};
Home.layout = 'base';
Home.title = 'Imagenic';
Home.description = 'Photoshoot Website';

export default Home;
