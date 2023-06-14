import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import { postApiCourseForm } from '../redux/coursesSlice';

const NewCourseForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(postApiCourseForm(values))
      .then((response) => {
        console.log(response.payload);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const validateForm = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Name is required';
    }
    if (!values.start_date) {
      errors.start_date = 'Start date is required';
    }
    if (!values.end_date) {
      errors.end_date = 'End date is required';
    }
    if (!values.description) {
      errors.description = 'Description is required';
    }
    if (!values.course_type) {
      errors.course_type = 'Course type is required';
    }
    if (!values.price) {
      errors.price = 'Price is required';
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
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={validateForm}
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
  );
};

export default NewCourseForm;
