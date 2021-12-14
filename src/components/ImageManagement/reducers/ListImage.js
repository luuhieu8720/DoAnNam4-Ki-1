import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const FetchList = createAsyncThunk('fetchList', async (params, thunkAPI) => {

    const dataUser = axios.get('https://pbl6-backend.herokuapp.com/api/users',
    {
        headers: {
            'Authorization': `Bearer ${params}`
        }
    }
    ).then(res => thunkAPI.dispatch(fetchListImage(res.data)));
    return dataUser;
})

const listImage = createSlice({
    name: 'listImage',
    initialState: [],
    reducers: {
        fetchListImage: (state, action) => {
            return action.payload;
        }
    },
    extraReducers: {
        [FetchList.fulfilled]: (state, action) => {
           state = action.payload;
        }
    }
});

const { reducer, actions } = listImage;
export const { fetchListImage } = actions;
export default reducer;