'use client'
import React  from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { Button, CircularProgress } from '@mui/material'
 import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { setisLoggedIn, setUserDetails } from '@/redux/reducerSlices/userSlice';
import { Email } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
const LoginSchema = Yup.object().shape({
   email: Yup.string()
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
  const router=useRouter()
  
 const loginUser = async (values) => {
    const otherparameters= {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    }
    const response=await fetch("http://localhost:8000/login", otherparameters);
    const data = await response.json();
    if(response.status==200) {
      dispatch(
        setUserDetails(data)
      )
      dispatch(setisLoggedIn())
      toast.success(data.msg)
      setTimeout(() => {
       if(data.user.role=='admin'){
        router.push('/admin')
      }
      else{router.push('/')}  // Log the data received from response
  }, 0);
   
    }
    else{ 
       toast.error(data.msg);
    }
  };
  
  return (
    
    <div className='flex flex-col items-center justify-center min-h-screenspace-y-4 my-[15%] md:my-[4%] border-blue-400 rounded-3xl'>
      <div>
        <p className='text-blue-600 text-3xl font-bold font-serif text-center my-[10%]'>
         Login Page
        </p>
      </div>
       <Formik
       initialValues={{
         email: '',
         password: '',
       }}
       validationSchema={LoginSchema}
       onSubmit={values => {
         // same shape as initial values
         loginUser(values)
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
          label="Email"
          variant="filled"
          name="email"
         
        />
        <div className='text-sm text-red-400'>{errors.email}</div>
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
        <Button variant="contained" type='submit'  >
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
