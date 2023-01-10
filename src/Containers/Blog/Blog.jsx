import React from 'react'
import BlogCard from '../../Components/BlogCard/BlogCard'


const Blog = ({blogs}) => {
  return (
    <div>
      {blogs.map(blog => (
          <BlogCard />
      ))}
    </div>
  )
}

export default Blog