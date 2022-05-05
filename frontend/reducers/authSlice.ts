import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { IUser } from '../types/User';

const initialState: IUser = {
    documents: [],
    email: '',
    password: '',
    publicKey: '',
    _id: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state: IUser, action: PayloadAction<IUser>) => {
            state._id = action.payload._id;
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.publicKey = action.payload.publicKey;
            state.documents = action.payload.documents;
        },
        logout: (state: IUser) => {
            state._id = '';
            state.email = '';
            state.password = '';
            state.publicKey = '';
            state.documents = [];
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
