import Search from './Search'
import Gallery from './Gallery'
import Detail from './Detail';
import Title from './Title'

import configureStore from '../config/store';
import { Provider } from 'react-redux';

const store = configureStore();

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

const Layout = (props) => (

  <Provider store={store}>
    <Title></Title>
    <div style={layoutStyle}>
      <Search />
      <Gallery />
      <Detail />
      {/* {props.children} */}
    </div>
  </Provider>

)

export default Layout