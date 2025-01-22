import styled from "styled-components";
import colors from "../styles/colors";


export const HeaderButton = styled.button`
  background-color: transparent;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  position: relative;
  cursor: pointer;
  color: ${(props) => props.color};
  & svg {
    width: 24px;
    height: 24px;
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  &:hover {
    scale: 1.15;
    background-color: ${colors.lightGreen};
  }
`;
