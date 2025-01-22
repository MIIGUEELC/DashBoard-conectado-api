import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchContacts,
  getContacts,
  getContactsStatus,
  updateContact,
} from "../features/contacts/contactsSlice";
import "../styles/styles.css";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { ReviewCard } from "./ReviewCard";
import { ErrorMessage } from "./ErrorMessage";
import { Spinner } from "./Spinner";
import { ContactsInterface } from "../features/interfaces/interfaces";
import showToast from "../utils/toastMessages";

const ReviewsContainer = styled.div`
  margin: 50px;
  padding: 30px;
  box-shadow: 0px 4px 4px #00000005;
  border-radius: 20px;
  background: #ffffff 0% 0% no-repeat padding-box;
`;

const Title = styled.h1`
  text-align: left;
  font: 500 20px Poppins;
  letter-spacing: 0px;
  color: #393939;
  opacity: 1;
`;

export const Reviews = () => {
  const dispatch = useAppDispatch();
  const contactsData = useAppSelector(getContacts);
  const contactsDataStatus = useAppSelector(getContactsStatus);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleArchive = async (contact: ContactsInterface) => {
    const archiveContact = { ...contact, status: "Archived" };
    await dispatch(updateContact(archiveContact));
    dispatch(fetchContacts());
    showToast({ text: "Contact archived correctly! " });
  };

  return (
    <>
      <ReviewsContainer>
        <Title>Latest Reviews by Customers</Title>
        {contactsDataStatus === "rejected" ? (
          <ErrorMessage />
        ) : contactsDataStatus === "pending" ? (
          <Spinner />
        ) : (
          <Swiper
            breakpoints={{
              1000: { slidesPerView: 2 },
              1600: { slidesPerView: 3 },
            }}
            spaceBetween={40}
            navigation
            modules={[Navigation]}
          >
            {contactsData
              .filter((contact) => contact.status !== "Archived")
              .map((contact, index) => {
                return (
                  <SwiperSlide key={index}>
                    <ReviewCard contact={contact} handleArchive={handleArchive} />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        )}
      </ReviewsContainer>
    </>
  );
};
