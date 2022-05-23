import React from 'react';
import { useSelector } from 'react-redux';

function Blog() {
    const {NEWS} = useSelector((state: any) => state.BLOG);
    const {news} = NEWS;
    console.log(news)
    return (
        <div>

        </div>
    );
}

export default Blog;