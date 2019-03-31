import React from 'react';
import Header from './src/header';
import View from './src/view';
import './styles.css';

export class App extends React.Component {
  render() {
    return (
      <div className="interface">
        <Header className="header" />
        <View className="view" />
      </div>
    );
  }
}
