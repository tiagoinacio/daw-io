import React from 'react';
import Button from '@material-ui/core/Button';

export default ({ children, className }) => (
  <Button variant="contained" color="primary">
    {children}
  </Button>
);
