import React from 'react'
import './Card.scss'

export const Card = ({item: {name, image}}) => {
    return (
        <div className='card' style={{backgroundImage: `url(${image})`}}>
            <div className='card__background'>
                <div className='card__name'>{name}</div>
            </div>
        </div>
    )
}
