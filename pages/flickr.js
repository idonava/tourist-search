// import FlickrLayout from '../layouts/FlickrLayout'
import React, { Component } from "react";
import { redirectIfNotAuthenticated, isAuthenticated, getToken } from "../libs/auth";
import Title from '../components/Title'
import { getUser } from '../libs/user'
import Search from '../components/Search'
import Gallery from '../components/Gallery'
import Detail from '../components/Detail'
import configureStore from '../config/store'
import { Provider } from 'react-redux';




export default class Flickr extends Component {
    static async getInitialProps(ctx) {
        if (redirectIfNotAuthenticated(ctx)) {
            return {};
        }
        const token = await getToken(ctx)
        const res =  await getUser(token)
        return {
            userToken: res.data.token,
            authenticated: isAuthenticated(ctx)
        };
    }

    render() {
        const { authenticated, url, userToken } = this.props;
        const store = configureStore(userToken);
        return (
            <Provider store={store}>
                <div>
                    <Title authenticated={authenticated} pathname={url.pathname}></Title>
                    {/* <h5>aaa{user}</h5> */}
                    <Search userToken={userToken}/>
                    &nbsp;
                    <Gallery />
                    <Detail />
                </div>
            </Provider>

        )
    }

}
