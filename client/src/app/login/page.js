'use client'
import React  from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { Button } from '@mui/material'
 import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { setisLoggedIn } from '@/redux/reducerSlices/userSlice';

const SignupSchema = Yup.object().shape({
   username: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
   password: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
 });
 
const Page = () => {
  const dispatch=useDispatch()
  return (
    
    <div className='flex flex-col items-center justify-center min-h-screenspace-y-4 my-[15%] md:my-[4%] border-blue-400 rounded-3xl'>
      <div>
        <p className='text-blue-600 text-3xl font-bold font-serif text-center my-[10%]'>
         Login Page
        </p>
      </div>
       <Formik
       initialValues={{
         username: '',
         password: '',
       }}
       validationSchema={SignupSchema}
       onSubmit={values => {
         // same shape as initial values
         console.log(values);
       }}
     >
       {({ errors, touched }) => (
    <Form method='POST'>
      <Box
        sx={{ '& .MuiTextField-root': { m: 1, width: '35ch' } }}
        noValidate
        autoComplete="off"
        className='flex flex-col items-center space-y-4 rounded-3xl'
      >
        <Field 
          as={TextField}
          id="filled-required"
          label="Username"
          variant="filled"
          name="username"
         
        />
        <div className='text-sm text-red-400'>{errors.username}</div>
        <Field
          as={TextField}
          id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
          name="password"
          
        />
      <div className='text-sm text-red-400'>{errors.password}</div>
        <div className='text-sm flex '><p>Don't have and account yet?</p><Link href="/register"><p className='mx-2'>Sign up?</p></Link></div>
        <Button variant="contained" type='submit' onClick={()=>dispatch(setisLoggedIn())} >
  Login
</Button>
      </Box>
    </Form>
       )}
    </Formik>
    </div>
  );
}

export default Page;
