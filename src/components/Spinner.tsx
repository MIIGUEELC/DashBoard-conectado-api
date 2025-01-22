import { MagnifyingGlass } from "react-loader-spinner";
import colors from "../styles/colors";
import styled from "styled-components";

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px ;
`;

export const Spinner = () => {
  return (
    <>
      <SpinnerContainer>
        <MagnifyingGlass
          visible={true}
          height="100"
          width="100"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color={colors.green}
        />
      </SpinnerContainer>
    </>
  );
};
