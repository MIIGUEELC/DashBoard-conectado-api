import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import icons from "../styles/icons";
import colors from "../styles/colors";
import hotelIcon from "../icons/5-estrellas.png";
import EditUser from "./EditUser";
import { GeneralContext } from "../App";

type Props = {
  viewsidebar: boolean
}

const SideMenuContainer = styled.div<Props>`
  min-height: 100vh;
  width: 345px;
  background-color: white;
  padding: 32px 0px;
  z-index: 5;
  box-shadow: 13px 3px 40px #00000005;
  margin-left: ${(props) => props.viewsidebar ? '0': '-345px'};
  transition: margin-left ease 0.5s;
`;

const EmployeeContainer = styled.div`
  box-shadow: 0px 20px 30px #00000014;
  border-radius: 18px;
  text-align: center;
  padding: 24px 35px;
  margin: 41px auto 52px;
  min-width: 230px;
  width: fit-content;
  & p {
    font-weight: 500;
    display: block;
  }
  & span {
    font-weight: 200;
    font-size: 12px;
    line-height: 18px;
    color: blue;
    margin-bottom: 16px;
    display: block;
  }
`;

const EmployeePhoto = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 8px;
  background-color: #c5c5c5;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0 auto 15px;
`;

const SideMenuFooter = styled.div`
  padding-left: 56px;
`;

const AppName = styled.span`
  font-weight: 600;
  display: block;
`;

const CopyRight = styled.span`
  font-weight: 200;
  font-size: 14px;
  line-height: 21px;
  color: blue;
  display: block;
`;
const AppMade = styled.span`
  margin-bottom: 50px;
  color: red;
`;

const Li = styled.li`
position:relative;
margin-bottom: 40px;
`;

const StyledLink = styled(NavLink)`
  margin-left: 56px;
  padding: 20px 48px 50px 48px;
  color: ${colors.green};
  font-weight: 600;
  &.active {
    color: ${colors.red};
    &::after {
      content: '';
      width: 8px;
      height: 67px;
      background-color: ${colors.red};
      border-radius: 0px 6px 6px 0px;
      position: absolute;
      left: 0;
      top:-20px;   
    }
  }
`;
const Image = styled.img`
  height: 60px;
  width: 60px;
`;

const Logo = styled.div`
  margin-left: 50px;
  margin-bottom: 62px;
  display: flex;
  gap: 20px;
`;

const LetterHead = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const H1 = styled.h1`
  margin-top: -1px;
  max-height: 35px;
  font-size: 36px;
`;
const H2 = styled.h2`
  font-size: 12px;
  font-weight: 300;
`;

export const SideBar = () => {
 
   const Gcontext = useContext(GeneralContext);
   const viewSidebar = Gcontext.viewSidebar;
   const loginState =  Gcontext.loginState;
  return (
    <SideMenuContainer viewsidebar={viewSidebar}>
      <Logo>
        <Image src={hotelIcon} />{" "}
        <LetterHead>
          <H1>travl</H1> <H2>Hotel Admin Dashboard</H2>
        </LetterHead>
      </Logo>
      <ul>
        <Li>
          <StyledLink to="/">{icons.dashboard}<span>Dashboard</span></StyledLink>
        </Li>

        <Li>
          <StyledLink to="/bookings">{icons.bookings}<span>Bookings</span></StyledLink>
        </Li>
        <Li>
          <StyledLink to="/rooms">{icons.rooms}<span>Rooms</span></StyledLink>
        </Li>
        <Li>
          <StyledLink to="/contact">{icons.contact}<span>Contact</span></StyledLink>
        </Li>
        <Li>
          <StyledLink to="/employees">{icons.employee}<span>Employees</span></StyledLink>
        </Li>
      </ul>
      <EmployeeContainer>
        <EmployeePhoto
          style={{ backgroundImage: `url('https://robohash.org/${loginState.username}.png')` }}
        />
        <p>{loginState.username}</p>
        <span>{loginState.email}</span>
        <EditUser />
      </EmployeeContainer>
      <SideMenuFooter>
        <AppName>Travl Hotel Admin Dashboard</AppName>
        <CopyRight>© 2024 All Rights Reserved</CopyRight>
        <br />
        <AppMade>Made with ♥ by Miguel</AppMade>
      </SideMenuFooter>
    </SideMenuContainer>
  );
};
