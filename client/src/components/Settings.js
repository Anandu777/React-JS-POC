import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Header = styled.h2`
   text-align: center;
   font-weight: bold;
   margin-top: 85px;
   color: teal;
`

const StyledLink = styled(Link)`
   font-weight: 400;
   text-align: center;
   vertical-align: middle;
   user-select: none;
   border: 1px solid transparent;
   padding: 0.375rem 0.75rem;
   font-size: 1rem;
   line-height: 1.5;
   border-radius: 0.25rem;
   transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

   color: #fff;
   background-color: teal;
   border-color: teal;

   &:hover {
      cursor: pointer;
      background-color: #008b8b;
   }
`

const Container = styled.div`
   padding-right: 15px;
   padding-left: 15px;
   margin-right: auto;
   margin-left: auto;
`

const Hr = styled.hr`
   margin-top: 5px;
   margin-bottom: 10px;
`

const Settings = () => {
   return (
      <Container>
         <Header>SETTINGS</Header>
         <Hr />
         <StyledLink to='/change-password'>Change Password</StyledLink>
      </Container>
   )
}

export default Settings
