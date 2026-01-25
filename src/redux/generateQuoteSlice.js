import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

console.log(process.env.REACT_APP_KEY)
const url = 'https://api.api-ninjas.com/v2/randomquotes';
const options = {
    method: 'GET',
    headers: {
        'X-Api-Key': process.env.REACT_APP_KEY
    },
};

export const fetchQuote = createAsyncThunk(
    'generateQuote/fetchQuote',
    async () => {
        const response = await fetch(url, options);
        const data = await response.json();
        return data[0];
    }
);

const generateQuoteSlice = createSlice({
    name: 'generateQuote',
    initialState: {
        quote: '',
        author: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuote.fulfilled, (state, action) => {
                state.quote = action.payload.quote;
                state.author = action.payload.author;
            });
    },
});

export default generateQuoteSlice.reducer;