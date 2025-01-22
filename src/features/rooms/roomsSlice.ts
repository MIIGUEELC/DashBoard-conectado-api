import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { IRoomsInitialState, RoomsInterface } from '../../features/interfaces/interfaces'
import { RootState } from "../../app/store";
import { apiRequest } from "../../utils/apiRequest";

export const fetchRooms = createAsyncThunk('rooms/fetchRooms', () => {
  return apiRequest('rooms', 'GET');
})

export const fetchRoom = createAsyncThunk('rooms/fetchRoom', (id: string | undefined) => {
  return apiRequest(`rooms/${id}`, 'GET');
})

export const createRoom = createAsyncThunk('rooms/createRoom', (newRoom: RoomsInterface) => {
  return apiRequest(`rooms`, 'POST', newRoom);
})

export const updateRoom = createAsyncThunk('rooms/updateRoom', (updatedRoom: RoomsInterface) => {
  return apiRequest(`rooms/${updatedRoom._id}`, 'PUT', updatedRoom);
})

export const deleteRoom = createAsyncThunk('rooms/deleteRoom', async (id: string) => {
  const result = await apiRequest(`rooms/${id}`, 'DELETE');
  if (result === 'The room was correctly deleted.') { return id; }

})


const initialState: IRoomsInitialState = {
  data: [],
  item: null,
  status: 'idle'
}


const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(fetchRoom.pending, (state) => {
        state.status = 'pending';
        state.item = null;
      })
      .addCase(fetchRoom.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.item = action.payload;
      })
      .addCase(fetchRoom.rejected, (state) => {
        state.status = 'rejected';
        state.item = null;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data = [...state.data, action.payload]
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.item = { ...state.item, ...action.payload };
        state.data = state.data.filter((item) => item._id !== action.payload._id);
        state.item && state.data.push(state.item);
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data = state.data.filter((item) => item._id !== action.payload);
      })
      .addMatcher(
        isAnyOf(
          fetchRooms.pending,
          createRoom.pending,
          updateRoom.pending,
          deleteRoom.pending,
        ),
        (state) => {
          state.status = 'pending';
        }
      )
      .addMatcher(
        isAnyOf(
          fetchRooms.rejected,
          createRoom.rejected,
          updateRoom.rejected,
          deleteRoom.rejected,
        ),
        (state) => {
          state.status = 'rejected';
        }
      )
  },
});

export default roomsSlice.reducer;
export const getRooms = (state: RootState) => state.rooms.data;
export const getRoomsStatus = (state: RootState) => state.rooms.status;
export const getRoom = (state: RootState) => state.rooms.item;
