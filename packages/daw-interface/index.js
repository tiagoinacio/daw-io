import React, { useEffect } from 'react';
import Header from './src/header';
import View from './src/view';
import State, { withAudio } from '@daw/state';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
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

const Interface = withAudio(props => {
  useEffect(() => {
    props.setAudioContext(new AudioContext());
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <div className="interface">
        <Header className="header" />
        <View className="view" />
      </div>
    </MuiThemeProvider>
  );
});

export const App = () => (
  <State>
    <Interface />
  </State>
);
