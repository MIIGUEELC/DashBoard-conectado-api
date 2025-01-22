import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import colors from "../styles/colors";

interface SearchProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchContainer = styled.div`
  position: relative;
  display: flex;

`;

const SearchInput = styled.input`
  font: 500 16px Poppins;
  color: ${colors.green};
  padding: 5px;
  width: 220px;
  height: 40px;
  margin-top: 50px;
  border-radius: 12px;
  border: 2px solid rgb(19, 88, 70);
  padding-right: 35px; 
  &:focus {
    outline: none; 
  }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 58%;
  right: 12px;
  transform: translateY(-50%);
  color: ${colors.green};
`;

export const Search: React.FC<SearchProps> = (props) => {
  return (
    <SearchContainer>
      <SearchIcon icon={faSearch} />
      <SearchInput onChange={props.onChange} />
    </SearchContainer>
  );
};

