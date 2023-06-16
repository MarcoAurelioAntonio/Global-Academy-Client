import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import { useNavigate } from 'react-router-dom';
import { postApiCourseForm } from '../redux/coursesSlice';

const AddCourse = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const formError = useSelector((store) => store.courses.error);
  const formStatus = useSelector((store) => store.courses.status);

  if (formStatus === 'succeed') {
    setTimeout(() => history('true'));
  }
  const handleSubmit = (requestForm) => {
    dispatch(postApiCourseForm(requestForm));
  };

  const validateForm = (values) => {
    const errors = {};
    if (!values.name || values.name.length < 3) {
      errors.name = 'Name is required ir must be at least 3 characters long';
    }

    const startDate = new Date(values.start_date);
    if (!startDate || startDate < new Date()) {
      errors.start_date = 'Start date is required or must be greater than today';
    }

    const startDate2 = new Date(values.start_date);
    const endDate = new Date(values.end_date);
    if (!endDate || endDate < startDate2) {
      errors.end_date = 'End date is required or must be greater than start date';
    }
    if (!values.description || values.description.length < 30) {
      errors.description = 'Description is required or must be at least 30 characters long';
    }
    if (!values.course_type || values.course_type.length < 3) {
      errors.course_type = 'Course type is required or must be at least 3 characters long';
    }
    if (!values.price || values.price < 0) {
      errors.price = 'Price is required or must be $00,0.- or a positive number';
    }

    return errors;
  };

  const initialValues = {
    name: '',
    start_date: '',
    end_date: '',
    description: '',
    course_type: '',
    price: '',
  };

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        validate={validateForm}
        initialValues={initialValues}
      >
        <Form>
          <div>
            <label htmlFor="name">
              Name:
              <Field type="text" id="name" name="name" aria-describedby="name-error" />
            </label>
            <ErrorMessage name="name" component="div" id="name-error" />
          </div>

          <div>
            <label htmlFor="start_date">Start Date:</label>
            <Field type="date" id="start_date" name="start_date" />
            <ErrorMessage name="start_date" component="div" />
          </div>

          <div>
            <label htmlFor="end_date">End Date:</label>
            <Field type="date" id="end_date" name="end_date" />
            <ErrorMessage name="end_date" component="div" />
          </div>

          <div>
            <label htmlFor="description">Description:</label>
            <Field as="textarea" id="description" name="description" />
            <ErrorMessage name="description" component="div" />
          </div>

          <div>
            <label htmlFor="course_type">Course Type:</label>
            <Field type="text" id="course_type" name="course_type" />
            <ErrorMessage name="course_type" component="div" />
          </div>

          <div>
            <label htmlFor="price">Price:</label>
            <Field type="number" id="price" name="price" />
            <ErrorMessage name="price" component="div" />
          </div>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
      {formStatus === 'failed' && <p>{formError}</p>}
    </>
  );
};

export default AddCourse;
