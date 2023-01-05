import { LayoutConfigWithNextPage } from '../configs/layout.config';
import React, { useEffect } from 'react';
import { Button, Result, Row } from 'antd';
import { getPage, getSliders } from '../services/root';
import { RootResources } from '../types/services/root';
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

export async function getServerSideProps({ req, res, resolvedUrl }: any) {
  const sliderRequest: RootResources.getSliderTypes.request = {
    fields: ['name'],
    populate: ['media'],
  };
  let _data: any = null;
  let _sliders: any = null;
  let _trimPath = resolvedUrl.replace('/', '');
  if (_trimPath === '') {
    _trimPath = 'home';
  }
  try {
    _data = await getPage(_trimPath);
    _sliders = await getSliders(sliderRequest);
    if (_data.data.length === 0) {
      _data = null;
    }
  } catch (e) {
    _data = null;
    _sliders = null;
  }
  //get sliders

  const isError = _data === null || _sliders === null;
  return {
    props: {
      page: _data as RootResources.getPageTypes.response,
      sliders: _sliders as RootResources.getSliderTypes.response,
      isError: isError,
    },
  };
}

const Home: LayoutConfigWithNextPage = (props: any) => {
  const router = useRouter();
  const [pageError, setPageError] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const loadSliders = (res: RootResources.getSliderTypes.response) => {
    const sliders = res.data.map((slider) => slider.attributes);
    dispatch(setSliders(sliders));
  };
  const loadPage = (res: RootResources.getPageTypes.response) => {
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
    }
  };
  useEffect(() => {
    console.log('props', props);
    if (props) {
      if (props?.isError) {
        dispatch(setIsError(true));
        setPageError(true);
      }
      if (props?.isError === false) {
        if (props?.page) {
          loadPage(props?.page);
        }
        if (props?.sliders) {
          loadSliders(props?.sliders);
        }
      }
    }
  }, [props]);
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
