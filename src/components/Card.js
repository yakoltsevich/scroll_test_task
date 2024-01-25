import React from 'react'
import './Item.scss'
// {
//     "id": 42,
//     "name": "Big Head Morty",
//     "status": "unknown",
//     "species": "Human",
//     "type": "Human with giant head",
//     "gender": "Male",
//     "origin": {
//     "name": "unknown",
//         "url": ""
// },
//     "location": {
//     "name": "Citadel of Ricks",
//         "url": "https://rickandmortyapi.com/api/location/3"
// },
//     "image": "https://rickandmortyapi.com/api/character/avatar/42.jpeg",
//     "episode": [
//     "https://rickandmortyapi.com/api/episode/22"
// ],
//     "url": "https://rickandmortyapi.com/api/character/42",
//     "created": "2017-11-05T10:15:53.349Z"
// }
export const Item = ({item: {name, image}}) => {
    return (
        <div className='card' style={{backgroundImage: `url(${image})`}}  data-img={image}>
            <div className='card__background'>
                <div className='card__name' >{name}</div>
            </div>
        </div>
    )
}
