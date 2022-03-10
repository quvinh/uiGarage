/* eslint-disable prettier/prettier */
import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const LinkTab = (props) => {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const Notification = () => {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
        <LinkTab label="Sự kiện" href="#/notification-event"/>
        <LinkTab label="Vật tư" href="#/notification-item" />
        {/* <LinkTab label="Page Three" href="/spam" /> */}
      </Tabs>
    </Box>
  );
}

export default Notification