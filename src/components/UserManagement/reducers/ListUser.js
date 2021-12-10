import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const FetchList = createAsyncThunk('fetchList', async (params, thunkAPI) => {

    const dataUser = axios.get('https://pbl6-backend.herokuapp.com/api/users',
    {
        headers: {
            'Authorization': `Bearer ${params}`
        }
    }
    ).then(res => thunkAPI.dispatch(fetchListUser(res.data)));
    return dataUser;
})

const listUser = createSlice({
    name: 'login',
    initialState: [],
    reducers: {
        fetchListUser: (state, action) => {
            return action.payload;
        }
    },
    extraReducers: {
        [FetchList.fulfilled]: (state, action) => {
           state = action.payload;
        }
    }
});

const { reducer, actions } = listUser;
export const { fetchListUser } = actions;
export default reducer;