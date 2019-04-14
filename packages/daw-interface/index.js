import React, { useEffect, memo } from 'react';
import { compose } from 'redux';
import Header from './src/header';
import View from './src/view';
import State, { withAudio, withTracks, withTime } from '@daw/state';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import InputHandler from '@daw/input';
import './styles.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#4e4e4e',
      main: '#b64b03',
      dark: '#080808',
      contrastText: '#e2e2e4'
    },
    secondary: {
      light: '#e2e2e4',
      main: '#232323',
      dark: '#383838',
      contrastText: '#232323'
    }
  },
  overrides: {
    MuiButton: {
      text: {
        color: '#e2e2e4'
      }
    }
  }
});

const Interface = props => {
  useEffect(() => {
    props.setAudioContext(new AudioContext());
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <InputHandler onNewTrack={props.newTrack} onZoom={props.onZoom}>
        <div className="interface">
          <Header className="header" />
          <View className="view" />
        </div>
      </InputHandler>
    </MuiThemeProvider>
  );
};

const ConnectedInterface = compose(
  withTime,
  withTracks,
  withAudio
)(Interface);

export const App = () => (
  <State>
    <ConnectedInterface />
  </State>
);
