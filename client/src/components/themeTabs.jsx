import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import unselect from "../img/theme/unnamed.png";
import poza1 from "../img/theme/4.png";
import poza2 from "../img/theme/5.png";
import poza3 from "../img/theme/6.png";
import poza4 from "../img/theme/7.png";
import poza5 from "../img/theme/2.png";
import poza6 from "../img/theme/3.png";

const buildPozaImg = (poza, width, height) => (
    <img src={`${prefix}${poza}`} style={{width: width || '100px', height: height || '50px'}}/>
)

const prefix = "chrome-extension://ikiodbafbclkmhbnppnihfflmicjihdn";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{display: 'flex', width: value === index ? '235px' : '0'}}
    >
      {value === index && (
        <Box style={{alignSelf: 'center', margin: 'auto', opacity: index ? '1' : '0.5'}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs(props) {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
      console.log(newValue, 'newValue')
      let urlPart = '';
    switch (newValue) {
        case 1:
            urlPart = poza1;
            break;
        case 2:
            urlPart = poza2;
            break;
        case 3:
            urlPart = poza3;
            break;
        case 4:
            urlPart = poza4;
            break;
        case 5:
            urlPart = poza5;
            break;
        case 6:
            urlPart = poza6;
            break;
    }
    const url = `${prefix}${urlPart}`;
    props.changePoza(newValue, url);
  };

  console.log(props.poza, 'props.poza')

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={props.poza}
        onChange={handleChange}
        className={classes.tabs}
        style={{ minWidth: 'unset !important' }}
      >
        <Tab label={buildPozaImg(unselect, '50px', '50px')} {...a11yProps(0)} style={{ minWidth: 'unset', opacity: '0.3' }} />
        <Tab label={buildPozaImg(poza1)} {...a11yProps(1)} style={{minWidth: 'unset'}} />
        <Tab label={buildPozaImg(poza2)} {...a11yProps(2)} style={{minWidth: 'unset'}} />
        <Tab label={buildPozaImg(poza3)} {...a11yProps(3)} style={{minWidth: 'unset'}} />
        <Tab label={buildPozaImg(poza4)} {...a11yProps(4)} style={{minWidth: 'unset'}} />
        <Tab label={buildPozaImg(poza5)} {...a11yProps(5)} style={{minWidth: 'unset'}} />
        <Tab label={buildPozaImg(poza6)} {...a11yProps(6)} style={{minWidth: 'unset'}} />
      </Tabs>
      <TabPanel value={props.poza} index={0}>
        {buildPozaImg(unselect, '150px', '150px')}
      </TabPanel>
      <TabPanel value={props.poza} index={1}>
        {buildPozaImg(poza1, '150px', '175px')}
      </TabPanel>
      <TabPanel value={props.poza} index={2}>
        {buildPozaImg(poza2, '150px', '175px')}
      </TabPanel>
      <TabPanel value={props.poza} index={3}>
        {buildPozaImg(poza3, '165px', '175px')}
      </TabPanel>
      <TabPanel value={props.poza} index={4}>
        {buildPozaImg(poza4, '150px', '175px')}
      </TabPanel>
      <TabPanel value={props.poza} index={5}>
        {buildPozaImg(poza5, '150px', '175px')}
      </TabPanel>
      <TabPanel value={props.poza} index={6}>
        {buildPozaImg(poza6, '150px', '175px')}
      </TabPanel>
    </div>
  );
}