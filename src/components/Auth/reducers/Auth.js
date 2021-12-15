import { createSlice } from '@reduxjs/toolkit';

const login = createSlice({
    name: 'login',
    initialState: {
    },
    reducers: {
        onLogout: () => {
            return {}
        },
        onLogin: (state, action) => {
            return { ...action.payload }
        },
        changeInfo: (state, action) => {
            const payload = action.payload;
            const newState = {
                ...state,
                birthday: payload.birthday,
                firstName: payload.firstName,
                lastName: payload.lastName,
                phone: payload.phone
            }
            return { ...newState };
        }
    }
});

const { reducer, actions } = login;
export const { onLogout, onLogin, changeInfo } = actions;
export default reducer;