import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core";
import { AppBar, Tabs, Tab, Typography, Box } from "@material-ui/core";
import Widgets from "../../dashboard/ProductDescription/widgets";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, color: "text.primary" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function TabView({ alignment, items }) {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
      {alignment === "horizontal" && (
        <Box sx={{ bgcolor: "background.paper" }}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="full width tabs example"
            >
              {items &&
                items.map((item, index) => (
                  <Tab label={`${item.name}`} {...a11yProps(index)} />
                ))}
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            {items &&
              items.map((item, index) => (
                <TabPanel value={value} index={index} dir={theme.direction}>
                  <Widgets items={item} alignment="row" />
                </TabPanel>
              ))}
          </SwipeableViews>
        </Box>
      )}
      {alignment === "verticle" && (
        <Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex" }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
          >
            {items &&
              items.map((item, index) => (
                <Tab label={`${item.name}`} {...a11yProps(index)} />
              ))}
          </Tabs>

          {items.length > 0 ? (
            <>
              {items &&
                items.map((item, index) => (
                  <TabPanel value={value} index={index} dir={theme.direction}>
                    <Widgets items={item} alignment="row" />
                  </TabPanel>
                ))}
            </>
          ) : (
            <></>
          )}
        </Box>
      )}
    </Box>
  );
}
