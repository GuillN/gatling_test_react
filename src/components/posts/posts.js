import React, {useState} from "react"
import './posts.css'

const Posts = props => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchPosts = async id => {
        setError('');
        setIsLoading(true);
        await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
            .then(response => {
                if(!response.ok) throw Error(response.statusText);
                return response.json()
            })
            .then(data => {
                setPosts(data);
                setIsLoading(false)
            }).catch(err => {
                setError(err.toString())
            })
    };

    const hidePosts = () => {
        setPosts([])
    };

    return (
        <td>
            {error !== '' && <div>{error}</div>}

            {isLoading && error === '' && <div>Loading...</div>}

            {posts.length === 0 && error === '' && !isLoading &&
            <button type="button" onClick={() => fetchPosts(props.id)}>Click to load posts</button>}

            {posts.length !== 0 && error === '' &&
            <ul>
                {posts.map((item, index) => (
                    <li key={index}>{item.title}</li>
                ))}
                <button className="hide-button" onClick={hidePosts}>Hide posts</button>
            </ul>}
        </td>
    )
};

export default Posts