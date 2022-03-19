import { useRouter } from 'next/router';
import Centered from './Centered';
import Empty from './Empty';
import Default from './Default';

const Layouts = ({ children }) => {
  const router = useRouter();
  let { pathname } = { ...router };

  if (['/404', '/500'].includes(pathname)) {
    return <Centered>{children}</Centered>;
  }

  if (['/login'].includes(pathname)) {
    return <Centered>{children}</Centered>;
  } else if (['/landing'].includes(pathname)) {
    return <Empty>{children}</Empty>;
  } else {
    return <Default>{children}</Default>;
  }
};

export default Layouts;
