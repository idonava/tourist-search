import React, { PureComponent } from 'react';

import './css/Title.css';

class Title extends PureComponent {
  render() {
    return (
      <header className="Title-header">
        <h1 className="Title-text">Tourist Search Engine</h1>
      </header>
    );
  }
}

export default Title;
