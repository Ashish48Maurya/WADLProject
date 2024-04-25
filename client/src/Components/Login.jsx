import React, { useState } from 'react'
import { useAuth } from '../Components/Store/auth'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
    const { storeTokenInLS, backend_api } = useAuth();
    const navigate = useNavigate();
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password || !mail) {
            return toast.error("All Fields are Required!!!");
        }

        try {
            const response = await fetch(`${backend_api}/login`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: mail,
                    password: password,
                }),
            })

            if (response.status === 200) {
                const res_data = await response.json();
                storeTokenInLS(res_data.token);
                localStorage.setItem("USER", JSON.stringify(res_data.user));
                toast.success("Login Successful");
                navigate('/');
            } else {
                return toast.error("Invalid Credentials!!!");
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <div class="container ">

                <div class="form-body">
                    <form id="registerForm" onSubmit={handleSubmit}>
                        <div class="form-group">
                            <label for="address">Email:</label>
                            <input type="text" id="address" name="address" required value={mail} onChange={(e)=>{setMail(e.target.value)}}/>
                        </div>
                        <div class="form-group">
                            <label for="password">Password:</label>
                            <input type="password" id="password" name="password" value={password}
                                onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div class="form-group">
                            <button type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div >
            <style>{`


.container {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: 100%;
    max-width: 400px;
}

.form-header {
    background-color: #4CAF50;
    color: #fff;
    padding: 20px;
    text-align: center;
}

.form-body {
    padding: 20px;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 5px;
}

button {
    background-color: #0d6efd;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

`}</style>
        </>
    )
}