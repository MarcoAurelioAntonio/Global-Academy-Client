import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import { getCourseById } from '../redux/coursesSlice';
import NavMenu from './NavMenu';
import './courseEditableDetails.css';

const CourseEditDetails = () => {
  const { id } = useParams();
  const { course } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(getCourseById(id));
  }, [dispatch, id]);

  const toggleEdit = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  const cancelEdit = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
    dispatch(getCourseById(id));
  };

  const validateForm = (values) => {
    const errors = {};

    const errorMessages = {
      name: {
        validate: (value) => !value || value.length < 3,
        message: 'Name is required or must be at least 3 characters long',
      },
      start_date: {
        validate: (value) => {
          const startDate = new Date(value);
          return !startDate || startDate < new Date();
        },
        message: 'Start date is required or must be greater than today',
      },
      end_date: {
        validate: (value, values) => {
          const startDate = new Date(values.start_date);
          const endDate = new Date(value);
          return !endDate || endDate < startDate;
        },
        message: 'End date is required or must be greater than start date',
      },
      description: {
        validate: (value) => !value || value.length < 30,
        message: 'Description is required or must be at least 30 characters long',
      },
      course_type: {
        validate: (value) => !value || value.length < 3,
        message: 'Course type is required or must be at least 3 characters long',
      },
      price: {
        validate: (value) => (!value || value < 0) && value !== 0,
        message: 'Price is required or must be a positive number',
      },
      /*
      image: {
        validate: () => imagePicker === null,
        message: 'You must choose an image',
      },
      */
    };

    const validateField = (fieldName, value, values) => {
      const { validate, message } = errorMessages[fieldName];
      return validate(value, values) ? message : null;
    };

    Object.keys(errorMessages).forEach((fieldName) => {
      const errorMessage = validateField(fieldName, values[fieldName], values);
      if (errorMessage) {
        errors[fieldName] = errorMessage;
      }
    });

    return errors;
  };

  const handleSubmit = () => {
    // console.log(values);
    setIsEditing(false);
  };

  return (
    <div className="flex">
      <NavMenu bgColor="green" isHide={false} isBacking={false} />
      <div className="details-editable-container">

        <div className="image-editable-container">
          <img
            className="course-image"
            width="100%"
            src={course.image_url}
            alt={course.title}
          />
        </div>

        <div className="details-information">
          <Formik
            initialValues={course}
            enableReinitialize // this is needed to update the form when the course is loaded
            onSubmit={handleSubmit}
            validate={validateForm}
          >
            <Form>
              <div className="course-name-editable">
                <Field name="name">
                  {({ field }) => (
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className="course-input"
                      disabled={!isEditing}
                    />
                  )}
                </Field>
                <ErrorMessage name="name" component="div" id="name-error" className="form-error" />
              </div>
              <div className="text-end">
                <Field name="description">
                  {({ field }) => (
                    <textarea
                      value={field.value}
                      name="description"
                      id="description"
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className="course-description-editable"
                      disabled={!isEditing}
                    />
                  )}
                </Field>
                <ErrorMessage name="description" component="div" className="form-error" />
              </div>
              <ul className="mt-4">
                <li className="flex justify-between border p-2  bg-slate-300 ">
                  <p>Course type</p>
                  <p className="font-bold">
                    <Field name="course_type">
                      {({ field }) => (
                        <input
                          type="text"
                          name="course_type"
                          id="course_type"
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          className="course-input"
                          disabled={!isEditing}
                        />
                      )}
                    </Field>
                    <ErrorMessage name="course_type" component="div" className="form-error" />
                  </p>
                </li>
                <li className="flex justify-between  p-2 ">
                  <p>Course price</p>
                  <p className="font-bold">
                    <Field name="price">
                      {({ field }) => (
                        <input
                          type="text"
                          name="price"
                          id="price"
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          className="course-input"
                          disabled={!isEditing}
                        />
                      )}
                    </Field>
                    <ErrorMessage name="price" component="div" className="form-error" />
                  </p>
                </li>
                <li className="flex justify-between border p-2  bg-slate-300">
                  <p>Start date</p>
                  <p className="font-bold">
                    <Field name="start_date">
                      {({ field }) => (
                        <input
                          type="date"
                          name="start_date"
                          id="start_date"
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          className="course-input"
                          disabled={!isEditing}
                        />
                      )}
                    </Field>
                    <ErrorMessage name="start_date" component="div" className="form-error" />
                  </p>
                </li>
                <li className="flex justify-between p-2 ">
                  <p>End date</p>
                  <p className="font-bold">
                    <Field name="end_date">
                      {({ field }) => (
                        <input
                          type="date"
                          name="end_date"
                          id="end_date"
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          className="course-input"
                          disabled={!isEditing}
                        />
                      )}
                    </Field>
                    <ErrorMessage name="end_date" component="div" className="form-error" />
                  </p>
                </li>
              </ul>

              {isEditing ? (
                <>
                  <button type="submit" onClick={handleSubmit} className="enroll-btn material-symbols-outlined">Save</button>
                  <button type="button" onClick={cancelEdit} className="enroll-btn material-symbols-outlined">
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={toggleEdit}
                  className="enroll-btn material-symbols-outlined"
                >
                  Edit
                </button>
              )}
              <Link
                className="enroll-btn"
                to="/add-reservation"
                state={course}
              >
                Enroll Course
                <span className="material-symbols-outlined">
                  arrow_circle_right
                </span>
              </Link>
            </Form>
          </Formik>

        </div>
      </div>
    </div>
  );
};

export default CourseEditDetails;
