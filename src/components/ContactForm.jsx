import React from 'react';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import { useDispatch } from 'react-redux';
import { postContactForm } from '../redux/contactSlice';
import './contactForm.css';

const ContactForm = () => {
  const dispatch = useDispatch();
  const validateForm = (values) => {
    const errors = {};

    // Validations fo all fileds
    if (!values.name) {
      errors.name = 'Required';
    }

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.message) {
      errors.message = 'Required';
    }

    return errors;
  };

  const handleSubmit = (values) => {
    // console.log(values);
    dispatch(postContactForm(values));
  };

  return (
    <div className="contact-container">
      <Formik
        initialValues={{ name: '', email: '', message: '' }}
        validate={validateForm}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-contact-group">
            <label className="input-label" htmlFor="name">Name:</label>
            <Field className="input-in" type="text" id="name" name="name" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>
          <div className="form-contact-group">
            <label className="input-label" htmlFor="email">Email:</label>
            <Field className="input-in" type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className="form-contact-group">
            <label className="input-label" htmlFor="message">Message:</label>
            <Field className="input-in" as="textarea" id="message" name="message" />
            <ErrorMessage name="message" component="div" className="error" />
          </div>
          <button className="contact-button" type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
