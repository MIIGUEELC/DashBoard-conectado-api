import styled from "styled-components";
import colors from "../styles/colors";
import {
  BookingsInterface,
  ContactsInterface,
  RoomsInterface,
} from "../features/interfaces/interfaces";

const TableContainer = styled.div`
  padding: 0px 50px;
  height: 690px;
  overflow: hidden;
`;

const TableHeaderContainer = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-around;
  align-items: center;
  padding-right: 10px;
  height: 65px;
  border-bottom: 1px solid ${colors.borderGray};
  border-radius: 20px 20px 0px 0px;
  font-size: 16px;
  color: black;
  font-weight: 600;
  background-color: white;
  & div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`;

const TableContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  text-align: center;
  width: 100%;
  max-height: 100%;
  //border: 1px solid ${colors.borderGray};
  border-radius: 0 0 20px 20px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 10px;
    background-color: #ebf1ef;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    -webkit-box-shadow: inset 0 0 6px rgba(235, 241, 239, 0.3);
    background-color: rgba(102, 51, 153, 0.153);
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(235, 241, 239, 0.3);
    border-radius: 2px;
    background-color: rgba(235, 241, 239, 0.612);
  }
  p {
    text-align: center;
    color: black;
    font-size: 16px;
    font-weight: 300;
  }
  & div {
    width: 100%;
  }
`;

const RowContainer = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  border-bottom: 1px solid ${colors.borderGray};
  & div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-left: 1px solid ${colors.borderGray};
    width: 100%;
    &:first-child {
      border: none;
    }
    &:last-child {
      flex-direction: row;
      justify-content: space-evenly;
    }
  }
  &:last-child {
    margin-bottom: 64px;
  }
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 170px;
  }
`;

type Column = {
  property: string;
  label: string;
  display?: (arg: any) => any;
};

type TableProps = {
  columns: Column[];
  data: BookingsInterface[] | RoomsInterface[] | ContactsInterface[] | any;
  name: string;
};

type Row = BookingsInterface | RoomsInterface | ContactsInterface;

export const Table = (props: TableProps) => {
  const { columns, data } = props;

  const displayRow = (row: Row | undefined, index: number) => {
    if (!row) return null; 
  
    const rowContent = (
      <>
        {props.columns.map((col: Column, i: number) => (
          <div key={i}>
            {typeof col.display === "function"
              ? col.display(row) 
              : row[col.property as keyof Row] ?? "N/A"} 
          </div>
        ))}
      </>
    );
  
    const key = `${props.name}-${row?._id || index}`;
  
    return <RowContainer key={key}>{rowContent}</RowContainer>;
  };
  

  return (
    <>
      <TableContainer>
        <TableHeaderContainer>
          {columns.map((col: any, index: number) => (
            <div key={index}>
              <p>{col.label}</p>
            </div>
          ))}
        </TableHeaderContainer>
        <TableContent>
          {data.map((RowObject: Row, index: number) =>
            displayRow(RowObject, index)
          )}
        </TableContent>
      </TableContainer>
    </>
  );
};
