import { Provider } from 'react-redux';
import SignIn from '../components/SignIn'
import Title from '../components/Title'
import configureStore from '../config/store'

const store = configureStore();

const SignInLayout = (props) => (

    <Provider store={store}>
        <Title></Title>
        <div>
            <SignIn />
        </div>
    </Provider>

)

export default SignInLayout