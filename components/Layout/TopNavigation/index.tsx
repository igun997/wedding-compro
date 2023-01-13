import { Button, Col, Drawer, Dropdown, Image, Layout, Menu, Row, Space } from 'antd';
import styles from '../index.module.less';
import React from 'react';
import styled from '@emotion/styled';
import { MenuOutlined } from '@ant-design/icons';
import MobileMenu from '../MobileMenu';
import { useRouter } from 'next/router';
import LogoBlack from '../../../assets/images/black-192.png';
import LogoWhite from '../../../assets/images/white-192.png';
import useLoading from '../../useLoading';
import { getParentMenu } from '../../../services/root';
import { useMediaQuery } from 'react-responsive';

export type _MenuTypes = {
  slug: string | null;
  name: string;
  children?: _MenuTypes[];
};
const HeaderWrapper: any = styled.div`
  .ant-btn {
    color: ${(props: any) => (props?.gotBlack ? 'var(--primary-headings)' : '#fff')} !important;
    font-size: 1rem;
    font-family: 'Tenor Sans', sans-serif;
    line-height: 1.5rem;
    font-weight: 500;
  }
`;
const { Header } = Layout;
const TopNavigation = (props: any) => {
  const isTablet = useMediaQuery({ query: '(max-width: 991px)' });
  const router = useRouter();
  const [logo, setLogo] = React.useState<any>(LogoWhite.src);
  const [open, setOpen] = React.useState(false);
  const [leftMenus, setLeftMenus] = React.useState<_MenuTypes[]>([]);
  const [rightMenus, setRightMenus] = React.useState<_MenuTypes[]>([]);
  const [allMenus, setAllMenus] = React.useState<_MenuTypes[]>([]);
  const loadingMenus = useLoading();
  const loadMenu = () => {
    loadingMenus.handleLoading(true);
    getParentMenu()
      .then((res) => {
        //map response to like _menus
        const allMenus = res.data.map((item: any) => {
          const _parent = item.attributes;
          return {
            slug: _parent.slug === '' ? null : _parent.slug,
            name: _parent.name,
            children:
              _parent.menus.data.length > 0
                ? _parent.menus.data.map((child: any) => {
                    const _attr = child.attributes;
                    return {
                      slug: _attr.slug === '' ? null : _attr.slug,
                      name: _attr.name,
                    };
                  })
                : undefined,
          };
        });
        const _leftMenus: _MenuTypes[] = [];
        const _rightMenus: _MenuTypes[] = [];
        // count _menus
        const _count = allMenus.length;
        // if _count is odd number
        const _half = Math.round(_count / 2);
        allMenus.forEach((item) => {
          if (_leftMenus.length < _half) {
            _leftMenus.push(item);
          } else {
            _rightMenus.push(item);
          }
        });
        setLeftMenus(_leftMenus);
        setRightMenus(_rightMenus);
        setAllMenus(allMenus);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        loadingMenus.handleLoading(false);
      });
  };
  const handleOpen = () => {
    setOpen(!open);
  };
  const navigateTo = (slug: string | null) => {
    if (slug) {
      router.push(`/${slug}`);
    }
  };

  const createDesktopMenu = (item: _MenuTypes) => {
    // create menu with Button component if item has no children
    if (!item?.children) {
      return (
        <Col key={`single-${item.slug ?? Math.random()}`}>
          <Button key={item?.slug} type="link" onClick={() => navigateTo(item?.slug)}>
            {item?.name}
          </Button>
        </Col>
      );
    }
    // create menu with Dropdown component if item has children
    const MenuChildren = (
      <>
        <Menu key={`sub-multi-${item.slug ?? Math.random()}`}>
          {item?.children?.map((child) => (
            <Menu.Item
              key={`menu-${child.slug ?? Math.random()}`}
              onClick={() => navigateTo(child?.slug)}>
              {child?.name}
            </Menu.Item>
          ))}
        </Menu>
      </>
    );
    return (
      <Col key={`col-${item.slug ?? Math.random()}`}>
        <Dropdown
          key={`multi-${item.slug ?? Math.random()}`}
          overlayClassName={styles.dropdownMenu}
          overlay={MenuChildren}
          placement="bottom">
          <Button
            type="link"
            key={`btn-${item.slug ?? Math.random()}`}
            onClick={() => navigateTo(item?.slug)}>
            <Space>{item.name}</Space>
          </Button>
        </Dropdown>
      </Col>
    );
  };

  React.useEffect(() => {
    loadMenu();
  }, []);

  React.useEffect(() => {
    if (props?.black) {
      setLogo(LogoBlack.src);
    } else {
      setLogo(LogoWhite.src);
    }
  }, [props?.black]);

  return (
    <Header
      className="site-layout-menu"
      style={isTablet ? { paddingLeft: 10, paddingRight: 10 } : { marginTop: 20 }}>
      <HeaderWrapper gotBlack={props?.black}>
        {isTablet ? (
          <>
            <Row justify={'space-between'} align="middle">
              <Col span={6}>
                <Image src={logo} preview={false} className={styles.logo} />
              </Col>
              <Col>
                <Button onClick={handleOpen} type="link">
                  Menu <MenuOutlined />
                </Button>
              </Col>
            </Row>
            <Drawer
              bodyStyle={{
                paddingRight: 0,
                paddingLeft: 0,
              }}
              contentWrapperStyle={{
                backgroundColor: 'var(--primary-background)',
              }}
              placement="right"
              onClose={handleOpen}
              visible={open}
              key={'right-drawer'}>
              <MobileMenu menus={allMenus} navigate={navigateTo} closeDrawer={handleOpen} />
            </Drawer>
          </>
        ) : (
          <Row justify={'space-between'} align="middle">
            <Col
              xs={24}
              md={{
                span: 12,
                offset: 6,
              }}>
              <Row gutter={[5, 5]} justify={'space-between'} align="middle">
                {leftMenus.map((item) => createDesktopMenu(item))}
                <Col>
                  <Image src={logo} height={160} preview={false} className={styles.logo} />
                </Col>
                {rightMenus.map((item) => createDesktopMenu(item))}
              </Row>
            </Col>
          </Row>
        )}
      </HeaderWrapper>
    </Header>
  );
};

export default TopNavigation;
