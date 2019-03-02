import React, { PureComponent } from 'react';
import Link from 'next/link'
import 'materialize-css/dist/css/materialize.min.css';

class Title extends PureComponent {
  render() {
    return (
      <nav>
      <div className="nav-wrapper grey darken-4">
        <a href="/" className="brand-logo">Tourist Search Engine</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><Link href="/signin"><a>Sign In</a></Link></li>
          <li><Link href="/signup"><a>Sign Up</a></Link></li>
        </ul>
      </div>
    </nav>
    );
  }
}

export default Title;
