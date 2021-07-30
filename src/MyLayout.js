import { Layout } from 'react-admin';
import MyMenu from './Menu';
import MyAppBar from './MyAppBar';

const MyLayout = (props) => <Layout {...props} menu={MyMenu} appBar={MyAppBar} />;

export default MyLayout;