import styled from "styled-components";
// SideBar Icons
import { LuLayoutDashboard as DashboardIcon } from "react-icons/lu";
import { LuCalendarCheck2 as BookingIcon } from "react-icons/lu";
import { SlKey as RoomsIcon } from "react-icons/sl";
import { MdOutlineRateReview as ContactIcon } from "react-icons/md";
import { BsPerson as EmployeeIcon } from "react-icons/bs";
import { LuMail as EmailIcon } from "react-icons/lu";
import { AiOutlineCloseCircle as CloseIcon } from "react-icons/ai";
// Headers Icons
import { HiArrowsRightLeft as MenuIcon } from "react-icons/hi2";
import { BiBell as BellIcon } from "react-icons/bi";
import { BiMessageAltDetail as MessageIcon } from "react-icons/bi";
import { HiOutlineLogout as LogoutIcon } from "react-icons/hi";
import { BiSearch as MagnifierIcon } from "react-icons/bi";
import { AiOutlineHeart as HeartIcon } from "react-icons/ai";
// Other Icons
import { LiaBedSolid as BedIcon } from "react-icons/lia";
import { BiLogIn as CheckInIcon } from "react-icons/bi";
import { BiLogOut as CheckOutIcon } from "react-icons/bi";
import { AiOutlineCheckCircle as CheckCircle } from "react-icons/ai";

const SideBarIcons = styled.i`
  font-size: 18px;
  min-width: 48px;
  min-height: 48px;
  position: relative;
  & svg {
    margin: auto;
    position: absolute;
    left: -50px ;
    right: 0;
    top: 0;
    bottom: 0;
  }
`;





const icons = {
  dashboard: <SideBarIcons><DashboardIcon /></SideBarIcons>,
  bookings:  <SideBarIcons><BookingIcon /></SideBarIcons>,
  rooms: <SideBarIcons><RoomsIcon /></SideBarIcons>,
  contact: <SideBarIcons><ContactIcon /></SideBarIcons>,
  employee: <SideBarIcons><EmployeeIcon /></SideBarIcons>,
  menu: <MenuIcon />,
  message: <MessageIcon />,
  bell: <BellIcon />,
  logout: <LogoutIcon />,
  bed: <BedIcon />,
  checkIn: <CheckInIcon />,
  checkOut: <CheckOutIcon />,
  checkCircle: <CheckCircle />,
  magnifyer: <MagnifierIcon />,
  heart: <HeartIcon />,
  email: <EmailIcon />,
  close: <CloseIcon />,
  bookings2: <BookingIcon />,
};

export default icons;
