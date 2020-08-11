import React, {useContext, useState} from "react";
import { useHttp } from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const {loading, error, request} = useHttp();
    const [form, setForm] = useState({email: '', password: ''})
    const changeHandler = ({target: {name, value}}) => {
        setForm({...form, [name]: value});
    };

    const registerHandler = async () => {
        try {
            const data = await request('api/auth/register', 'POST', form);
            console.log('Data', data);
        } catch (e) {

        }
    }
    const loginHandler = async () => {
        try {
            const data = await request('api/auth/login', 'POST', form);
            auth.login(data.token, data.userId);
        } catch (e) {

        }
    }
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Reduce link</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
            <div class="input-field">
                <input 
                    placeholder="Enter email" 
                    id="email" 
                    type="text" 
                    className="validate"
                    name="email"
                    onChange={changeHandler} 
                />
                <label htmlFor="email">Email</label>
            </div>
            <div class="input-field">
                <input 
                    placeholder="Enter password" 
                    id="password" 
                    type="password" 
                    className="validate" 
                    name="password"
                    onChange={changeHandler}
                />
                <label htmlFor="email">Password</label>
            </div>
            </div>
          </div>
          <div className="card-action">
            <button onClick={loginHandler} className="btn yellow darken-4">Submit</button>
            <button onClick={registerHandler} className="btn grey lighten-1 black-text">Registration</button>
          </div>
        </div>
      </div>
    </div>
  );
};
