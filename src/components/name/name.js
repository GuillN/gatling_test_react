import React, {useState} from "react";

const Name = props => {
    const [name, setName] = useState(props.name);

    const handleChange = e => {
        setName(e.target.value)
    };

    return (
        <td><input type="text" value={name} onChange={e => handleChange(e)}/></td>
    )
};

export default Name