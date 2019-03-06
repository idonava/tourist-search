import { Component } from "react";
  import Link from 'next/link'
import { isAuthenticated } from "../libs/auth";
import Title from '../components/Title'
import PropTypes from "prop-types";
import redirect from "../libs/redirect";

export default class Index extends Component {
  static propTypes = {
    authenticated: PropTypes.bool
  };
  static async getInitialProps(ctx) {
    return {
      authenticated: isAuthenticated(ctx)
      
    };
    
  }
  render() {
    const { authenticated, url } = this.props;
    return (
      <div>
        <Title authenticated={authenticated} pathname={url.pathname}></Title>
        <h1  style={{ display: 'flex', justifyContent: 'center' }}>Wellcome to Tourist Search Engine</h1>
      </div>
    )
  }
}