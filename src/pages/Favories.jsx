import React from 'react'
import Movies from '../components/Movies'
import './styles/favorites.css'

function Favories() {
  return (
    <div className='favorites'>
      <h2 className="favorites__title">
        Favorites
      </h2>
      <div className="favorites__main">
        {/* <Movies recommended/> */}
      </div>
    </div>
  )
}

export default Favories