import React from 'react';

const AudioContext = React.createContext(null);

export const AudioContextProvider = AudioContext.Provider;
export const AudioContextConsumer = AudioContext.Consumer;
