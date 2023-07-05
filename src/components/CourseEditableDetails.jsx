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
    <div className="flex flex-col md:flex-row justify-between my-16 h-screen gap-12 px-10">
      <NavMenu bgColor="" isHide isBacking />
      <div className="flex flex-col justify-start items-start w-full">
        <div className="flex flex-col items-center justify-center md:flex-row flex-shrink gap-12 w-full md:items-start">
          <div className="flex flex-col w-1/2 ml-8">
            <img
              className="course-image"
              width="100%"
              height="50%"
              src={course.image_url}
              alt={course.title}
            />
          </div>

          <div className="w-full px-5 flex flex-col md:w-1/2">
            <Formik
              initialValues={course}
              onSubmit={handleSubmit}
              validate={validateForm}
              enableReinitialize
            >
              <Form>
                <div className="text-4xl text-end">
                  <Field name="name">
                    {({ field }) => (
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        className="text-end"
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
                        className="text-end"
                        disabled={!isEditing}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="description" component="div" className="form-error" />
                </div>
                <ul className="mt-4">
                  <li className="flex justify-between border p-3  bg-slate-300 ">
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
                            disabled={!isEditing}
                          />
                        )}
                      </Field>
                      <ErrorMessage name="course_type" component="div" className="form-error" />
                    </p>
                  </li>
                  <li className="flex justify-between  p-3 ">
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
                            disabled={!isEditing}
                          />
                        )}
                      </Field>
                      <ErrorMessage name="price" component="div" className="form-error" />
                    </p>
                  </li>
                  <li className="flex justify-between border p-3  bg-slate-300">
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
                            disabled={!isEditing}
                          />
                        )}
                      </Field>
                      <ErrorMessage name="start_date" component="div" className="form-error" />
                    </p>
                  </li>
                  <li className="flex justify-between p-3 ">
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
                    <button type="submit" onClick={handleSubmit}>Guardar</button>
                    <button type="button" onClick={cancelEdit}>
                      Cancelar
                    </button>
                  </>
                ) : (
                  <button type="button" onClick={toggleEdit}>
                    Editar
                  </button>
                )}
              </Form>
            </Formik>

          </div>
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
        </div>
      </div>
    </div>
  );
};

export default CourseEditDetails;
