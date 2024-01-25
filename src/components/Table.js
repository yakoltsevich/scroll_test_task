import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Card} from './Card';
import axios from "axios";
import './Table.scss'

const API_URL = `https://rickandmortyapi.com/api/character`

export const Table = () => {
    const [data, setData] = useState([]);
    const [nextPageUrl, setNextPageUrl] = useState(API_URL);
    const [fetching, setFetching] = useState(true);

    const myRef = useRef(null);

    useEffect(() => {
        const {current} = myRef
        current.addEventListener('scroll', scrollHandler)
        return () => current.removeEventListener('scroll', scrollHandler)
    }, [myRef])

    const getNewData = useCallback(() => {
        axios.get(nextPageUrl)
            .then((response) => {
                const results = response?.data?.results
                const next = response?.data?.info?.next
                setNextPageUrl(next)
                setData(data.concat(results));
            })
            .catch(err => console.log('error', err))
            .finally(() => setFetching(false))
    }, [data, nextPageUrl])

    useEffect(() => {
        if (fetching && nextPageUrl) {
            getNewData()
        }
    }, [fetching, nextPageUrl, getNewData])

    const scrollHandler = (e) => {
        const {scrollHeight, scrollTop} = e?.target
        const {offsetHeight} = myRef?.current
        if (scrollHeight - (scrollTop + offsetHeight) < scrollHeight * 0.25) {
            setFetching(true)
        }
    }

    return (
        <div ref={myRef} className='table'>
            {data.map(item => <Card key={item.id} item={item}/>)}
        </div>
    );
};
