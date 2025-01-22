import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { EmployeesInterface, IEmployeesInitialState } from '../../features/interfaces/interfaces' 
import { RootState } from "../../app/store";
import { apiRequest } from "../../utils/apiRequest";

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', () => {
  return apiRequest('employees','GET');
})

export const fetchEmployee = createAsyncThunk('employees/fetchEmployee', (id:string | undefined) => {
  return apiRequest(`employees/${id}`,'GET');
})

export const createEmployee = createAsyncThunk('employees/createEmployee', (newEmployee:EmployeesInterface) => {
  return apiRequest(`employees`,'POST',newEmployee);
})
export const updateEmployee = createAsyncThunk('employees/updateEmployee', (updatedEmployee: EmployeesInterface) => {
  return apiRequest(`employees/${updatedEmployee._id}`,'PUT',updatedEmployee);
})

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id:string) => {
  const result = await apiRequest(`employees/${id}`,'DELETE');
  if(result === 'The employee was correctly deleted.') {return id;}
})

const initialState: IEmployeesInitialState = {
  data: [],
  item: null,
  status: 'idle'
}

const employeesSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
      builder
        .addCase(fetchEmployees.fulfilled, (state, action) => {
          state.status = 'fulfilled';
          state.data = action.payload;
        })
        .addCase(fetchEmployee.pending, (state) => {
          state.status = 'pending';
          state.item = null;
        })
        .addCase(fetchEmployee.fulfilled, (state, action) => {
          state.status = 'fulfilled';
          state.item = action.payload;
        })
        .addCase(fetchEmployee.rejected, (state) => {
          state.status = 'rejected';
          state.item = null;
        })
        .addCase(createEmployee.fulfilled, (state, action) => {
          state.status = 'fulfilled';
          state.data = [...state.data, action.payload]
        })
        .addCase(updateEmployee.fulfilled, (state, action) => {
          state.status = 'fulfilled';
          state.item = {...state.item, ...action.payload.updatedBooking}
          state.data = state.data.filter((item)=> item._id !== action.payload.updatedBooking.id);
          state.item && state.data.push(state.item)
        })
        .addCase(deleteEmployee.fulfilled, (state, action) => {
          state.status = 'fulfilled';
          state.data = state.data.filter((item)=> item._id !== action.payload);
        })
        .addMatcher(
          isAnyOf(
            fetchEmployees.pending,
            createEmployee.pending,
            updateEmployee.pending,
            deleteEmployee.pending,
          ),
          (state) => {
            state.status = 'pending';
          }
        )
        .addMatcher(
          isAnyOf(
            fetchEmployees.rejected,
            createEmployee.rejected,
            updateEmployee.rejected,
            deleteEmployee.rejected,
          ),
          (state) => {
            state.status = 'rejected';
          }
        )
    },
  });

export default employeesSlice.reducer;
export const getEmployees = (state:RootState) => state.employees.data;
export const getEmployeesStatus = (state:RootState) => state.employees.status;
export const getEmployee = (state:RootState) => state.employees.item;
