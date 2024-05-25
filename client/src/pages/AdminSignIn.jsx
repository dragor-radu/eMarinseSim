import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import {useDispatch, useSelector} from 'react-redux';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
        dispatch(signInStart());
        const res = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success == false) {
            dispatch(signInFailure(data.error));
            return;
        }
        dispatch(signInSuccess(data));
        navigate('/adminPage');
    } catch (error) {
        dispatch(signInFailure(error));
    }
  };
  return (
    <div>
        <div className='flex flex-row w-full justify-center items-center bg-blue-900'>
            <h1 className='bg-blue-900 w-full text-left py-4 ml-4 text-white font-bold'>eMarine - Admin</h1>
            <Link to='/' className='bg-blue-900 text-white text-center py-4 px-4'>Home</Link>
        </div>
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Sign In As Admin</h1>
            <form onSubmit={handleFormSubmit} className='flex flex-col gap-4'>
                <input type="email" placeholder="Email" id='email' className='bg-slate-100 p-3 rounded-xl'
                onChange={handleFormChange}/>
                <input type="password" placeholder="Password" id='password' className='bg-slate-100 p-3 rounded-xl'
                onChange={handleFormChange}/>
                <button disabled= {loading} className='bg-slate-900 text-white p-3 rounded-xl hover:opacity-90 disabled:opacity-70'>
                {loading ? 'Loading...' : 'Sign In'}
                </button>
            </form>
            <p className='text-red-500'>{error ? error + "!" || 'Something went wrong!': ""}</p>
        </div>
    </div>
  )
}