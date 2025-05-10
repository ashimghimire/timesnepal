"use client";
import React, {useState} from 'react';

import { Form, withFormik } from 'formik';
import Link from 'next/link';
import { post } from '../lib/fetchClient';
import { useRouter } from 'next/navigation';
const SignupContainer = ({values,handleBlur,error,touched,handleSubmit,handleChange}) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7001';
  const router = useRouter();
  const handleGithubLogin =  () => {
    return `${BASE_URL}/oauth2/authorization/github`;
  };
    return (
        <div>
            <Form name='Credentials' onSubmit={handleSubmit} >
            <p className='text-2xl font-thin mb-2'>Welcome to Times Nepal</p>
            <div className="bg-white shadow-md p-5 rounded-xl flex flex-col gap-3 mt-2 ">
            <p className='text-2xl font-bold items-center flex flex-row gap-2'>Sign Up<span className="material-icons-outlined">person_add</span></p>
            <div className='flex flex-row gap-2'>
            <div className='flex flex-col gap-2'>
            {/* {error & <label className="error text-sm bg-red-500 text-center  rounded-4xl font-200 p-2 text-white">Invalid</label>} */}
            
            <label className="text-sm font-bold">Username</label>
            <input value={values.username} 
                  onChange={handleChange} 
                  name="username"
                  placeholder="Username" 
                  className="border-1 border-[#F0F3F2] h-10 rounded-5 p-3"/>
            <label className="text-sm font-bold ">Password</label>
            <input name="password" type="password" value={values.password} onChange={handleChange} placeholder="Password" className=" border-1 border-[#F0F3F2] h-10 rounded-5 p-3"/>
            <label className="text-sm font-bold ">Confirm Password</label>
            <input name="confirmPassword" type="password" value={values.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className=" border-1 border-[#F0F3F2] h-10 rounded-5 p-3"/>
            <label className="text-sm font-bold ">First Name</label>
            <input name="firstName" type="text" value={values.firstName} onChange={handleChange} placeholder="First Name" className=" border-1 border-[#F0F3F2] h-10 rounded-5 p-3"/>
            <label className="text-sm font-bold ">Last Name</label>
            <input name="lastName" type="text" value={values.lastName} onChange={handleChange} placeholder="Last Name" className=" border-1 border-[#F0F3F2] h-10 rounded-5 p-3"/>
            
            </div>
            <div className='flex flex-col gap-2'>
            <label className="text-sm font-bold ">Email</label>
            <input name="email" type="text" value={values.email} onChange={handleChange} placeholder="Email" className=" border-1 border-[#F0F3F2] h-10 rounded-5 p-3"/>
            <label className="text-sm font-bold ">Phone Number</label>
            <input name="phoneNumber" type="text" value={values.phoneNumber} onChange={handleChange} placeholder="Phone Number" className=" border-1 border-[#F0F3F2] h-10 rounded-5 p-3"/>
            <label className="text-sm font-bold ">Sex</label>
            <input name="sex" type="text" value={values.sex} onChange={handleChange} placeholder="Sex" className=" border-1 border-[#F0F3F2] h-10 rounded-5 p-3"/>
            <label className="text-sm font-bold ">Date of Birth</label>
            <input name="dob" type="text" value={values.dob} onChange={handleChange} placeholder="Date of Birth" className=" border-1 border-[#F0F3F2] h-10 rounded-5 p-3"/>

            
            </div>
            </div>
            <button type='button' onClick={handleSubmit} className="bg-gray-500 w-full hover:bg-red-600 cursor-pointer text-white  text-md font-bold p-2" value="Sign Up">Sign up</button>

              </div>
            </Form>
            <div className='flex flex-col mt-2 mb-2 gap-2'>

              <Link 
                href={handleGithubLogin()} 
                className='bg-green-500 text-white hover:bg-green-600 cursor-pointer  text-md font-bold p-2 text-center'
              >
               <p className='flex flex-row gap-2 items-center'><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .5a12 12 0 00-3.79 23.39c.6.11.82-.26.82-.58v-2.01c-3.34.73-4.04-1.61-4.04-1.61-.54-1.39-1.32-1.76-1.32-1.76-1.08-.73.08-.71.08-.71 1.2.08 1.83 1.24 1.83 1.24 1.06 1.81 2.78 1.29 3.45.99.11-.77.41-1.29.74-1.58-2.67-.3-5.47-1.33-5.47-5.91 0-1.3.47-2.37 1.24-3.21-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.48 11.48 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.64.24 2.86.12 3.16.77.84 1.23 1.91 1.23 3.21 0 4.6-2.8 5.61-5.48 5.91.42.36.79 1.1.79 2.21v3.28c0 .32.22.7.83.58A12 12 0 0012 .5z"/>
              </svg> Sign in with Github
               </p>   
              </Link>
              <Link 
                href="/login" 
                className='bg-blue-500 text-white cursor-pointer hover:bg-blue-600  text-md font-bold p-2 text-start'
              >
               <p className='flex flex-row gap-2 items-center'><span className="material-icons-outlined">login</span> Login </p>
              </Link>
            </div>
        </div>
    );
};

const SignUpComponent = withFormik({  
  mapPropsToValues: () => ({ username: '', email: '', password: '', confirmPassword: '', firstName: '', lastName: '', phoneNumber: '', sex: '', dob: '' }),
  initialValues: {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    sex: '',
    dob: '',
  },
  validate: (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = 'Required';
    }
    return errors;
  },
  handleSubmit: async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await post('/signup', values);
      resetForm();
      // Use window.location for navigation since router is not accessible here
      window.location.href = '/login';
    } catch (error) {
      console.error('Signup error:', error);
    }
  },
  displayName: 'Credentials',
})(SignupContainer);

export default SignUpComponent;