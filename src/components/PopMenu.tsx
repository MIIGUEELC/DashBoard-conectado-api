import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { NavLink } from "react-router-dom";

type Props = {
  path?: string;
  id?: string;
  onClick?: () => void;
};

export default function PopMenu(props: Props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.BaseSyntheticEvent<MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <FontAwesomeIcon
        onClick={handleClick}
        icon={faEllipsisVertical}
        size="xl"
        style={{ color: "#6e6e6e", cursor: "pointer" }}
      />
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        sx={{ fontFamily: "Poppins" }}
      >
        <NavLink to={`/${props.path}/update/${props.id}`}>
          <MenuItem>Edit</MenuItem>
        </NavLink>
        <MenuItem
          onClick={() => {
            props.onClick && props.onClick();
            handleClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}
