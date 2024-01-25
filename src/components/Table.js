import React, {useEffect, useRef, useState} from 'react';
import {Item} from './Item';
import axios from "axios";

const API_URL = `https://rickandmortyapi.com/api/character`

const PostList = () => {
    const [data, setData] = useState([]);
    const [nextPageUrl, setNextPageUrl] = useState(API_URL);
    const [fetching, setFetching] = useState(true);

    const myRef = useRef(null);

    useEffect(() => {
        myRef.current.addEventListener('scroll', scrollHandler)
        return () => myRef.current.removeEventListener('scroll', scrollHandler)
    }, [myRef])

    useEffect(() => {
        if (fetching && nextPageUrl) {
            getNewData()
        }
    }, [fetching, nextPageUrl])

    const getNewData = () => {
        axios.get(nextPageUrl)
            .then((response) => {
                const results = response?.data?.results
                const next = response?.data?.info?.next
                setNextPageUrl(next)
                setData(data.concat(results));
            })
            .catch(err => console.log('error', err))
            .finally(() => setFetching(false))
    }

    const scrollHandler = (e) => {
        const {scrollHeight, scrollTop} = e?.target
        if (scrollHeight - (scrollTop + myRef.current.offsetHeight) < scrollHeight * 0.25) {
            setFetching(true)
        }
    }

    return (
            <div ref={myRef} className='wrapper'>
                {data.map(item => {
                    return <Item key={item.id} item={item}/>
                })}
            </div>
    );
};

export default PostList;