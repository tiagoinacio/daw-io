import React, { useState } from 'react';
import Header from './src/header';
import View from './src/view';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { AudioContextProvider } from './src/context/AudioContext';
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

export const App = () => {
  const audioContext = new AudioContext();
  const source = audioContext.createBufferSource();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <MuiThemeProvider theme={theme}>
      <AudioContextProvider value={{ audioContext, source }}>
        <div className="interface">
          <Header className="header" onPlay={() => setIsPlaying(!isPlaying)} />
          <View className="view" isPlaying={isPlaying} />
        </div>
      </AudioContextProvider>
    </MuiThemeProvider>
  );
};
