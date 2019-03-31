import React from 'react';
import Header from './src/header';
import './styles.css';

export class App extends React.Component {
  render() {
    return (
      <div className="interface">
        <Header />
      </div>
    );
  }
}
