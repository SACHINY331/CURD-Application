{/* <FormControl>
    <InputLabel>City</InputLabel>
    <Input onChange={(e) => onValueChange(e)} name='city' value={city} id="my-input" />
</FormControl>


import { Button, FormControl, FormGroup, InputLabel, Input, styled, Typography } from "@mui/material"
import { useState } from 'react';
import { addUser } from "../service/api";
import { useNavigate } from "react-router-dom";

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top:20px;
    }
`;

const initialValue = {
    name: '',
    username: '',
    city: '',
    email: '',
    phone: ''
}

const Adduser = () => {

    const [user, setUser] = useState(initialValue);
    const { name, username, city, email, phone } = user;

    const navigate = useNavigate();


    const onValueChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const addUserDetails = async () => {
        await addUser(user);
        navigate('/all');
    }



    return (
        <Container>



            <Typography variant="h4">Adduser</Typography>



            <FormControl>
                <InputLabel>Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='name' value={name} id="my-input" />

            </FormControl>
            <FormControl>
                <InputLabel>UserName</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='username' value={username} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel>City</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='city' value={city} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel>Email</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='email' value={email} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel>Phone</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='phone' value={phone} id="my-input" />
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => addUserDetails()}>Add User</Button>
            </FormControl>
        </Container>

    )
}

export default Adduser;



///ALL USER HERE

import { Table, TableHead, TableCell, TableRow, TableBody, Button, styled } from '@mui/material'
import { getUsers, deleteUser } from '../service/api';
import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

const StyledTable = styled(Table)`
    width: 90%;
    margin: 50px 0 0 50px;
`;

const THead = styled(TableRow)`
    & > th {
        font-size: 20px;
        background: #000000;
        color: #FFFFFF;
    }
`;

const TBody = styled(TableRow)`
    & > td{
        font-size: 18px
    }
`;

const AllUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = async () => {
        let response = await getUsers();
        setUsers(response.data);
    }


    const deleteUserData = async (id) => {
        await deleteUser(id);
        getAllUsers();
    }



    return (
        <StyledTable>
            <Table>
                <TableHead>
                    <THead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>UserName</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </THead>
                </TableHead>
                <TableBody>
                    {
                        users.map((user => (
                            <TBody key={user._id}>
                                <TableCell>{user._id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.city}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>
                                    <Button color="primary" variant="contained" style={{ marginRight: 10 }} component={Link} to={`/edit/${user._id}`}>Edit</Button>
                                    <Button color="secondary" variant="contained" onClick={() => deleteUserData(user._id)}>Delete</Button>
                                </TableCell>

                            </TBody>
                        )))}
                </TableBody>
            </Table>
        </StyledTable>
    )
}
export default AllUsers;


///Edit user


import { useState, useEffect } from 'react';

import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser } from '../service/api';
import { editUser } from '../service/api';

const initialValue = {
    name: '',
    username: '',
    city: '',
    email: '',
    phone: ''
}

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px}
`;


const EditUser = () => {
    const [user, setUser] = useState(initialValue);


    const { id } = useParams();

    let navigate = useNavigate();

    useEffect(() => {
        loadUserDetails();
    }, []);

    const loadUserDetails = async () => {
        const response = await getUser(id);
        setUser(response.data);
    }

    const editUserDetails = async () => {
        const response = await editUser(user, id);
        navigate('/all');
    }

    const onValueChange = (e) => {
        console.log(e.target.value);
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <Container>
            <Typography variant="h4">Edit User</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='name' value={user.name} />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Username</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='username' value={user.username} />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Username</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='city' value={user.city} />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Email</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='email' value={user.email} />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Phone</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='phone' value={user.phone} />
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => editUserDetails()}>Edit User</Button>
            </FormControl>
        </Container>
    )
};

export default EditUser;

//Navbar  

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';

import { NavLink } from 'react-router-dom';
const Header = styled(AppBar)`
    background: #111111
`;

const Tabs = styled(NavLink)`
    font-size: 20px; 
    margin-right: 20px;
    color: inherit;
    text-decoration: none;
`

const Navbar = () => {
    return (
        <Header position='static'>
            <Toolbar>
                <Tabs to={'/'}>Codings king</Tabs>
                <Tabs to={'/all'}>Allusers</Tabs>
                <Tabs to={'/add'}>Adduser</Tabs>


            </Toolbar>
        </Header>
    )
}
export default Navbar

///Apis

import axios from 'axios'



const URL = 'http://localhost:8000';

export const addUser = async (user) => {
    try {
        return await axios.post(`${URL}/add`, user)
    } catch (error) {
        console.log("Error while calling add User Api", error)
    }
}

export const getUsers = async () => {
    try {
        await axios.get(`${URL}/all`);
    } catch (error) {
        console.log('error while calling getuser api', error)
    }
}

export const getUser = async (id) => {
    try {
        return await axios.get(`${URL}/${id}`);

    } catch (error) {
        console.log('error whilw calling getUser api', error)
    }
}

export const editUser = async (user, id) => {
    try {
        return await axios.put(`${URL}/${id}`, user)
    } catch (error) {
        console.log('error whilw calling getUser api', error)
    }
}


export const deleteUser = async (id) => {
    try {
        return await axios.delete(`${URL}/${id}`)

    } catch (error) {
        console.log('error while calling deletuser api', error)

    }
}


///app.js

import AllUsers from './Component/AllUsers';
import AddUser from './Component/AddUser';
import EditUser from './Component/EditUser';
import NavBar from './Component/NavBar';
import NotFound from './Component/NotFound';
import CodeForInterview from './Component/CodeForInterview';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<CodeForInterview />} />
                <Route path="all" element={<AllUsers />} />
                <Route path="/add" element={<AddUser />} />
                <Route path="/edit/:id" element={<EditUser />} />
                <Route path='/*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;


//index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


//USER-CONTROLL

import User from '../schema/user-schema.js'

export const addUser = async (request, response) => {
    const user = request.body;

    const newUser = new User(user);
    try {
        await newUser.save();
        response.status(201).json(newUser);
    } catch (error) {
        response.status(409).json({ message: error.message });
    }
}

export const getUsers = async (request, response) => {
    try {
        const users = await User.find({});
        response.status(200).json(users);
    } catch (error) {
        response.status(404).json({ message: error.message });

    }
}

export const getUser = async (request, response) => {

    try {
        const user = await User.find({ _id: request.params.id });
        response.status(200).json(user);
    } catch (error) {
        response.status(404).json({ message: error.message });

    }

}

export const editUser = async (request, response) => {
    let user = request.body;

    const editUser = new User(user);
    try {
        await User.updateOne({ _id: request.params.id }, editUser);
        response.status(201).json(editUser);
    } catch (error) {
        response.status(409).json({ message: error.message });
    }
}

export const deleteUser = async (request, response) => {
    try {
        await User.deleteOne({ _id: request.params.id });
        response.status(201).json("User deleted Successfully");
    } catch (error) {
        response.status(409).json({ message: error.message });
    }
}

///db dtata

import mongoose from "mongoose"
import autoIncrement from 'mongoose-auto-increment';


const connection = async () => {
    const URL = 'mongodb+srv://NEWLUCKY:5nZlpFAZXsYJ4B02@cluster0.emqw3kd.mongodb.net/?retryWrites=true&w=majority';

    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('database connected sucessfully')

    } catch (error) {
        console.log('Error while connecting with the database', error)
    }

}

autoIncrement.initialize(mongoose.connection);

export default connection;

///routs

import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

// how our document look like
const userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    phone: Number
});

autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, 'user');
// we need to turn it into a model
const postUser = mongoose.model('user', userSchema);

export default postUser;


///index.js

import express from 'express';

import dotenv from 'dotenv';

import connection from './database/db.js';

import Routes from './routes/route.js';

import cors from 'cors';

import bodyParser from 'body-parser';

import mongoose from 'mongoose';



const app = express();


dotenv.config();
app.use(cors());

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', Routes);
mongoose.set('strictQuery', true);
const PORT = 8000;

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;


connection(username, password);
mongoose.set('strictQuery', true);
app.listen(PORT, () => console.log(`server is running sucessfully on PORT ${PORT}`)); */}
