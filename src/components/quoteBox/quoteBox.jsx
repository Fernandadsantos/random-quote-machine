import { useDispatch, useSelector } from 'react-redux';
import {fetchQuote} from '../../redux/generateQuoteSlice.js';
import { useEffect, useRef, useState } from 'react';
import twitterIcon from '../../assets/twitter.png';
import './quoteBox.css';

export default function QuoteBox(){
    const {quote, author} = useSelector((state) => state.generateQuote);
    const [isLoading, setIsloading] = useState(true);
    const dispatch = useDispatch();
    const textRef = useRef(null);

    const tweetText = `"${quote}" - ${author}`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;


    const _fetchQuoteOnClick = () => {

        if(!isLoading){
            setIsloading(true);
            dispatch(fetchQuote())
        }
    };

    useEffect(()=>{
        if(textRef.current){
            textRef.current.style.opacity='0';
            textRef.current.style.animation='none';
            
            setTimeout(() => {
                textRef.current.style.animation='visible 1s ease-in-out forwards'
                setIsloading(false);
            }, 10);
        }
    },[quote]);
    
    return(
        <div className='container'>
            <div id='quote-box'>
                <h2 id='text' >"{quote}"</h2>
                <p id='author'>- {author}</p>
                <div className='buttons'>
                    <button className='tweet-quote' >
                        <a id='tweet-quote' rel="noreferrer" target="_blank" href={tweetUrl}>
                            <img className='twitterLogo' src={twitterIcon} alt="twitter logo" />
                        </a>
                    </button>
                    <button
                        ref={textRef}
                        id='new-quote'
                        className={isLoading ? 'isLoading' : ''}
                        onClick={_fetchQuoteOnClick}
                        disabled={isLoading}
                    >
                        New quote
                    </button>
                </div>
            </div>
            <div>
                <h2 className='footer'>By Fernanda S.</h2>
            </div>
        </div>
    )
};

