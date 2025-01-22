import styled from "styled-components";
import colors from "../styles/colors";
import icons from "../styles/icons";
import { IconContext } from "react-icons";

const Container = styled.div`
  background-color: transparent;
  height: 125px;
  margin: 50px 50px 40px 50px;
`;

const InnerContainer = styled.div`
  display: flex;
  gap: 38px;
`;

type Props = {
  red?: boolean;
};

const IconContainer = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 22px 30px 30px;
  height: 65px;
  width: 65px;
  border-radius: 8px;
  background-color: ${(props) => (props.red ? colors.red : colors.lightRed)};
  transition: all 250ms;
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  height: 125px;
  width: 100%;
  background-color: white;
  box-shadow: 0px 4px 4px #00000005;
  border-radius: 12px;
  transition: all 250ms;
  &:hover {
    transition: all 250ms;
    scale: 1.05;
    ${IconContainer} {
      transition: all 250ms;
      scale: 1.1;
    }
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-right: 30px;
`;

const H1 = styled.h1`
  margin-top: -1px;
  max-height: 35px;
  font-size: 30px;
`;
const H2 = styled.h2`
  font-size: 12px;
  font-weight: 300;
`;

export const Kpis = () => {
  return (
    <>
      <Container>
        <InnerContainer>
          <ItemContainer>
            <IconContainer>
              <IconContext.Provider
                value={{ color: colors.red, size: "1.6em" }}
              >
                {icons.bed}
              </IconContext.Provider>
            </IconContainer>
            <TextContainer>
              {" "}
              <H1>8,461</H1>
              <H2>New Bookings</H2>{" "}
            </TextContainer>
          </ItemContainer>
          <ItemContainer>
            <IconContainer red>
              <IconContext.Provider value={{ color: "white", size: "1.2em" }}>
                {icons.bookings2}
              </IconContext.Provider>
            </IconContainer>
            <TextContainer>
              {" "}
              <H1>963</H1>
              <H2>Scheduled Rooms</H2>{" "}
            </TextContainer>
          </ItemContainer>
          <ItemContainer>
            <IconContainer>
              <IconContext.Provider
                value={{ color: colors.red, size: "1.6em" }}
              >
                {icons.checkIn}
              </IconContext.Provider>
            </IconContainer>
            <TextContainer>
              {" "}
              <H1>753</H1>
              <H2>Check-Ins</H2>{" "}
            </TextContainer>
          </ItemContainer>
          <ItemContainer>
            <IconContainer>
              <IconContext.Provider
                value={{ color: colors.red, size: "1.6em" }}
              >
                {icons.checkOut}
              </IconContext.Provider>
            </IconContainer>
            <TextContainer>
              {" "}
              <H1>516</H1>
              <H2>Check-Outs</H2>{" "}
            </TextContainer>
          </ItemContainer>
        </InnerContainer>
      </Container>
    </>
  );
};
