import { Provider } from 'react-redux';
import Search from '../components/Search'
import Gallery from '../components/Gallery'
import Detail from '../components/Detail'
import Title from '../components/Title'
import configureStore from '../config/store'

const store = configureStore();

const FlickrLayout = (props) => (

    <Provider store={store}>
        <Title></Title>
        <div>
            <Search />
            <Gallery />
            <Detail />
        </div>
    </Provider>

)

export default FlickrLayout