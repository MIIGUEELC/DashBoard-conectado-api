import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import styled from "styled-components";
import colors from "../styles/colors";

const Button = styled.button<Props>`
  font: 400 16px Poppins;
  width: 80%;
  max-width: 120px;
  height: 48px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: black; 
  background-color: ${colors.viewNotesBtnBgr};
  &:disabled{
    color: ${colors.green};
    background-color: white;
    border: 1px solid ${colors.green};
    cursor: not-allowed;
  }
`;


const Box = styled.div`
  position: absolute;
  box-shadow: 0px 16px 30px #00000014;
  text-align: center;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: fit-content;
`;

type Props = {
  specialrequest: number,
  message: string
}

export default function ViewNotes(props: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
    const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button message={props.message} specialrequest={props.specialrequest} onClick={handleOpen} disabled={props.specialrequest  >= 1 ? false : true}>
        View Notes
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box>
            <p>{props.message}</p>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
