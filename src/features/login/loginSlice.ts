import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILoginInitialState, LoginInterface } from "../interfaces/interfaces";
import { RootState } from "../../app/store";

const urlBase = import.meta.env.VITE_API_URL + '/api/auth';


export const userLogin = createAsyncThunk('login/userLogin', async (data: LoginInterface) => {
    try {
        const response = (await fetch(urlBase, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: data.username,
                password: data.password
            })
        }));
        if (!response.ok) {
            throw new Error(`status: ${response.status}`)
        } else {
            const data = await response.json();
            localStorage.setItem("token", data);
            
        }

    } catch (error) {
        throw new Error('Login failed')
    }
})

const initialState: ILoginInitialState = {
    data: [],
    status: 'idle',
    error: null
}


const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
            })
            .addCase(userLogin.pending, (state, action) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = 'true';
            })
    }

});

export default loginSlice.reducer;
export const {resetStatus} = loginSlice.actions;
export const getLoginStatus = (state:RootState) => state.login.status;