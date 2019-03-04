import { Provider } from 'react-redux';
import SignUp from '../components/SignUp'
import Title from '../components/Title'
import configureStore from '../config/store'

const store = configureStore();

const SignUpLayout = (props) => (

    <Provider store={store}>
            <div>
            <SignUp />
        </div>
    </Provider>

)

export default SignUpLayout