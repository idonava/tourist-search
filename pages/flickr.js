import FlickrLayout from '../layouts/FlickrLayout'
import React, { Component } from "react";
import { redirectIfNotAuthenticated, isAuthenticated, getToken } from "../libs/auth";
import Title from '../components/Title'
import { getUser } from '../libs/user'

export default class Flickr extends Component {
    static async getInitialProps(ctx) {
        if (redirectIfNotAuthenticated(ctx)) {
            return {};
        }
        //console.log('1')
        const token =  getToken(ctx)
        //console.log('2')
        const res = await getUser(token)
        
        //console.log('res user', res)
        //console.log('res token', res.token)
        return {
            user: res,
            authenticated: isAuthenticated(ctx)
        };
    }

    render() {
        const { authenticated, url, user } = this.props;
        console.log(user)
        return (
            <div>
                <Title authenticated={authenticated} pathname={url.pathname}></Title>
                <h5>aaa{user}</h5>
                <FlickrLayout />
            </div>
        )
    }

}
