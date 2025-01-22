import { configureStore } from "@reduxjs/toolkit";
import bookingsSlice from "../features/bookings/bookingsSlice";
import roomsSlice from "../features/rooms/roomsSlice";
import loginSlice from "../features/login/loginSlice";
import employeesSlice from "../features/employees/employeesSlice";
import contactsSlice from "../features/contacts/contactsSlice";


export const store = configureStore(
    {
        reducer: {
            bookings: bookingsSlice,
            rooms: roomsSlice,
            employees: employeesSlice,
            login: loginSlice,
            contacts: contactsSlice,
        }
    }
) 

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch