import { Grid } from 'antd';
import { FC } from 'react';
import { Resources } from '../../../types/types';
import styles from './index.module.less';

const { useBreakpoint } = Grid;
const PostSection: FC<Resources.SectionTypes> = (props) => {
  const { xs } = useBreakpoint();
  return <div className={styles.root}></div>;
};

export default PostSection;
