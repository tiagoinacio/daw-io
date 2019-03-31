import React from 'react';
import './styles.css';
export default ({ children, className, ...otherProps }) => (
  <button className={`${className} button`} {...otherProps}>
    {children}
  </button>
);
