import styled from "styled-components";
import { ContactsInterface } from "../features/interfaces/interfaces";
import colors from "../styles/colors";

const CardContainer = styled.div`
  margin: 30px 0 5px 6px;
  padding: 30px;
  width: 431px;
  height: 275px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #ebebeb;
  border-radius: 20px;
`;

const InnerCardContainer = styled.div`
  display: flex;
  gap: 21px;
  width: 100%;
  height: 56px;
`;

const Name = styled.h2`
  text-align: left;
  font: normal normal 600 14px/25px Poppins;
  letter-spacing: 0px;
  color: #262626;
`;

const Review = styled.p`
  margin-bottom: 52px;
  text-align: left;
  font: normal normal normal 16px/28px Poppins;
  letter-spacing: 0px;
  color: #4e4e4e;
  height: 107px;
  overflow: auto;
`;

const EmployeePhoto = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 8px;
  background-color: #c5c5c5;
  background-repeat: no-repeat;
  background-size: cover;
`;

type Props = {
  green: boolean;
};

const Button = styled.button.attrs({ type: "button" })<Props>`
  align-self: center;
  height: 40px;
  width: 85px;
  font-family: Poppins;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  color: ${(props) => (props.green ? colors.lightGreen : colors.lightRed)};
  background-color: ${(props) => (props.green ? colors.hardGreen : colors.red)};
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid;
  &:hover {
    color: ${colors.hardGreen};
    background-color: ${(props) =>
      props.green ? colors.lightGreen : colors.red};
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 185px;
  & span {
    font: normal normal normal 12px/10px Poppins;
    letter-spacing: 0px;
    color: #799283;
  }
`;

type ReviewProps = {
  contact: ContactsInterface;
  handleArchive: Function;
};

export const ReviewCard = (props: ReviewProps) => {
  return (
    <>
      <CardContainer>
        <Review>{props.contact.review_body}</Review>
        <InnerCardContainer>
          <EmployeePhoto
            style={{
              backgroundImage: `url('https://robohash.org/${props.contact.full_name}.png')`,
            }}
          />
          <TextContainer>
            <Name>{props.contact.full_name}</Name>
            <span>
              <a href="mailto:">{props.contact.email}</a>
            </span>
            <span>
              <a href="tel:+">{props.contact.phone_number}</a>
            </span>
          </TextContainer>
          <Button green onClick={() => props.handleArchive(props.contact)}>
            Archive
          </Button>
        </InnerCardContainer>
      </CardContainer>
    </>
  );
};
