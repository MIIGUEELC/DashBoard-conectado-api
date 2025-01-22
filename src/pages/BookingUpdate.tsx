import styled from "styled-components";
import colors from "../styles/colors";
import {
  fetchBooking,
  getBooking,
  getBookingsStatus,
  updateBooking,
} from "../features/bookings/bookingsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { Spinner } from "../components/Spinner";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { BookingsInterface } from "../features/interfaces/interfaces";
import showToast from "../utils/toastMessages";

const Container = styled.div`
  margin: 50px;
  background-color: white;
  border-radius: 10px;
  padding: 40px;
`;

const Form = styled.form`
  display: flex;
`;

const LeftContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
`;
const RightContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
`;

const H1 = styled.h1`
  text-align: center;
  font-weight: 600;
`;

const Label = styled.label`
  font: 600 20px poppins;
  margin-right: 15px;
`;

const Input = styled.input`
  font-family: poppins;
  font-size: 16px;
  padding: 5px;
  margin-bottom: 30px;
  border: none;
  outline: none;
  border-bottom: 2px solid ${colors.bottomBorderGray};
  width: 300px;
  text-overflow: ellipsis;
`;
const TextArea = styled.textarea`
  font-family: poppins;
  font-size: 16px;
  padding: 5px;
  margin-bottom: 30px;
  //border: none;
  border-bottom: 2px solid ${colors.bottomBorderGray};
  width: 300px;
  min-height: 100px;
  text-overflow: ellipsis;
`;
const Ul = styled.ul`
  margin-top: 25px;
  text-align: right;
  list-style: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  font-family: Poppins;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: ${colors.lightGreen};
  background-color: ${colors.hardGreen};
  border-radius: 8px;
  cursor: pointer;
  padding: 12px 40px;
  border: 1px solid;
  &:hover {
    color: ${colors.hardGreen};
    background-color: ${colors.lightGreen};
  }
`;
const Select = styled.select`
  border: none;
  outline: none;
  border-bottom: 2px solid ${colors.bottomBorderGray};
  width: 300px;
  font-family: poppins;
  font-size: 16px;
  margin-bottom: 30px;
`;

const PhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 5px;
  margin-bottom: 30px;
`;

const PhotoInput = styled.input`
  text-overflow: ellipsis;
  font-family: poppins;
  font-size: 16px;
  padding: 5px;
  gap: 5px;
  border: none;
  outline: none;
  border-bottom: 2px solid ${colors.bottomBorderGray};
`;

export const BookingUpdate = () => {
  const navigate = useNavigate();
  const bookingId = useParams().bookingId || "";
  const selectBooking = useAppSelector(getBooking);
  const bookingStatus = useAppSelector(getBookingsStatus);
  const [newBooking, setNewBooking] = useState<BookingsInterface | null>(null);

  const availableTypeRoom = [
    "(Select from the list)",
    "Single Bed",
    "Double Bed",
    "Double Superior",
    "Suite",
  ];

  const roomStatus = [
    "(Select from the list)",
    "Check In",
    "Check Out",
    "In Progress",
  ];

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBooking(bookingId));
  }, [dispatch, bookingId]);

  useEffect(() => {
    setNewBooking(selectBooking);
  }, [selectBooking, bookingStatus]);

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
    key?: number
  ) => {
    const { name, value } = event.target;
    if (name === "photos" && key !== undefined) {
      newBooking &&
        setNewBooking({
          ...newBooking,
          photos: [
            ...newBooking.photos.slice(0, key),
            value,
            ...newBooking.photos.slice(key + 1),
          ],
        });
    } else {
      newBooking && setNewBooking({ ...newBooking, [name]: value });
    }
  };

  function handlePhotosQuantity(action: string) {
    if (newBooking) {
      const copyOfData = structuredClone(newBooking);
      if (action === "add" && copyOfData.photos.length < 4) {
        copyOfData.photos.push("");
      } else if (action === "remove" && copyOfData.photos.length > 1) {
        copyOfData.photos.pop();
      }
      setNewBooking(copyOfData);
    }
  }

  const handleSubmit = async () => {
    newBooking && await dispatch(updateBooking(newBooking));
    showToast({text: "Booking updated correctly! "});
    navigate("/bookings");
  };
  return (
    <>
      {bookingStatus === "rejected" ? (
        <ErrorMessage />
      ) : bookingStatus === "pending" ||
        newBooking === null ||
        newBooking._id !== bookingId ? (
        <Spinner />
      ) : (
        <Container>
          <H1>Booking Update</H1>
          <Form onSubmit={handleSubmit}>
            <LeftContainer>
              <Ul>
                <li>
                  <Label>Guest Full Name:</Label>
                  <Input
                    name="guest"
                    onChange={handleInputChange}
                    type="text"
                    defaultValue={newBooking.guest}
                  ></Input>
                </li>
                <li>
                  <Label>Phone Number:</Label>
                  <Input
                    name="phone_number"
                    onChange={handleInputChange}
                    defaultValue={newBooking.phone_number}
                  ></Input>
                </li>
                <li>
                  <Label>Order Date:</Label>
                  <Input
                    name="order_date"
                    type="date"
                    onChange={handleInputChange}
                    defaultValue={newBooking.order_date}
                  ></Input>
                </li>
                <li>
                  <Label>Check In:</Label>
                  <Input
                    name="check_in"
                    type="date"
                    onChange={handleInputChange}
                    defaultValue={newBooking.check_in}
                  ></Input>
                </li>
                <li>
                  <Label>Check Out:</Label>
                  <Input
                    name="check_out"
                    type="date"
                    onChange={handleInputChange}
                    defaultValue={newBooking.check_out}
                  ></Input>
                </li>
              </Ul>
            </LeftContainer>
            <RightContainer>
              <Ul>
                <li>
                  <Label>Room Type:</Label>
                  <Select
                    name="room_type"
                    onChange={handleInputChange}
                    defaultValue={newBooking.room_type}
                  >
                    {availableTypeRoom.map((item, index) => {
                      return (
                        <option
                          key={index}
                          value={index === 0 ? "" : availableTypeRoom[index]}
                          hidden={index === 0}
                        >
                          {item}
                        </option>
                      );
                    })}
                  </Select>
                </li>
                <li>
                  <Label>Room Number:</Label>
                  <Input
                    name="room_number"
                    type="text"
                    onChange={handleInputChange}
                    defaultValue={newBooking.room_number}
                  ></Input>
                </li>
                <li>
                  <Label>Status:</Label>
                  <Select
                    name="status"
                    onChange={handleInputChange}
                    defaultValue={newBooking.status}
                  >
                    {roomStatus.map((item, index) => {
                      return (
                        <option
                          key={index}
                          value={index === 0 ? "" : roomStatus[index]}
                          hidden={index === 0}
                        >
                          {item}
                        </option>
                      );
                    })}
                  </Select>
                </li>
                <li
                  style={{
                    display: "flex",
                    margin: 0,
                    justifyContent: "flex-end",
                  }}
                >
                  <Label>Photo:</Label>
                  <PhotoContainer>
                    {newBooking.photos.map((photo, key) => {
                      return (
                        <PhotoInput
                          name="photos"
                          onChange={(event) => handleInputChange(event, key)}
                          key={key}
                          defaultValue={photo}
                        />
                      );
                    })}
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        handlePhotosQuantity("add");
                      }}
                    >
                      +
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        handlePhotosQuantity("remove");
                      }}
                    >
                      -
                    </Button>
                  </PhotoContainer>
                </li>
                <li>
                  <Label style={{ verticalAlign: "top" }}>
                    Special Request:
                  </Label>
                  <TextArea
                    defaultValue={newBooking.special_request}
                    name="special_request"
                    onChange={handleInputChange}
                  />
                </li>
              </Ul>
            </RightContainer>
          </Form>
          <ButtonContainer>
            <Button onClick={handleSubmit}>Save</Button>
          </ButtonContainer>
        </Container>
      )}
    </>
  );
};
