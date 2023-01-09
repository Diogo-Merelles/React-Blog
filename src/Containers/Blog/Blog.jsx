import React from 'react'
import BlogCard from '../../Components/BlogCard/BlogCard'


const Blog = ({blogs}) => {
  return (
    <div>
      {blogs.map(blog => (
        <li key={blog.id}>
          <BlogCard />
        </li>
      ))}
    </div>
  )
}

export default Blog