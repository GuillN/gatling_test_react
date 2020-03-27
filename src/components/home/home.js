import React, {useEffect, useState} from "react"
import Posts from "../posts/posts";
import Name from "../name/name";
import './home.css'

const Home = () => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setError('');
            setIsLoading(true);
            await fetch('https://jsonplaceholder.typicode.com/users')
                .then(response => {
                    if (!response.ok) throw Error(response.statusText);
                    return response.json()
                })
                .then(data => {
                    setData(data);
                    setIsLoading(false)
                })
                .catch(err => {
                    setError(err.toString());
                });
        };
        fetchData()
    }, []);

    return (
        <div>
            {error !== '' && <div>{error}</div>}
            {isLoading && error === '' && <div>Loading...</div>}
            {!isLoading && error === '' &&
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Posts</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => {
                    return <tr key={index}>
                        <td key={`id_${index}`}>{item.id}</td>
                        <Name name={item.name}/>
                        <td key={`username_${index}`}>{item.username}</td>
                        <Posts id={item.id}/>
                    </tr>
                })}
                </tbody>
            </table>
            }
        </div>
    )
};

export default Home