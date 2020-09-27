import React from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../store/actions/auth'

const Nav = styled.nav`
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 0.7rem 2rem;
   position: fixed;
   z-index: 1;
   width: 100%;
   top: 0;
   border-bottom: solid 1px teal;
   opacity: 0.9;
   background: #343a40;
   color: #fff;
`

const Ul = styled.ul`
   display: flex;
`

const StyledLink = styled(Link)`
   color: #fff;
   padding: 0.45rem;
   margin: 0 0.25rem;
   &:hover {
      color: teal;
   }
`

const NavBrand = styled(Link)`
   color: #fff;
   padding: 0.45rem;
   margin: 0 0.25rem;
   font-size: 1.5rem;
   font-weight: bold;
   &:hover {
      color: teal;
   }
`

const Button = styled.button`
   background: none;
   border: none;
   line-height: 0.5;
   padding: 0.45rem;
   margin: 0 0.25rem;
   margin-top: -1.5px;
   color: #fff;
   cursor: pointer;
   font-size: 16px;
   font-family: 'Raleway', sans-serif;
   &:hover {
      color: teal;
   }
`

const Span = styled.span`
   margin-right: 0.6rem;
   @media (max-width: 768px) {
      display: none;
   }
`

const Navigation = ({ isAuthenticated, logout }) => {
   const history = useHistory()

   const logoutHandler = () => {
      logout(history)
   }

   const guestLinks = (
      <>
         <li>
            <StyledLink to='/'>
               <i className='fas fa-sign-in-alt' />
               <Span> LOGIN</Span>
            </StyledLink>
         </li>
         <li>
            <StyledLink to='/register'>
               <i className='fas fa-user-plus' />
               <Span> REGISTER</Span>
            </StyledLink>
         </li>
      </>
   )

   const authLinks = (
      <>
         <li>
            <StyledLink to='/settings'>
               <i className='fas fa-cog' />
               <Span> SETTINGS</Span>
            </StyledLink>
         </li>
         <li>
            <Button onClick={logoutHandler}>
               <i className='fas fa-sign-out-alt' />
               <Span> LOGOUT</Span>
            </Button>
         </li>
      </>
   )

   return (
      <Nav>
         <NavBrand to={isAuthenticated ? '/home' : '/'}>POC</NavBrand>
         <Ul>{isAuthenticated ? authLinks : guestLinks}</Ul>
      </Nav>
   )
}

const mapStateToProps = (state) => ({
   isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { logout })(Navigation)
