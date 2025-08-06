"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Rating,
  Select,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import toast from "react-hot-toast";

const AddProducts = () => {
  const [main_Category, setmain_Category] = useState([]);
  const [sub_Category, setsub_Category] = useState([]);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch("http://localhost:8000/admin/addproduct");

        if (!response.ok) {
          throw new Error("Server error");
        }

        const data = await response.json();
        setsub_Category(data.subCategory);
        setmain_Category(data.mainCategory);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchCategory();
  }, []);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleAddProduct = async (values) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      };
      const response = await fetch(
        "http://localhost:8000/admin/addproduct",
        requestOptions
      );
      const res = await response.json();
      toast.success(res.msg);
    } catch (err) {
      toast.error(err);
    }
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      discount_price: "",
      actual_price: "",
      no_of_ratings: "",
      image: "",
      main_category: "",
      sub_category: "",
      description: "",
      rating: "",
      quantity: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      // handleAddProduct(values)
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="bg-blue-100 p-6 shadow-lg rounded-xl m-2 flex flex-col gap-6">
        <div>
          <label htmlFor="productName">Product Name :</label>
          <Input
            id="productName"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </div>
        <div>
          <label htmlFor="description">Description :</label>
          <Input
            id="description"
            name="description"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        </div>

        <div>
          {" "}
          <label htmlFor="rating">Rating :</label>
          <Rating
            name="rating"
            precision={0.5}
            onChange={(event, newValue) => {
              formik.setFieldValue("rating", newValue);
            }}
          />
        </div>
        <div>
          <InputLabel id="demo-simple-select-label">Main Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="MainCategory"
            onChange={formik.handleChange}
            value={formik.values.main_category}
            className="w-[20%]"
            name="main_category"
          >
            {main_Category.map((item, key) => {
              return (
                <MenuItem key={key} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <div>
          <InputLabel id="demo-simple-select-label">Sub Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Category"
            onChange={formik.handleChange}
            value={formik.values.sub_category}
            className="w-[20%]"
            name="sub_category"
          >
            {sub_Category.map((item, key) => {
              return (
                <MenuItem key={key} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <div>
          <label htmlFor="actual_price">Actual Price :</label>
          <Input
            id="actual_price"
            name="actual_price"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.actual_price}
          />
        </div>
        <div>
          <label htmlFor="discount_price">Discount Price :</label>
          <Input
            id="discount_price"
            name="discount_price"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.discount_price}
          />
        </div>
        <div>
          <label htmlFor="no_of_ratings"> No of Ratings :</label>
          <Input
            id="no_of_ratings"
            name="no_of_ratings"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.no_of_ratings}
          />
        </div>
        <div>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload files
            <VisuallyHiddenInput
              type="file"
              name="fileName"
              onChange={(event) =>
                formik.setFieldValue.fileName(event.target.files)
              }
              multiple
            />
          </Button>
        </div>
        <div>
          <label htmlFor="quantity">Quantity :</label>
          <Input
            id="quantity"
            name="quantity"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.quantity}
          />
        </div>

        <Button type="submit" variant="contained">
          Add Product
        </Button>
      </div>
    </form>
  );
};
export default AddProducts;
