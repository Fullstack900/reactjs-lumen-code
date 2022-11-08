import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import states from '../data/states.json'
import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import Alert from 'react-bootstrap/Alert';


const CustomToggle = React.forwardRef<React.ReactNode>(({ children, onClick }: any, ref: any) => (
  <a
    href="#"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}

  >
    {children}
    &#x25bc;
  </a>
));

const CustomMenu = React.forwardRef<React.ReactNode>(
  ({ children, style, className, 'aria-labelledby': labeledBy }: any, ref: any) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child: any) =>
              !value || child.props.children.toLowerCase().startsWith(value),
          )}
        </ul>
      </div>
    );
  },
);

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required(),
  zip: yup.string().required(),
  state: yup.string().required(),
});

export default function Content() {
  const [usstate, setUsstate] = useState('');
  const [response, setResponse] = useState('');

  return (

    <Formik
      validationSchema={schema}
      onSubmit={async (values) => (

        await fetch("http://backend/users", {

          // Adding method type
          method: "POST",

          // Adding body or contents to send
          body: JSON.stringify({
            "first_name": values.firstName,
            "last_name": values.lastName,
            "email": values.email,
            "zip_code": values.zip,
            "us_state": values.state
          }),

          // Adding headers to the request
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })

          // Converting to JSON
          .then(response => response.json())

          // Displaying results to console
          .then(json => (
            setResponse(json.message)
          ))

      )
      }
      validate={values => {
        values.state = usstate;

        const errors: any = {};

        // First Name
        if (
          !/^[a-zA-Z]+$/i.test(values.firstName)
        ) {
          errors.firstName = 'Invalid email address';
        }

        // Last Name
        if (
          !/^[a-zA-Z'-]+$/i.test(values.lastName)
        ) {
          errors.lastName = 'Invalid email address';
        }

        // Email
        if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }

        return errors;
      }}
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        zip: '',
        state: ''
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form className="my-4 pb-3" noValidate onSubmit={handleSubmit}>

          {/* First name – characters only */}
          <Form.Group as={Row}
            controlId="validationFormik101"
            className="mb-3 position-relative"
          >
            <Form.Label column sm={2}>
              First Name:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Enter your last name."
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                isValid={touched.firstName && !errors.firstName}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                First Name is a required field and should be characters only.
              </Form.Control.Feedback>
            </Col>

          </Form.Group>

          {/* Last name – characters, hyphens and apostrophes only */}
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Last Name:
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Enter your last name."
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                isValid={touched.lastName && !errors.lastName}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                Last Name is a required field and should be characters, hyphens and apostrophes only.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Email – valid email addresses */}
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Email:
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="email" placeholder="Enter your email address."
                name="email"
                value={values.email}
                onChange={handleChange}
                isValid={touched.email && !errors.email}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                Valid Email Address is required.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Zip code – US zip validation */}
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Zip Code:
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Enter your zip code."
                name="zip"
                value={values.zip}
                onChange={handleChange}
                isValid={touched.zip && !errors.zip}
                isInvalid={!!errors.zip}
              />
              <Form.Control.Feedback type="invalid">
                Valid US Zip is required.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* US States – a drop down list of states */}
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              US State:
            </Form.Label>
            <Col sm={10}>

              <Dropdown>
                <Dropdown.Toggle variant="dark" as={CustomToggle} id="dropdown-basic">
                  {usstate || 'Select US State'}
                </Dropdown.Toggle>

                <Dropdown.Menu as={CustomMenu}

                >
                  {
                    states.map((state, idx) =>
                      <Dropdown.Item
                        key={idx}
                        // eventKey="{state.key}"
                        onClick={() => (setUsstate(state.name))}
                        onChange={handleChange}
                      >{state.name}</Dropdown.Item>
                    )
                  }
                </Dropdown.Menu>
              </Dropdown>

            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit">Submit Form</Button>
            </Col>
          </Form.Group>

          {
            response && typeof response == 'string' &&
            <Row className='primary'>
              <Col>
                <Alert key='success' variant='success'>
                  {response}
                </Alert>
              </Col>
            </Row>
          }

          {
            response && typeof response == 'object' &&
            <Row className='danger'>
              <Col>
                <Alert key='danger' variant='danger'>
                  Error Occurred, Try Again.
                </Alert>
              </Col>
            </Row>
          }

        </Form>

      )}


    </Formik >
  )
}

