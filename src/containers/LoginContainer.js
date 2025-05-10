"use client";
import React, {useState} from 'react';

// import { withFormik } from 'formik';
import { validateHeaderName } from 'http';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoginContainer = ({values,handleBlur,error,touched}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7001';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });
      
      if (result?.error) {
        console.error('Login failed:', result.error);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

    const handleGithubLogin =  () => {
      return `${BASE_URL}/oauth2/authorization/github`;
    };
  

  return (
      <div>
        <div className='flex flex-col items-center justify-center'>
          <p className='text-2xl font-thin mb-2'>Welcome to Times Nepal</p>
          </div>
          <form name='Credentials' onSubmit={handleSubmit} >
          <div className="bg-white shadow-md p-5 rounded-1xl flex flex-col  h-[300px] w-[300px] gap-3 ">
          <label className="error text-md bg-pink-200 text-center font-200 p-1">Invalid</label>
          <label className="text-sm font-bold">Username</label>
          <input value={username} 
                onChange={e => setUsername(e.target.value)} 
                placeholder="Username" 
                className="border-1 border-[#F0F3F2] h-10 rounded-5 p-3 focus:border-none outline-none focus:ring-0 focus:outline-none"/>
          <label className="text-sm font-bold ">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="border-1 border-[#F0F3F2] h-10 rounded-5 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-300"/>
          <input type="submit" className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white rounded-1xl text-md font-bold p-2" value="Login"/>
          </div>
          </form>
          <div className='flex flex-col mt-2 gap-2'>
          <Link 
               href={handleGithubLogin()}
              className='bg-green-700 text-white rounded-1xl shadow-md  hover:bg-green-900 text-md font-bold p-2 text-center'
            >
               <p className='flex flex-row gap-2 items-center'><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .5a12 12 0 00-3.79 23.39c.6.11.82-.26.82-.58v-2.01c-3.34.73-4.04-1.61-4.04-1.61-.54-1.39-1.32-1.76-1.32-1.76-1.08-.73.08-.71.08-.71 1.2.08 1.83 1.24 1.83 1.24 1.06 1.81 2.78 1.29 3.45.99.11-.77.41-1.29.74-1.58-2.67-.3-5.47-1.33-5.47-5.91 0-1.3.47-2.37 1.24-3.21-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.48 11.48 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.64.24 2.86.12 3.16.77.84 1.23 1.91 1.23 3.21 0 4.6-2.8 5.61-5.48 5.91.42.36.79 1.1.79 2.21v3.28c0 .32.22.7.83.58A12 12 0 0012 .5z"/>
              </svg> Sign in with Github
               </p>   
            </Link>
            <Link 
              href="/signup" 
              className='bg-gray-400 text-white rounded-1xl shadow-md  hover:bg-gray-500 text-md font-bold p-2 text-center'
            >
               <p className='flex flex-row gap-2 items-center'><span className="material-icons-outlined  text-white-500">person_add</span>Sign Up
               </p>   
            </Link>
           
          </div>
      </div>
  );
};

// const LoginForm = withFormik({
//     mapPropsToValues: () => ({ name: '' }),
//     validate: values => {
//       const errors = {};
//       if (!values.name) {
//         errors.name = 'Required';
//       }
//       return errors;
//     },
//     handleSubmit: (values, { setSubmitting }) => {
//       setTimeout(() => {
//         alert(JSON.stringify(values, null, 2));
//         setSubmitting(false);
//       }, 1000);
//     },
//     displayName: 'BasicForm',
//   })(LoginContainer);

  export default LoginContainer;