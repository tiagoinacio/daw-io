import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Icon,
  Button,
  Drawer,
  ListItem,
  ListItemText
} from '@material-ui/core';
import './styles.css';

export default props => {
  const [value, setValue] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [view, setView] = useState('view_list');
  const onChange = (_, value) => setValue(value);
  const onViewChange = () =>
    view === 'view_list' ? setView('view_module') : setView('view_list');
  const onMenuClick = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="nav">
      <div className="main-nav">
        <Button onClick={onMenuClick}>
          <Icon>menu</Icon>
        </Button>
        <Button onClick={onViewChange}>
          <Icon>{view}</Icon>
        </Button>
      </div>
      <Tabs
        scrollButtons="off"
        variant="scrollable"
        className="tabs"
        value={value}
        onChange={onChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Sampler" />
        <Tab label="Grid Editor" />
        <Tab label="Audio Region" />
        <Tab label="Mixer" />
      </Tabs>
      <Drawer
        ModalProps={{
          BackdropProps: {
            invisible: true
          }
        }}
        transitionDuration={0}
        PaperProps={{
          className: 'paper'
        }}
        className="menu"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      >
        <div tabIndex={0} role="button">
          <ListItem button>
            <ListItemText primary="New Project" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Load Project" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Save Project" />
          </ListItem>
          <ListItem button>
            <input type="file" id="input" />
          </ListItem>
        </div>
      </Drawer>
    </nav>
  );
};
