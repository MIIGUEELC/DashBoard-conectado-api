import styled from "styled-components";
import colors from "../styles/colors";
import PopMenu from "../components/PopMenu";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { Spinner } from "../components/Spinner";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RoomsInterface } from "../features/interfaces/interfaces";
import {
  deleteRoom,
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
`;

const RoomNumber = styled.p`
  text-align: left;
  font: normal normal 600 60px Poppins;
  letter-spacing: 0px;
`;

const Text = styled.p`
  text-align: left;
  font: normal 14px Poppins;
  letter-spacing: 0px;
  color: ${(props) => props.color};
  margin-bottom: 5px;
`;

const RoomPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RoomInfoContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  margin-bottom: 15px;
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
  & .swiper-slide{
    display: flex;
    justify-content:center;
    align-items: center;
  }
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
const H1 = styled.h1`
  width: 95%;
  height: 95%;
  border-radius: 20px;
  text-align: center;
  color: ${colors.green};
  border: solid 2px ${colors.green};
  display: flex;
  align-items: center;
  justify-content: center; 
`;


export const RoomDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const roomId = useParams().roomId;
  const roomStatus = useAppSelector(getRoomsStatus);
  const [room, setRoom] = useState<RoomsInterface | null>();
  const selectRoom = useAppSelector(getRoom);

  useEffect(() => {
    dispatch(fetchRoom(roomId));
  }, [dispatch, roomId]);

  useEffect(() => {
    if (roomStatus === "fulfilled") {
      setRoom(selectRoom);
    }
  }, [roomStatus, selectRoom]);

  const handleDelete = (id: string): void => {
    deleteAlert().then((deleteConfirmed) => {
      if (deleteConfirmed) {
        dispatch(deleteRoom(id));
        navigate("/rooms");
      }
    });
  };

  return (
    <>
      {roomStatus === "rejected" ? (
        <ErrorMessage />
      ) : roomStatus === "pending" || room === null || selectRoom === null ? (
        <Spinner />
      ) : (
        <Container>
          <LeftContainer>
            <CardContainer>
              <InnerCardContainer>
                <RoomInfoContainer>
                  <Text color={colors.gray}>Room Number</Text>
                  <RoomNumber>{`${selectRoom?.room_number}`}</RoomNumber>
                </RoomInfoContainer>
              </InnerCardContainer>
              <PopMenu
                path={"rooms"}
                id={room?._id}
                onClick={() => handleDelete(room?._id as string)}
              />
            </CardContainer>
            <RoomInfoContainer>
              <Text color={colors.gray}>Room Id</Text>
              <span>{`${selectRoom?._id}`}</span>
            </RoomInfoContainer>
            <RoomInfoContainer>
              <Text color={colors.gray}>Room Type</Text>
              <span>{`${selectRoom?.room_type}`}</span>
            </RoomInfoContainer>
            <RoomInfoContainer>
              <Text color={colors.gray}>Price</Text>
              <span>
                {`$${selectRoom?.price}`}
                <p>/night</p>
              </span>
            </RoomInfoContainer>
            <RoomInfoContainer>
              <Text color={colors.gray}>Description</Text>
              <Text>{room?.description}</Text>
            </RoomInfoContainer>

            <Text color={colors.gray}>Amenities</Text>
            <AmenitiesContainer>
              {selectRoom?.amenities.map((amenity, key) => {
                return <Amenity key={key}>{amenity.name}</Amenity>;
              })}
            </AmenitiesContainer>
          </LeftContainer>
          <RightContainer>
            <PersonalSwiper
              spaceBetween={40}
              navigation
              modules={[Navigation, Autoplay]}
              autoplay
            >
              {room?.room_photo.map((photo, index) => {
                return (
                  <SwiperSlide key={index}>
                    {photo === "" ? (
                      <H1>No photo</H1>
                    ) : (
                      <RoomPhoto src={photo} />
                    )}
                  </SwiperSlide>
                );
              })}
            </PersonalSwiper>
          </RightContainer>
        </Container>
      )}
    </>
  );
};
