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
            return {...action.payload}
        }
    }
});

const { reducer, actions } = login;
export const { onLogout, onLogin } = actions;
export default reducer;