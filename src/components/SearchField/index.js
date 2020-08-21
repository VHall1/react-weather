import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.scss';

// Material
import { Paper, IconButton, InputBase, Menu, MenuItem } from '@material-ui/core';
import { MoreVert, Search } from '@material-ui/icons';

const SearchField = ({ fetchWeather }) => {
  const history = useHistory();

  const [menu, setMenu] = useState(null);
  const handleOpen = e => {
    setMenu(e.currentTarget);
  };
  const handleClose = () => {
    setMenu(null);
  };
  const handleLink = (page) => {
    history.push(`/${page}`);
  }
  const [text, setText] = useState("");
  const handleFetch = e => {
    setText("");
    fetchWeather(e, text);
  }

  return (
    <Paper className="searchContainer">
      <IconButton
        aria-label="menu"
        aria-haspopup="true"
        onClick={handleOpen}  
      >
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={menu}
        open={Boolean(menu)}
        onClose={handleClose}
        keepMounted
      >
        <MenuItem onClick={() => handleLink("")}>Weather Now</MenuItem>
        <MenuItem onClick={() => handleLink("forecast")}>5 Day Forecast</MenuItem>
      </Menu>
      <form className="inputContainer">
        <InputBase
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Location"
          id="weatherInput"
          inputProps={{
            "aria-label": "location",
            "id": "inputWeather"
          }}
        />
        <IconButton
          type="submit"
          onClick={handleFetch}
          aria-label="search"
        >
          <Search />
        </IconButton>
      </form>
    </Paper>
  );
}

export default SearchField;