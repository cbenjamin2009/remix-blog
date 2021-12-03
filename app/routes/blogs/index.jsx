import { getPosts } from '~/post';
import { Link, useLoaderData } from 'remix';

import postStyles from "~/styles/posts.css";
export let links = () => {
    return [{rel: "stylesheet", href: postStyles}]
}

export let loader = () => {
    return getPosts();
}

// our Posts function which will return the rendered component on the page .
export default function Posts() {
    let posts = useLoaderData();
    return (
        <div>
            <h1>My Remix Blog</h1>
            <p>Click on the post name to read the post</p>
            <ul>
                {posts.map(post => (
                    <li className="postList" key={post.slug}>
                        <Link className="postTitle" to={post.slug}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}