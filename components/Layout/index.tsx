import { Grid, Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import HeroSlider, { Overlay, SideNav, Slide } from 'hero-slider';
import TopNavigation from './TopNavigation';
import { useAppSelector } from '../../configs/hooks.config';
import { BASE_API } from '../../constants/config.constant';

const { Content } = Layout;
const { useBreakpoint } = Grid;

const BaseLayout: React.FC<any> = ({ children }) => {
  const pageProps = useAppSelector((state) => state.pageProps);
  const [sliders, setSliders] = useState<any>([]);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { xs } = useBreakpoint();
  const onClose = () => {
    setCollapsed(!collapsed);
  };
  useEffect(() => {
    if (xs) {
      setCollapsed(false);
    }
  }, [xs]);

  useEffect(() => {
    console.log('pageProps', pageProps);
    if (pageProps?.sliders) {
      setSliders(pageProps?.sliders?.map((slider) => slider?.media?.data?.attributes?.url ?? null));
    }
  }, [pageProps]);

  return (
    <>
      <Layout className={styles.root}>
        <Layout className="site-layout">
          {!pageProps?.isError && pageProps?.haveSlider && (
            <HeroSlider
              height={600}
              accessability={{
                shouldDisplayButtons: false,
                orientation: 'horizontal',
              }}
              autoplay
              controller={{
                initialSlide: 1,
                slidingDuration: 1000,
                slidingDelay: 1000,
              }}>
              <Overlay>
                <TopNavigation />
              </Overlay>
              {sliders
                .filter((slider: any) => slider !== null)
                .map((item: any, index: number) => (
                  <Slide
                    label={`Slide ${index + 1}`}
                    key={index}
                    background={{
                      backgroundColor: '#8A8A8A',
                      maskBackgroundBlendMode: 'luminosity',
                      backgroundImageSrc: `${BASE_API + item}`,
                    }}
                  />
                ))}
              <SideNav />
            </HeroSlider>
          )}
          {!pageProps?.isError && !pageProps?.haveSlider && <TopNavigation black />}

          <Content
            className="site-layout-background-content"
            style={{
              minHeight: 280,
            }}>
            {children}
          </Content>
          {/*<Content*/}
          {/*  className="site-layout-background-content"*/}
          {/*  style={{*/}
          {/*    margin: '24px 16px',*/}
          {/*    padding: 24,*/}
          {/*    minHeight: 280,*/}
          {/*  }}>*/}
          {/*  {children}*/}
          {/*</Content>*/}
        </Layout>
      </Layout>
    </>
  );
};

export default BaseLayout;
