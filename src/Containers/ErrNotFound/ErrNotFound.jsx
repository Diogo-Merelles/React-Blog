import React from 'react'
import notFound from '../../Images/error-404.jpg'

const ErrNotFound = () => {
  return (
    <img className='image-notFound' src={notFound} alt="404 - Not found" />
  )
}

export default ErrNotFound