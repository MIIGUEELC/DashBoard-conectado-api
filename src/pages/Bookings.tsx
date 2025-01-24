import styled from "styled-components";
import colors from "../styles/colors";
import { TabsMenuContainer, TabButton } from "../components/Tabs";
import { Table } from "../components/Table";
import { NavLink } from "react-router-dom";
import {
  getBookings,
  fetchBookings,
  getBookingsStatus,
  deleteBooking,
} from "../features/bookings/bookingsSlice";
import { useEffect, useMemo, useState } from "react";
import { Spinner } from "../components/Spinner";
import { ErrorMessage } from "../components/ErrorMessage";
import ViewNotes from "../components/ViewNotes";
import PopMenu from "../components/PopMenu";
import { BookingsInterface } from "../features/interfaces/interfaces";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { Search } from "../components/Search";
import deleteAlert from "../utils/deleteAlert";

type Props = {
  small?: string;
  status?: string;
};

const TextFormatter = styled.span<Props>`
  display: block;
  text-align: left;
  color: ${(props) =>
    props.small === "small" ? `${colors.green}` : `${colors.mattBlack}`};
  font: ${(props) =>
    props.small === "small" ? "300 13px Poppins" : "500 16px Poppins"};
`;

const StatusContainer = styled.div`
  display: flex;
`;

const Status = styled.button<Props>`
  font: 600 16px Poppins;
  width: 70%;
  max-width: 120px;
  height: 48px;
  border: none;
  border-radius: 8px;
  color: ${(props) =>
    props.status === "Check In"
      ? `${colors.checkInBtnText}`
      : props.status === "Check Out"
      ? `${colors.checkOutBtnText}`
      : props.status === "In Progress"
      ? `${colors.inProgressBtnText}`
      : "transparent"};
  background-color: ${(props) =>
    props.status === "Check In"
      ? `${colors.checkInBtnBgr}`
      : props.status === "Check Out"
      ? `${colors.checkOutBtnBgr}`
      : props.status === "In Progress"
      ? `${colors.inProgressBtnBgr}`
      : "transparent"};
  &:hover {
  }
`;

const CustomerPhoto = styled.img`
  margin: 5px auto;
  height: 50px;
  width: 50px;
  background: ${(props) => (props.src ? "transparent" : `${colors.green}`)};
  border-radius: 8px;
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
  font: 500 16px Poppins;
  color: ${colors.green};
  border: 2px solid rgb(19, 88, 70);
  border-radius: 12px;
  cursor: pointer;
  outline: none;
  padding-left: 15px;
`;

export const Bookings = () => {
  const dispatch = useAppDispatch();
  const bookingsData = useAppSelector(getBookings);
  const bookingsDataStatus = useAppSelector(getBookingsStatus);
  const [filter, setFilter] = useState("All Bookings");
  const [orderBy, setOrderBy] = useState<keyof BookingsInterface>("guest");
  const [search, setSearch] = useState("");

  const filterOrderSearch = (
    array: BookingsInterface[],
    filter: string,
    orderBy: keyof BookingsInterface,
    search: string
  ) => {
    const filteredArray = array.filter(
      (booking: BookingsInterface) =>
        filter === "All Bookings" || booking.status === filter
    );
  
    filteredArray.sort((a: BookingsInterface, b: BookingsInterface) => {
      if (orderBy === "guest") {
        return (a.guest || "").localeCompare(b.guest || "", undefined, {
          sensitivity: "base",
        });
      } else {
        const dateA = a[orderBy] ? new Date(a[orderBy] as string).getTime() : 0;
        const dateB = b[orderBy] ? new Date(b[orderBy] as string).getTime() : 0;
  
        if (dateA === dateB) {
          return (a.guest || "").localeCompare(b.guest || "");
        }
        return dateA - dateB;
      }
    });
  
    return filteredArray.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(search.toLowerCase())
      )
    );
  };
  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const filteredBookingsData = useMemo(() => {
    return filterOrderSearch(bookingsData, filter, orderBy, search);
  }, [bookingsData, filter, orderBy, search]);

  const handleDelete = (id: string): void => {
    deleteAlert().then((deleteConfirmed) => {
      if (deleteConfirmed) dispatch(deleteBooking(id));
    });
  };

  const columns = [
    {
      property: "guest",
      label: "Guest Details",
      display: ({ guest, phone_number, _id }: BookingsInterface) => (
        <>
          <CustomerPhoto src={`https://robohash.org/${guest}.png?set=any`} />
          <TextFormatter>{guest}</TextFormatter>
          <TextFormatter small="small">
            <FontAwesomeIcon icon={faPhone} style={{ color: "#799283" }} />{" "}
            {phone_number}
          </TextFormatter>
          <NavLink to={`/bookings/${_id}`}>
            <TextFormatter small="small">#{_id.slice(0, 10)}...</TextFormatter>
          </NavLink>
        </>
      ),
    },
    {
      property: "order_date",
      label: "Order Date",
    },
    {
      property: "check_in",
      label: "Check In",
    },
    {
      property: "check_out",
      label: "Check Out",
    },
    {
      property: "special_request",
      label: "Special Request",
      display: ({ special_request }: BookingsInterface) => (
        <ViewNotes
          specialrequest={special_request ? special_request.length : 0} 
          message={special_request || "No special request"} 
        />
      ),
    },
    {
      property: "room_type",
      label: "Room Type",
    },
    {
      property: "status",
      label: "Status",
      display: ({ status, _id }: BookingsInterface) => (
        <StatusContainer>
          <Status status={status}>{status}</Status>
          <PopMenu
            path={"bookings"}
            id={_id}
            onClick={() => handleDelete(_id)}
          />
        </StatusContainer>
      ),
    },
  ];

  return (
    <>
      <Container>
        <TabsMenuContainer>
          <TabButton
            onClick={() => setFilter("All Bookings")}
            style={
              filter === "All Bookings"
                ? {
                    color: `${colors.hardGreen}`,
                    borderBottom: `3px solid ${colors.hardGreen}`,
                  }
                : undefined
            }
          >
            All Bookings
          </TabButton>
          <TabButton
            onClick={() => setFilter("Check In")}
            style={
              filter === "Check In"
                ? {
                    color: `${colors.hardGreen}`,
                    borderBottom: `3px solid ${colors.hardGreen}`,
                  }
                : undefined
            }
          >
            Check In
          </TabButton>
          <TabButton
            onClick={() => setFilter("Check Out")}
            style={
              filter === "Check Out"
                ? {
                    color: `${colors.hardGreen}`,
                    borderBottom: `3px solid ${colors.hardGreen}`,
                  }
                : undefined
            }
          >
            Check Out
          </TabButton>
          <TabButton
            onClick={() => setFilter("In Progress")}
            style={
              filter === "In Progress"
                ? {
                    color: `${colors.hardGreen}`,
                    borderBottom: `3px solid ${colors.hardGreen}`,
                  }
                : undefined
            }
          >
            In Progress
          </TabButton>
        </TabsMenuContainer>

        <Search onChange={(event) => setSearch(event.target.value)}></Search>
        <Select
          onChange={(event) =>
            setOrderBy(event.target.value as keyof BookingsInterface)
          }
        >
          <option value="guest">Guest</option>
          <option value="order_date">Order Date</option>
          <option value="check_in">Check In</option>
          <option value="check_out">Check Out</option>
        </Select>
      </Container>

      {bookingsDataStatus === "rejected" ? (
        <ErrorMessage />
      ) : bookingsDataStatus === "pending" ? (
        <Spinner />
      ) : (
        <Table name="bookings" columns={columns} data={filteredBookingsData} />
      )}
    </>
  );
};
