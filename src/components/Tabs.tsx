import styled from "styled-components";
import colors from "../styles/colors";


export const TabsMenuContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 50px 0px 35px 50px;
  height: 36px;
  width: fit-content;
`;

export const TabButton = styled.button`
  color: ${colors.gray};
  background-color: transparent;
  border: none;
  border-bottom: 3px solid ${colors.borderGray};
  height: 100%;
  width: 165px;
  font-size: 16px;
  font-weight: 600;
  cursor:pointer;
  &:hover{
    color: ${colors.green};
    border-bottom: 3px solid ${colors.green};
  }
`;