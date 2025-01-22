import { useAppDispatch, useAppSelector } from "../app/hooks";
import { TabsMenuContainer, TabButton } from "../components/Tabs";
import { useEffect, useMemo, useState } from "react";
import { EmployeesInterface } from "../features/interfaces/interfaces";
import {
  deleteEmployee,
  fetchEmployees,
  getEmployees,
  getEmployeesStatus,
} from "../features/employees/employeesSlice";
import colors from "../styles/colors";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import PopMenu from "../components/PopMenu";
import { ErrorMessage } from "../components/ErrorMessage";
import { Spinner } from "../components/Spinner";
import { Table } from "../components/Table";
import { Search } from "../components/Search";
import deleteAlert from "../utils/deleteAlert";

const NameContainer = styled.aside`
  display: flex;
  align-self: start;
  align-items: center;
  justify-content: start;
  gap: 15px;
  margin-left: 10%;
  margin-right: 5px;
  padding: 5px 0px;
`;

const EmployeePhoto = styled.img`
  margin: 5px auto;
  height: 50px;
  width: 50px;
  background: ${(props) => (props.src ? "transparent" : `${colors.green}`)};
  border-radius: 8px;
`;

const DataContainer = styled.aside`
  display: flex;
  flex-direction: column;
`;

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
  height: 48px;
  border: none;
  border-radius: 8px;
  color: ${(props) =>
    props.status === "Active"
      ? `${colors.checkInBtnText}`
      : `${colors.checkOutBtnText}`};

  background-color: ${(props) =>
    props.status === "Active"
      ? `${colors.checkInBtnBgr}`
      : `${colors.checkOutBtnBgr}`};
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

export const Employees = () => {
  const dispatch = useAppDispatch();
  const employeesData = useAppSelector(getEmployees);
  const employeesDatastatus = useAppSelector(getEmployeesStatus);
  const [filter, setFilter] = useState("All Employees");
  const [orderBy, setOrderBy] = useState("Asc");
  const [search, setSearch] = useState("");
  const filterOrderSearch = (
    array: EmployeesInterface[],
    filter: string,
    orderBy: string,
    search: string
  ) => {
    const filteredArray = array.filter(
      (employee: EmployeesInterface) =>
        filter === "All Employees" || employee.status === filter
    );
    if (orderBy === "Asc") {
      filteredArray.sort((a: EmployeesInterface, b: EmployeesInterface) =>
        a.full_name.localeCompare(b.full_name, undefined, {
          sensitivity: "base",
        })
      );
    } else if (orderBy === "Desc") {
      filteredArray.sort((a: EmployeesInterface, b: EmployeesInterface) =>
        b.full_name.localeCompare(a.full_name, undefined, {
          sensitivity: "base",
        })
      );
    } else {
      filteredArray.sort((a: EmployeesInterface, b: EmployeesInterface) => {
        const dateComparison =
          new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
        if (dateComparison === 0) {
          return a.full_name.localeCompare(b.full_name);
        }
        return dateComparison;
      });
    }
    return filteredArray.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(search.toLowerCase())
    )
  );
  };

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const filteredEmployees = useMemo(() => {
    return filterOrderSearch(employeesData, filter, orderBy, search);
  }, [employeesData, filter, orderBy,search]);

  const handleDelete = (id: string): void => {
    deleteAlert().then((deleteConfirmed) => {
      if(deleteConfirmed) dispatch(deleteEmployee(id));
    })
  };

  const columns = [
    {
      property: "full_name",
      label: "Name",
      display: ({ full_name, photo, _id }: EmployeesInterface) => (
        <>
          <NameContainer>
            <EmployeePhoto src={photo} />
            <DataContainer>
              <TextFormatter>{full_name}</TextFormatter>
              <TextFormatter small="small">#{_id.slice(0,10)}...</TextFormatter>
            </DataContainer>
          </NameContainer>
        </>
      ),
    },
    {
      property: "contact_info",
      label: "Contact Information",
      display: ({ email, phone_number }: EmployeesInterface) => (
        <>
          <TextFormatter small="small">
            <FontAwesomeIcon icon={faPhone} style={{ color: "#799283" }} />{" "}
            {phone_number}
          </TextFormatter>
          <TextFormatter small="small">{email}</TextFormatter>
        </>
      ),
    },
    {
      property: "start_date",
      label: "Start Date",
    },
    {
      property: "description",
      label: "Job Description",
    },
    {
      property: "status",
      label: "Status",
      display: ({ status, _id }: EmployeesInterface) => (
        <StatusContainer>
          <Status status={status}>{status}</Status>
          <PopMenu
            path={"employees"}
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
            onClick={() => setFilter("All Employees")}
            style={
              filter === "All Employees"
                ? {
                    color: `${colors.hardGreen}`,
                    borderBottom: `3px solid ${colors.hardGreen}`,
                  }
                : undefined
            }
          >
            All Employees
          </TabButton>
          <TabButton
            onClick={() => setFilter("Active")}
            style={
              filter === "Active"
                ? {
                    color: `${colors.hardGreen}`,
                    borderBottom: `3px solid ${colors.hardGreen}`,
                  }
                : undefined
            }
          >
            Active
          </TabButton>
          <TabButton
            onClick={() => setFilter("Inactive")}
            style={
              filter === "Inactive"
                ? {
                    color: `${colors.hardGreen}`,
                    borderBottom: `3px solid ${colors.hardGreen}`,
                  }
                : undefined
            }
          >
            Inactive
          </TabButton>
        </TabsMenuContainer>
        <Search onChange={(event) => setSearch(event.target.value)}/>
        <Select onChange={(event) => setOrderBy(event.target.value)}>
          <option value="Asc">Name(A-Z)</option>
          <option value="Desc">Name(Z-A)</option>
          <option value="Start Date">Start Date</option>
        </Select>
      </Container>
      {employeesDatastatus === "rejected" ? (
        <ErrorMessage />
      ) : employeesDatastatus === "pending" ? (
        <Spinner />
      ) : (
        <Table name="employees" columns={columns} data={filteredEmployees} />
      )}
    </>
  );
};
