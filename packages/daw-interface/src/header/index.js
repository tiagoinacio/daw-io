import React from 'react';
import MainNavigation from '../main-navigation';
import TransportBar from '../transport-bar';
import './styles.css';

export default () => (
  <header className="header">
    <MainNavigation className="mainNavigation" />
    <TransportBar className="transportBar" isPlaying={false} />
  </header>
);
