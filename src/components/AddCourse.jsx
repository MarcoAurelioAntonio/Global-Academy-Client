import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import { useNavigate } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import { postApiCourseForm } from '../redux/coursesSlice';
import './addCourse.css';

const AddCourse = () => {
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const history = useNavigate();
  const formError = useSelector((store) => store.courses.error);
  const formStatus = useSelector((store) => store.courses.status);

  if (formStatus === 'succeed') {
    setTimeout(() => history('true'), 2000);
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
    // Check how many fields are completed
    const completedFields = Object.values(values).filter((value) => value !== '').length;
    const totalFields = Object.keys(values).length;
    const newProgress = Math.round((completedFields / totalFields) * 100);

    setProgress(newProgress);

    if (completedFields === 0) {
      setProgress(0);
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
    <div className="add-course-form-container">
      <h2 className="add-course-form-title">Add Your Course Here</h2>
      <LinearProgress className="progress-bar" variant="determinate" value={progress} />
      <Formik
        onSubmit={handleSubmit}
        validate={validateForm}
        initialValues={initialValues}
      >
        <Form className="add-course-form">
          <div className="form-field">
            <label htmlFor="name" className="form-label">
              Name:
              <span className="form-label-required">*</span>
              <Field
                type="text"
                id="name"
                name="name"
                aria-describedby="name-error"
                className="form-input"
              />
            </label>
            <ErrorMessage name="name" component="div" id="name-error" className="form-error" />
          </div>

          <div className="form-field">
            <label htmlFor="start_date" className="form-label">
              Start Date:
              <span className="form-label-required">*</span>
            </label>
            <Field
              type="date"
              id="start_date"
              name="start_date"
              className="form-input"
            />
            <ErrorMessage name="start_date" component="div" className="form-error" />
          </div>

          <div className="form-field">
            <label htmlFor="end_date" className="form-label">
              End Date:
              <span className="form-label-required">*</span>
            </label>
            <Field
              type="date"
              id="end_date"
              name="end_date"
              className="form-input"
            />
            <ErrorMessage name="end_date" component="div" className="form-error" />
          </div>

          <div className="form-field">
            <label htmlFor="description" className="form-label">
              Description:
              <span className="form-label-required">*</span>
            </label>
            <Field
              as="textarea"
              id="description"
              name="description"
              className="form-textarea"
            />
            <ErrorMessage name="description" component="div" className="form-error" />
          </div>

          <div className="form-field">
            <label htmlFor="course_type" className="form-label">
              Course Type:
              <span className="form-label-required">*</span>
            </label>
            <Field
              type="text"
              id="course_type"
              name="course_type"
              className="form-input"
            />
            <ErrorMessage name="course_type" component="div" className="form-error" />
          </div>

          <div className="form-field">
            <label htmlFor="price" className="form-label">
              Price:
              <span className="form-label-required">*</span>
            </label>
            <Field
              type="number"
              id="price"
              name="price"
              className="form-input"
            />
            <ErrorMessage name="price" component="div" className="form-error" />
          </div>

          <button type="submit" className="form-submit-button">Submit</button>
          {formStatus === 'failed' && <p className="form-error">{formError}</p>}
        </Form>
      </Formik>
    </div>
  );
};

export default AddCourse;
