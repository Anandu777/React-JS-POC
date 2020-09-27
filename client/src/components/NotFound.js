import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
   padding-right: 15px;
   padding-left: 15px;
   margin-right: auto;
   margin-left: auto;
   margin-top: 85px;
`

const H2 = styled.h2`
   color: teal;
`

const NotFound = () => (
   <Container>
      <H2>404 Page Not Found</H2>
   </Container>
)

export default NotFound
