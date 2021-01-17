import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useHistory, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAlert } from '../actions/alert'
import { login } from '../actions/auth'

const Card = styled.div`
   position: relative;
   display: flex;
   flex-direction: column;
   min-width: 0;
   word-wrap: break-word;
   background-color: #fff;
   background-clip: border-box;
   border: 1px solid rgba(0, 0, 0, 0.125);
   border-radius: 0.25rem;
   max-width: 400px;
   margin-left: auto;
   margin-right: auto;
   margin-top: 150px;
   margin-bottom: 50px;

   @media (max-width: 500px) {
      max-width: 320px;
   }

   @media (max-width: 350px) {
      max-width: 300px;
   }

   @media (max-width: 300px) {
      max-width: 250px;
   }
`

const CardHeader = styled.div`
   padding: 0.75rem 1.25rem;
   margin-bottom: 0;
   background-color: rgba(0, 0, 0, 0.03);
   border-bottom: 1px solid rgba(0, 0, 0, 0.125);
   color: teal;
   text-align: center;
   font-weight: bold;
   font-size: 30px;
`

const CardBody = styled.div`
   flex: 1 1 auto;
   min-height: 1px;
   padding: 1.25rem;
`

const CardFooter = styled.div`
   padding: 0.75rem 1.25rem;
   background-color: rgba(0, 0, 0, 0.03);
   border-top: 1px solid rgba(0, 0, 0, 0.125);
   color: #6c757d;
   text-align: center;
`

const FormGroup = styled.div`
   margin-bottom: 1rem;
`

const FormControl = styled.input`
   display: block;
   width: 100%;
   height: calc(1.5em + 0.75rem + 2px);
   padding: 0.375rem 0.75rem;
   font-size: 1rem;
   font-weight: 400;
   line-height: 1.5;
   color: #495057;
   background-color: #fff;
   background-clip: padding-box;
   border: 1px solid #ced4da;
   border-radius: 0.25rem;
`
const Button = styled.button`
   font-weight: 400;
   text-align: center;
   vertical-align: middle;
   // user-select: none;
   border: 1px solid transparent;
   padding: 0.375rem 0.75rem;
   font-size: 1rem;
   line-height: 1.5;
   border-radius: 0.25rem;
   transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
   display: block;
   width: 100%;
   color: #fff;
   background-color: teal;
   border-color: teal;

   &:hover {
      cursor: pointer;
      background-color: #008b8b;
   }
`

const StyledLink = styled(Link)`
   font-weight: 400;
   text-align: center;
   vertical-align: middle;
   // user-select: none;
   border: 1px solid transparent;
   padding: 0.375rem 0.75rem;
   font-size: 1rem;
   line-height: 1.5;
   border-radius: 0.25rem;
   transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

   color: teal;
   border-color: teal;

   &:hover {
      color: #fff;
      background-color: teal;
   }
`

const Login = ({ isAuthenticated, setAlert, login }) => {
   const history = useHistory()

   const [formData, setFormData] = useState({
      email: '',
      password: '',
   })

   const [err, setErr] = useState({
      emailErr: '',
      passwordErr: '',
   })

   const { email, password } = formData

   const validEmailRegex = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)

   const validateForm = (errors) => {
      let valid = true
      Object.values(errors).forEach((val) => val.length > 0 && (valid = false))
      return valid
   }

   const onChange = (e) => {
      let errors = err
      const { name, value } = e.target

      switch (name) {
         case 'email':
            errors.emailErr = validEmailRegex.test(value)
               ? ''
               : 'Email is not valid!'
            break
         case 'password':
            errors.passwordErr =
               value.length < 6 ? 'Password must be 6 characters long!' : ''
            break
         default:
            break
      }
      setFormData({ ...formData, [name]: value })

      setErr({ ...errors, errors })
   }

   const onSubmit = (e) => {
      e.preventDefault()

      if (email === '' || password === '') {
         setAlert('Fields cannot be empty!', 'danger')
         return
      }

      if (validateForm(err)) {
         login({ email, password }, history)
      } else {
         setAlert('Invalid Credentials!', 'danger')
      }
   }

   if (isAuthenticated) {
      return <Redirect to='/home' />
   }

   return (
      <Card>
         <CardHeader>LOGIN</CardHeader>
         <CardBody>
            <form onSubmit={(e) => onSubmit(e)}>
               <FormGroup>
                  <FormControl
                     type='text'
                     placeholder='Enter your email'
                     name='email'
                     value={email}
                     onChange={(e) => onChange(e)}
                  />
               </FormGroup>
               <FormGroup>
                  <FormControl
                     type='password'
                     placeholder='Enter your password'
                     name='password'
                     value={password}
                     onChange={(e) => onChange(e)}
                  />
               </FormGroup>
               <Button type='submit'>Login</Button>
            </form>
         </CardBody>
         <CardFooter>
            Don't have an account?&nbsp;
            <StyledLink to='/register'>Register</StyledLink>
         </CardFooter>
      </Card>
   )
}

const mapStateToProps = (state) => ({
   isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { login, setAlert })(Login)
