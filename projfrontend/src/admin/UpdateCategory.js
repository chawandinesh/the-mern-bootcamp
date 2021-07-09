import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import {
  createCategory,
  getCategoryById,
  updateCategoryById,
} from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();
  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
        Go back
      </Link>
    </div>
  );

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const preloadCategory = () => {
    console.log(match.params.categoryId, user._id, token);
    getCategoryById(match.params.categoryId).then((res) => {
      setName(res.name);
    });
    //   getCategoryById(match.params.)
  };
  useEffect(() => {
    preloadCategory();
  }, []);

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category updated successfully</h4>;
    }
  };
  const warningMessage = () => {
    if (error) {
      return <h4 className="text-warning">Failed to update category</h4>;
    }
  };
  console.log(name,'naem')
  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    updateCategoryById(token, match.params.categoryId, user._id, {name: name}).then(
      (data) => {
        if (data.error) {
          setError(true);
        } else {
          setError(false);
          setSuccess(true);
          setName("");
        }
      }
    );
    // createCategory(user._id, token, { name }).then((data) => {
    //   if (data.error) {
    //     setError(true);
    //   } else {
    //     setError(false);
    //     setSuccess(true);
    //     setName("");
    //   }
    // });
  };
  const categoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          value={name}
          autoFocus
          required
          placeholder="For Ex. Summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Update category
        </button>
      </div>
    </form>
  );
  return (
    <Base
      title="Update  category"
      description="Welcome to category update section"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {categoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
