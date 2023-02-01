'use client'

import { usePreview } from "../lib/sanity.preview";
import BlogList from './BlogList';

type Props = {
    query: string
}


function PreviewBlogList({query}: Props) {
    const posts = usePreview(`${process.env.NEXT_PUBLIC_SANITY_API_TOKEN}`, query);
    
  return (
    <BlogList posts={posts}/>
  )
}

export default PreviewBlogList