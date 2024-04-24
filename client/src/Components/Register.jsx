import React, { useState } from 'react'
import { useAuth } from '../Components/Store/auth'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Register() {
    const { storeTokenInLS, backend_api } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [department, setDepartment] = useState('CSE');
    const [userType, setUserType] = useState('student');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userType,department)
        if (!password || !email || !fullname || !department || !userType) {
            return toast.error("All Fields are Required!!!");
        }

        try {
            const response = await fetch(`${backend_api}/register`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userType,
                    department,
                    fullname,
                    email,
                    password
                }),
            });

            if (response.status === 200) {
                toast.success("Registration Successful");
                navigate('/login');
            } else {
                return toast.error("Registration Fail");
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
                        <div class="form-group flex">
                            <label for="address">FullName:</label>
                            <input type="text" id="address" name="address" required value={fullname} onChange={(e) => { setFullname(e.target.value) }} />
                        </div>
                        <div class="form-group flex">
                            <label for="address">Department:</label>
                            <select value={department} onChange={(e) => { setDepartment(e.target.value) }} className="select" required>
                                <option value="CSE">CSE</option>
                                <option value="IT">IT</option>
                                <option value="ICB">ICB</option>
                                <option value="CSDS">CSDS</option>
                                <option value="MECH">MECH</option>
                            </select>
                        </div>
                        <div class="form-group flex">
                            <label for="address">Email:</label>
                            <input type="text" id="address" name="address" required value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div class="form-group flex">
                            <label for="password">Password:</label>
                            <input type="password" id="password" name="password" value={password}
                                onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div class="form-group flex">
                            <label for="password">UserType:</label>
                            <select value={userType} onChange={(e) => { setUserType(e.target.value) }} className="select">
                                <option value="teacher">Teacher</option>
                                <option value="student">Student</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <button type="submit">Register</button>
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
    margin-right: 5px;
    align-item: center
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


.select {
    appearance: none;
    -webkit-appearance: none;
    background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 18px 18px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    padding-right: 36px;
    width: 100%;
    font-size: 16px;
    outline: none;
  }
  
  .select:focus {
    border-color: #4CAF50;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
  }
  
  .select:focus::-ms-value {
    color: #4CAF50;
  }
  
  .select:required:invalid {
    color: #ccc;
  }
  
  .select:required:invalid::-ms-value {
    color: #ccc;
  }
`}</style>
        </>
    )
}