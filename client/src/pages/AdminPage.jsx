import React from 'react'
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signOutUser } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { set } from 'mongoose';

export default function AdminPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {currentUser} = useSelector(state => state.user);
  const handleSignOut = async () => {
    try {
        const res = await fetch('/api/auth/signout');
        dispatch(signOutUser());
    } catch (error) {
        console.log(error);
    }
  }
  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        const res = await fetch('/api/auth/addAdmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });
        const data = await res.json();
        setLoading(false);
    } catch (error) {
        setLoading(false);
        console.log(error);
    }
  }
  const handleAddProgram = async (e) => {
    e.preventDefault();
    setLoading(true);
    const nume_nava = document.getElementById('nume_nava').value;
    const port_plecare = document.getElementById('port_plecare').value;
    const data_plecare = document.getElementById('data_plecare').value;
    const port_sosire = document.getElementById('port_sosire').value;
    const data_sosire_estimata = document.getElementById('data_sosire_estimata').value;
    try {
        const res = await fetch(`/api/program/addProgram/${currentUser._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nume_nava, port_plecare, data_plecare, port_sosire, data_sosire_estimata }),
        });
        const data = await res.json();
        setLoading(false);
    } catch (error) {
        setLoading(false);
        console.log(error);
    }
  }
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex flex-row w-full justify-center items-center bg-blue-900'>
          <h1 className='bg-blue-900 w-full text-left py-4 ml-4 text-white font-bold'>eMarine - AdminPage</h1>
          <Link to='/' className='bg-blue-900 text-white text-center py-4 px-4'>Home</Link>
      </div>
      <div className='flex flex-row items-center bg-blue-100 p-4 rounded-full shadow-md m-2'>
        <h1 className='text-blue-400 mr-4'>You are currently logged as: {currentUser.username}</h1>
        <span onClick={handleSignOut} className='cursor-pointer text-red-600 text-sm'>Sign out</span>
    </div>
    <div className='flex flex-col items-center bg-blue-100 p-3 rounded-3xl shadow-md m-2 mt-6 max-w-lg'>
        <h1 className='text-blue-900 mr-4 mb-3 text-lg text-bold'>Add a Program</h1>
        <form className='flex flex-col gap-4'>
          <select id='nume_nava' className='bg-slate-100 p-3 rounded-xl'>
              <option value="">Select Ship Name</option>
              <option value="Norwegian Epic">Norwegian Epic</option>
              <option value="Costa Fortuna">Costa Fortuna</option>
              <option value="Queen Mary 2">Queen Mary 2</option>
              <option value="Celebrity Solstice">Celebrity Solstice</option>
              <option value="Royal Princess">Royal Princess</option>
              <option value="AIDAperla">AIDAperla</option>
              <option value="HMS Cargo">HMS Cargo</option>
              <option value="Freight King">Freight King</option>
              <option value="Ocean Carrier">Ocean Carrier</option>
          </select>
            <select id='port_plecare' className='bg-slate-100 p-3 rounded-xl'>
              <option value="">Departure</option>
              <option value="Constanta">Constanta</option>
              <option value="Barcelona">Barcelona</option>
              <option value="Istanbul">Istanbul</option>
              <option value="Piraeus">Piraeus</option>
              <option value="Napoli">Napoli</option>
              <option value="Newark–Elizabeth Marine Terminal">Newark–Elizabeth Marine Terminal</option>
              <option value="Plymouth">Plymouth</option>
              <option value="Cape Town ">Cape Town</option>
              <option value="Shanghai">Shanghai</option>
              <option value="Santos">Santos</option>
              // Add more options as needed
          </select>
            <input type="datetime-local" placeholder="Departure Date" id='data_plecare' className='bg-slate-100 p-3 rounded-xl'/>
            <select id='port_sosire' className='bg-slate-100 p-3 rounded-xl'>
              <option value="">Arriving</option>
              <option value="Constanta">Constanta</option>
              <option value="Barcelona">Barcelona</option>
              <option value="Istanbul">Istanbul</option>
              <option value="Piraeus">Piraeus</option>
              <option value="Napoli">Napoli</option>
              <option value="Newark–Elizabeth Marine Terminal">Newark–Elizabeth Marine Terminal</option>
              <option value="Plymouth">Plymouth</option>
              <option value="Cape Town ">Cape Town</option>
              <option value="Shanghai">Shanghai</option>
              <option value="Santos">Santos</option>
              // Add more options as needed
          </select>
            <input type="datetime-local" placeholder="Estimated Arriving Date" id='data_sosire_estimata' className='bg-slate-100 p-3 rounded-xl'/>
            <button disabled={loading} onClick={handleAddProgram} className='bg-slate-900 text-white p-3 rounded-xl hover:opacity-90'>{loading ? 'Loading...' : 'Add Program'}</button>
        </form>
        <Link to = '/program' className='text-blue-900 mr-4 mt-3 text-sm'>See all programs here.</Link>
    </div>
    <div className='flex flex-col items-center bg-blue-100 p-4 rounded-3xl shadow-md m-2 mt-3'>
        <h1 className='text-blue-900 mr-4 mb-3 text-lg text-bold'>Add an Admin</h1>
        <form className='flex flex-col gap-4'>
            <input type="text" placeholder="Username" id='username' className='bg-slate-100 p-3 rounded-xl'/>
            <input type="email" placeholder="Email" id='email' className='bg-slate-100 p-3 rounded-xl'/>
            <input type="password" placeholder="Password" id='password' className='bg-slate-100 p-3 rounded-xl'/>
            <button disabled= {loading} onClick={handleAddAdmin} className='bg-slate-900 text-white p-3 rounded-xl hover:opacity-90'> {loading ? 'Loading...' : 'Add Admin'}</button>
        </form>
    </div>
  </div>
  )
}
