import styled from "styled-components";
import icons from "../styles/icons";
import colors from "../styles/colors";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { GeneralContext } from "../App";
import { HeaderButton } from "./HeaderButton";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchContacts, getContacts } from "../features/contacts/contactsSlice";

const HeaderContainer = styled.header`
  background-color: white;
  box-shadow: 0px 3px 10px #00000005;
  height: 100px;
  width: 100%;
  color: ${colors.hardGreen};
`;

const InnerContainer = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const InnerLeft = styled.div`
  display: flex;
  align-items: center;
  color: black;
  padding: 0 30px;
`;
const InnerRight = styled.div`
  padding: 0 40px;
  display: flex;
  gap: 50px;
`;

const Title = styled.h1`
  margin-left: 50px;
  font-size: 28px;
  font-weight: 600;
`;

const NonReadMessages = styled.div`
display:flex;
align-items:center;
justify-content: center;
top: 25px;
right: 190px;
position: absolute;
background: red;
font-size: 13px;
color: ${colors.white};
border-radius: 50%;
width: 20px;
height 20px;
`;

export const Header = () => {
  const GContext = useContext(GeneralContext);
  const viewSidebar = GContext.viewSidebar;
  const setViewSidebar = GContext.setViewSidebar;
  const dispatchLogin = GContext.dispatchLogin;
  const [headerTitle, setHeaderTitle] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const contactsData = useAppSelector(getContacts);
  const handleLogout = () => {
    dispatchLogin({ type: "LOGOUT", payload: null });
    localStorage.removeItem("token");
    navigate("/login");
  };
  useEffect(() => {
    let path = location.pathname.split("/")[1];
    path = path.charAt(0).toUpperCase() + path.slice(1);
    setHeaderTitle(path);
  }, [location]);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleSideBarView = () => {
    setViewSidebar(!viewSidebar);
  };

  return (
    <>
      <HeaderContainer>
        <InnerContainer>
          <InnerLeft>
            <HeaderButton
              color={viewSidebar ? `${colors.hardGreen}` : `${colors.red}`}
              onClick={handleSideBarView}
            >
              {icons.menu}
            </HeaderButton>
            <Title>{headerTitle === "" ? "Dashboard" : headerTitle}</Title>
          </InnerLeft>
          <InnerRight>
            <HeaderButton onClick={() => navigate("/contact")}>{icons.message}</HeaderButton>
            <NonReadMessages>
              {contactsData.reduce((accumulator, currentValue) => {
                if (currentValue.status === "Not Archived") {
                  return accumulator + 1;
                } else {
                  return accumulator;
                }
              }, 0)}
            </NonReadMessages>

            <HeaderButton>{icons.bell}</HeaderButton>
            <HeaderButton onClick={handleLogout}>{icons.logout}</HeaderButton>
          </InnerRight>
        </InnerContainer>
      </HeaderContainer>
    </>
  );
};
