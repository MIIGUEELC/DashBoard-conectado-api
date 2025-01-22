import { useState, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { TabsMenuContainer, TabButton } from "../components/Tabs";
import { RoomsInterface } from "../features/interfaces/interfaces";
import {
  getRooms,
  fetchRooms,
  getRoomsStatus,
  deleteRoom,
} from "../features/rooms/roomsSlice";
import { Table } from "../components/Table";
import { ErrorMessage } from "../components/ErrorMessage";
import { Spinner } from "../components/Spinner";
import styled from "styled-components";
import colors from "../styles/colors";
import PopMenu from "../components/PopMenu";
import { NavLink, useNavigate } from "react-router-dom";
import { Search } from "../components/Search";
import deleteAlert from "../utils/deleteAlert";

const RoomPhoto = styled.img`
  margin: 10px 8px 5px;
  height: auto;
  width: 70%;
  border-radius: 8px;
`;

type Props = {
  small?: string;
  status?: string;
  name?: string;
  decoration?: string;
  green?: boolean;
};

const TextFormatter = styled.span<Props>`
  display: block;
  text-align: left;
  color: ${(props) => props.color};
  font: ${(props) =>
    props.small === "small" ? "300 13px Poppins" : "500 16px Poppins"};
  text-decoration: ${(props) => props.decoration};
  margin-bottom: ${(props) => (props.small === "small" ? "3px" : "")};
`;

const Status = styled.button<Props>`
  font: 600 16px Poppins;
  width: 70%;
  height: 48px;
  border: none;
  border-radius: 8px;
  color: white;
  background-color: ${(props) =>
    props.status === "Available"
      ? `${colors.checkInBtnText}`
      : `${colors.checkOutBtnText}`};
  &:hover {
  }
`;

const AmenitiesContainer = styled.aside`
  padding: 10px 5px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
`;

const Amenity = styled.button<Props>`
  padding: 6px;
  //margin-bottom: 5px;
  font: 300 10px Poppins;
  width: fit-content;
  max-width: 120px;
  height: fit-content;
  border: none;
  border-radius: 8px;
  color: white;
  background-color: ${() => `${colors.hardGreen}`};
  &:hover {
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 50px;
`;
const Select = styled.select`
  margin-top: 50px;
  width: 129px;
  height: 40px;
  font: 500 15px Poppins;
  color: ${colors.green};
  border: 2px solid rgb(19, 88, 70);
  border-radius: 12px;
  cursor: pointer;
  outline: none;
  padding-left: 15px;
`;

const Button = styled.button.attrs({ type: "button" })<Props>`
  width: 200px;
  height: 40px;
  font-family: Poppins;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: ${(props) => (props.green ? colors.lightGreen : colors.lightRed)};
  background-color: ${(props) => (props.green ? colors.hardGreen : colors.red)};
  border-radius: 8px;
  cursor: pointer;
  margin: 50px 0 0 0;
  border: 1px solid;
  &:hover {
    color: ${colors.hardGreen};
    background-color: ${(props) =>
      props.green ? colors.lightGreen : colors.red};
  }
`;
const H4 = styled.h4`
  margin: 10px 8px 5px;
  padding: 16% 0;
  width: 70%;
  border-radius: 20px;
  text-align: center;
  color: ${colors.green};
  border: solid 2px ${colors.green};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Rooms = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const roomsData = useAppSelector(getRooms);
  const roomsDataStatus = useAppSelector(getRoomsStatus);
  const [filter, setFilter] = useState("All Rooms");
  const [orderBy, setOrderBy] = useState<string>("price_up");
  const [search, setSearch] = useState("");
  const filterOrderSearch = (
    array: RoomsInterface[],
    filter: string,
    orderBy: string,
    search: string
  ) => {
    const filteredArray = array.filter(
      (room: RoomsInterface) => filter === "All Rooms" || room.status === filter
    );
    if (orderBy === "price_up") {
      filteredArray.sort(
        (a: RoomsInterface, b: RoomsInterface) =>
          (a.offer_price ? a.price - (a.price * a.discount) / 100 : a.price) -
          (b.offer_price ? b.price - (b.price * b.discount) / 100 : b.price)
      );
    } else {
      filteredArray.sort(
        (a: RoomsInterface, b: RoomsInterface) =>
          (b.offer_price ? b.price - (b.price * b.discount) / 100 : b.price) -
          (a.offer_price ? a.price - (a.price * a.discount) / 100 : a.price)
      );
    }
    function deepSearch(array: any, search: string) {
      return array.filter((item: RoomsInterface) => {
        return Object.values(item).some((value) => {
          if (Array.isArray(value)) {
            return deepSearch(value, search).length > 0;
          } else if (typeof value === "string" || typeof value === "number") {
            return String(value).toLowerCase().includes(search.toLowerCase());
          }
          return false;
        });
      });
    }
    return deepSearch(filteredArray, search);
  };

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const filteredRoomsData = useMemo(() => {
    return filterOrderSearch(roomsData, filter, orderBy, search);
  }, [roomsData, filter, orderBy, search]);

  const handleDelete = (id: string): void => {
    deleteAlert().then((deleteConfirmed) => {
      if (deleteConfirmed) dispatch(deleteRoom(id));
    });
  };

  const columns = [
    {
      property: "room_info",
      label: "Room Info",
      display: ({ _id, room_number, room_photo }: RoomsInterface) => {
        return (
          <>
            {room_photo[0] === "" ? (
              <H4>No photo</H4>
            ) : (
              <RoomPhoto src={room_photo[0]} />
            )}
            <TextFormatter>N° {room_number}</TextFormatter>
            <NavLink to={`/rooms/${_id}`}>
              <TextFormatter small={"small"} color={colors.green}>
                #{_id?.slice(0, 15)}...
              </TextFormatter>
            </NavLink>
          </>
        );
      },
    },
    {
      property: "room_type",
      label: "Room Type",
    },
    {
      property: "amenities",
      label: "Amenities",
      display: ({ amenities }: RoomsInterface) => {
        const displayAmenities = amenities.map((amenity, key) => {
          return <Amenity key={key}>{amenity.name}</Amenity>;
        });
        return (
          <>
            <AmenitiesContainer>{displayAmenities}</AmenitiesContainer>
          </>
        );
      },
    },
    {
      property: "price",
      label: "Price",
      display: ({ price, offer_price }: RoomsInterface) => {
        return (
          <>
            {offer_price ? (
              <TextFormatter decoration={"line-through"} color={colors.red}>
                ${price}
              </TextFormatter>
            ) : (
              <TextFormatter>${price}</TextFormatter>
            )}
          </>
        );
      },
    },
    {
      property: "offer_price",
      label: "Offer Price",
      display: ({ price, offer_price, discount }: RoomsInterface) => {
        return (
          <>
            {offer_price ? (
              <TextFormatter color={colors.mattBlack}>
                ${price - (price * discount) / 100}
              </TextFormatter>
            ) : (
              <TextFormatter>-</TextFormatter>
            )}
          </>
        );
      },
    },
    {
      property: "status",
      label: "Status",
      display: ({ _id, status }: RoomsInterface) => {
        return (
          <>
            <Status status={status}>{status}</Status>
            <PopMenu
              path={"rooms"}
              id={_id}
              onClick={() => _id && handleDelete(_id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <Container>
        <TabsMenuContainer>
          <TabButton
            onClick={() => setFilter("All Rooms")}
            style={
              filter === "All Rooms"
                ? {
                    color: `${colors.hardGreen}`,
                    borderBottom: `3px solid ${colors.hardGreen}`,
                  }
                : undefined
            }
          >
            All Rooms
          </TabButton>
          <TabButton
            onClick={() => setFilter("Available")}
            style={
              filter === "Available"
                ? {
                    color: `${colors.hardGreen}`,
                    borderBottom: `3px solid ${colors.hardGreen}`,
                  }
                : undefined
            }
          >
            Available
          </TabButton>
          <TabButton
            onClick={() => setFilter("Booked")}
            style={
              filter === "Booked"
                ? {
                    color: `${colors.hardGreen}`,
                    borderBottom: `3px solid ${colors.hardGreen}`,
                  }
                : undefined
            }
          >
            Booked
          </TabButton>
        </TabsMenuContainer>
        <Search onChange={(event) => setSearch(event.target.value)}></Search>
        <Button green onClick={() => navigate("./create")}>
          Create New Room
        </Button>
        <Select onChange={(event) => setOrderBy(event.target.value as string)}>
          <option value="price_up">Price: Up</option>
          <option value="price_down">Price: Down</option>
        </Select>
      </Container>
      {roomsDataStatus === "rejected" ? (
        <ErrorMessage />
      ) : roomsDataStatus === "pending" ? (
        <Spinner />
      ) : (
        <Table name="rooms" columns={columns} data={filteredRoomsData} />
      )}
    </>
  );
};
