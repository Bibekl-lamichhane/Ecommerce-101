"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import { Button, CircularProgress } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  phoneNumber: Yup.string()
    .min(9, "Invalid Phone Number")
    .max(18, "Invalid Phone Number")
    .required("Required"),
  fullName: Yup.string()
    .min(3, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(4, "Too Short!")
    .max(25, "Too Long!")
    .required("Required"),
  role: Yup.string().required("A radio option is required"),
});

const Page = () => {
  const router=useRouter()
  const[isLoading,setIsLoading]=React.useState(false)
  const [value, setValue] = React.useState("female");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const registerUser = async (values) => {
    const otherparameters= {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    }
    const response=await fetch("http://localhost:8000/register", otherparameters);
    const data = await response.json();
    if(response.status==200) {
      toast.success(data.msg);
      setIsLoading(!isLoading)
      router.push('/login')
      
    }
    else{ 
       toast.error(data.msg);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screenspace-y-4 my-[15%] md:my-[4%] border-blue-400 rounded-3xl">
      <div>
        <p className="text-blue-600  text-3xl font-bold font-serif text-center my-[10%]">
          Register Now
        </p>
      </div>
      <Formik
        initialValues={{
          email: "",
          phoneNumber: "",
          fullName: "",
          password: "",
          role: "user",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same shape as initial values
          registerUser(values);
        }}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form method="POST">
            <Box
              sx={{ "& .MuiTextField-root": { m: 1, width: "35ch" } }}
              className="flex flex-col items-center space-y-4"
            >
              <Field
                as={TextField}
                name="email"
                label="Email"
                type="text"
                variant="filled"
              />
              {errors.email && touched.email ? (
                <div className="text-red-500 text-sm">{errors.email}</div>
              ) : null}
              <Field
                as={TextField}
                name="fullName"
                label="Full Name"
                type="text"
                variant="filled"
              />
              {errors.fullName && touched.fullName ? (
                <div className="text-red-500 text-sm">{errors.fullName}</div>
              ) : null}
              <Field
                as={TextField}
                name="phoneNumber"
                label="Phone Number"
                type="text"
                variant="filled"
              />
              {errors.phoneNumber && touched.phoneNumber ? (
                <div className="text-red-500 text-sm">{errors.phoneNumber}</div>
              ) : null}
              <Field
                as={TextField}
                name="password"
                label="Password"
                type="password"
                variant="filled"
              />
              {errors.password && touched.password ? (
                <div className="text-red-500 text-sm">{errors.password}</div>
              ) : null}
              <div>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="role"
                    value={values.role}
                    onChange={(e) => {
                      setFieldValue("role", e.target.value); // update Formik value
                      setValue(e.target.value); // update local state
                    }}
                  >
                    <FormControlLabel
                      value="user"
                      control={<Radio />}
                      label="User"
                    />
                    <FormControlLabel
                      value="admin"
                      control={<Radio />}
                      label="Admin"
                    />
                  </RadioGroup>
                  {errors.role && touched.role && (
                    <div className="text-red-500 text-sm">{errors.role}</div>
                  )}
                </FormControl>
              </div>
              <div className="text-sm flex ">
                <p>Already have and account yet?</p>
                <Link href="/login">
                  <p className="mx-2">Login</p>
                </Link>
              </div>
              <Button variant="contained" type="submit">
                Register
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      <div className={`${isLoading==false ? 'hidden' : 'block'}`}><CircularProgress/></div>
      
    </div>
  );
};

export default Page;
