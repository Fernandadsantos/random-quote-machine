import {configureStore} from '@reduxjs/toolkit';
import  generateQuoteReducer from './generateQuoteSlice';

export default configureStore({
    reducer: {
        generateQuote: generateQuoteReducer,
    },
})
