import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import colors from "../styles/colors";
import PopMenu from "../components/PopMenu";
import {
  getBooking,
  getBookingsStatus,
  fetchBooking,
  deleteBooking,
} from "../features/bookings/bookingsSlice";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { Spinner } from "../components/Spinner";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { BookingsInterface } from "../features/interfaces/interfaces";
import {
  fetchRoom,
  getRoom,
  getRoomsStatus,
} from "../features/rooms/roomsSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import deleteAlert from "../utils/deleteAlert";

const Container = styled.div`
  display: flex;
  margin: 50px;
  background-color: white;
  border-radius: 10px;
  padding: 40px;
`;

const LeftContainer = styled.div`
  width: 50%;
`;
const RightContainer = styled.div`
  width: 50%;
  padding-left: 50px;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InnerCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 40px;
`;

const UserPhoto = styled.div`
  width: 156px;
  height: 156px;
  border-radius: 8px;
  background-color: #c5c5c5;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Name = styled.h2`
  text-align: left;
  font: normal normal 600 30px Poppins;
  letter-spacing: 0px;
  width: 100%;
  text-overflow: ellipsis;
`;

const P = styled.p`
  text-align: left;
  font: normal 14px Poppins;
  letter-spacing: 0px;
  color: ${(props) => props.color};
  margin-bottom: 15px;
`;
const ContactButtons = styled.div`
  display: flex;
  gap: 16px;
`;
const PhoneButton = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  color:  ${colors.hardGreen};
  width: 59px;
  height: 59px;
  background-color:  ${colors.phoneBtnBgr};
  border: 1px solid  ${colors.phoneBtnBgr};
  border-radius: 12px;
  transition: all 0.25s ease-in;
  cursor:pointer;
  &:hover{
    color: ${colors.phoneBtnBgr};
    background-color: ${colors.hardGreen};
`;
const MessageButton = styled.div`
  display:flex;
  justify-content:space-evenly;
  align-items:center;
  font-size: 16px;
  font-weigth: normal;
  color:  white;
  width: 209px;
  height: 59px;
  background-color: ${colors.hardGreen};
  border: 1px solid #e8f2ef;
  border-radius: 12px;
  transition: all 0.2s ease-in;
  cursor:pointer;
  &:hover{
    color: ${colors.hardGreen};
    background-color: ${colors.phoneBtnBgr};
`;

const DatesContainer = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 3px solid rgb(235, 235, 235);
  padding: 30px 0px 25px;
  gap: 25px;
`;
const DateContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
`;

const RoomPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RoomContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 30px 0px 25px;
  gap: 55px;
`;

const RoomInfoContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  & span {
    display: flex;
    font: normal 24px/35px Poppins;
    color: black;
    & p {
      text-align: left;
      font: normal 14px Poppins;
      letter-spacing: 0px;
      color: ${colors.green};
      margin-top: 12px;
    }
  }
`;

const PersonalSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  margin: 0;
  transition: all 250ms ease-in-out;
`;

const AmenitiesContainer = styled.div`
  padding: 10px 5px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
`;
const Amenity = styled.button`
  padding: 15px;
  font: 500 14px/21px Poppins;
  width: fit-content;
  height: fit-content;
  border: none;
  border-radius: 8px;
  color: ${colors.hardGreen};
  background-color: ${colors.phoneBtnBgr};
  &:hover {
  }
`;

export const BookingDetails = () => {
  const dispatch = useAppDispatch();
  const bookingId = useParams().bookingId;
  const selectBooking = useAppSelector(getBooking);
  const bookingStatus = useAppSelector(getBookingsStatus);
  const [booking, setBooking] = useState<BookingsInterface | null>();
  const selectRoom = useAppSelector(getRoom);
  const roomStatus = useAppSelector(getRoomsStatus);

  useEffect(() => {
    dispatch(fetchBooking(bookingId));
  }, [dispatch, bookingId]);

  useEffect(() => {
    if (bookingStatus === "fulfilled") {
      setBooking(selectBooking);
      dispatch(fetchRoom(selectBooking?.room_id));
    }
  }, [bookingStatus, selectBooking]);

  const handleDelete = (id: string): void => {
    deleteAlert().then((deleteConfirmed) => {
      if (deleteConfirmed) dispatch(deleteBooking(id));
    });
  };

  return (
    <>
      {bookingStatus === "rejected" ? (
        <ErrorMessage />
      ) : bookingStatus === "pending" || booking === null || selectRoom === null ? (
        <Spinner />
      ) : (
        <Container>
          <LeftContainer>
            <CardContainer>
              <UserPhoto
                style={{
                  backgroundImage: `url('https://robohash.org/${booking?.guest}.png')`,
                }}
              />
              <InnerCardContainer>
                <Name>{booking?.guest}</Name>
                <P color={colors.green}>ID {booking?._id}</P>
                <ContactButtons>
                  <a href={`tel: ${booking?.phone_number}`}>
                    <PhoneButton>
                      <FontAwesomeIcon icon={faPhone} size="xl" />
                    </PhoneButton>
                  </a>
                  <a href="mailto:">
                    <MessageButton>
                      <FontAwesomeIcon icon={faCommentDots} size="lg" />
                      <span>Send Message</span>
                    </MessageButton>{" "}
                  </a>
                </ContactButtons>
              </InnerCardContainer>
              <PopMenu
                path={"bookings"}
                id={booking?._id}
                onClick={() => handleDelete(booking?._id as string)}
              />
            </CardContainer>
            <DatesContainer>
              <DateContainer>
                <P color={colors.gray}>Check In</P>
                <span>{booking?.check_in}</span>
              </DateContainer>
              <DateContainer>
                <P color={colors.gray}>Check Out</P>
                <span>{booking?.check_out}</span>
              </DateContainer>
            </DatesContainer>
            <RoomContainer>
              <RoomInfoContainer>
                <P color={colors.gray}>Room Info</P>
                <span>{`${selectRoom?.room_type} - ${selectRoom?.room_number}`}</span>
              </RoomInfoContainer>
              <RoomInfoContainer>
                <P color={colors.gray}>Price</P>
                <span>
                  {`$${selectRoom?.price}`}
                  <p>/night</p>
                </span>
              </RoomInfoContainer>
            </RoomContainer>
            <P>{booking?.special_request}</P>
            <P color={colors.gray}>Amenities</P>
            <AmenitiesContainer>
              {selectRoom?.amenities.map((amenity, key) => {
                return <Amenity key={key}>{amenity.name}</Amenity>;
              })}
            </AmenitiesContainer>
          </LeftContainer>
          <RightContainer>
            {roomStatus === "rejected" ? (
              <ErrorMessage />
            ) : roomStatus === "pending" ? (
              <Spinner />
            ) : (
              <PersonalSwiper
                spaceBetween={40}
                navigation
                modules={[Navigation,Autoplay]}
                autoplay
              >
                {selectBooking?.photos.map((photo, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <RoomPhoto src={photo} />
                    </SwiperSlide>
                  );
                })}
              </PersonalSwiper>
            )}
          </RightContainer>
        </Container>
      )}
    </>
  );
};
