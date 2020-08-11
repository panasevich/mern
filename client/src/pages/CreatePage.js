import React, {useContext, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from 'react-router-dom';

export const CreatePage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const  {request} = useHttp();
    const [link, setLink] = useState('')
    const changeHandler = ({target: {value}}) => setLink(value);
    const pressHandler = async e => {
        if(e.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                });
                history.push(`/detail/${data.link._id}`)
            } catch (e) {
                console.log(e);
            }
        }
    };
    return (
        <div className="row">
            <div className="col s8 offset-s2">
                <div className="input-field">
                    <input
                        placeholder="Enter link"
                        id="link"
                        type="text"
                        className="validate"
                        value={link}
                        onChange={changeHandler}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="email">Email</label>
                </div>
            </div>
        </div>
    )
}