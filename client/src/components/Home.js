import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getEmployees } from '../actions/employees'

const Header = styled.h2`
   text-align: center;
   font-weight: bold;
   margin-top: 85px;
   color: teal;
`

const Container = styled.div`
   padding-right: 15px;
   padding-left: 15px;
   margin-right: auto;
   margin-left: auto;
`

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
   max-width: 900px;
   margin-left: auto;
   margin-right: auto;
   margin-top: 50px;
   margin-bottom: 50px;
`

const Hr = styled.hr`
   margin-top: 5px;
   margin-bottom: 10px;
`

const Div = styled.div`
   display: block;
   width: 100%;
   overflow-x: auto;
   margin-top: 35px;
`

const Table = styled.table`
   width: 800px;
   margin-bottom: 1rem;
   color: #212529;
   margin-left: auto;
   margin-right: auto;
   border-collapse: collapse;
   border-spacing: 2px;
`

const Thead = styled.thead`
   display: table-header-group;
   vertical-align: middle;
   border-color: inherit;
`

const Tr = styled.tr`
   display: table-row;
   vertical-align: inherit;
   border-color: inherit;
`

const Tr2 = styled.tr`
   display: table-row;
   vertical-align: inherit;
   border-color: inherit;

   &:nth-of-type(odd) {
      background-color: rgba(0, 0, 0, 0.05);
   }

   &:hover {
      background-color: #ddd;
   }
`

const Td = styled.td`
   border: 1px solid #ddd;
   padding: 8px;
   display: table-cell;
`

const Th = styled.th`
   vertical-align: bottom;
   border-bottom: 2px solid #dee2e6;
   padding: 0.75rem;
   border-top: 1px solid #dee2e6;
   text-align: inherit;
   display: table-cell;
   font-weight: bold;
`

const Tbody = styled.tbody`
   display: table-row-group;
   vertical-align: middle;
   border-color: inherit;
`

const Nav = styled.div`
   display: flex;
   justify-content: center;
   margin-bottom: 10px;
`

const Li = styled.button`
   color: black;
   float: left;
   padding: 8px 16px;
   text-decoration: none;

   &:hover {
      background-color: teal;
      color: white;
      cursor: pointer;
   }
`

const Span = styled.span`
   margin-left: 5px;
   margin-right: 5px;
   display: flex;
   align-items: center;
`

const Div2 = styled.div`
   display: flex;
`

const Select = styled.select`
   width: 100px;
   margin-left: 5px;
`

const Search = styled.input`
   margin: 20px 20px -15px auto;
   width: 250px;
   display: block;
   height: calc(1.5em + 0.75rem + 2px);
   padding: 0.375rem 0.75rem;
   font-size: 1rem;
   font-weight: 400;
   line-height: 1.5;
   color: #495057;
   background-color: #fff;
   background-clip: padding-box;
   border: 1px solid teal;
   border-radius: 0.25rem;

   @media (max-width: 500px) {
      width: 150px;
   }

   @media (max-width: 350px) {
      width: 120px;
   }

   @media (max-width: 300px) {
      width: 100px;
   }
`

const Home = ({ getEmployees, employees, pageCount }) => {
   const [currentPage, setCurrentPage] = useState(1)
   const [skipCount, setSkipCount] = useState(0)
   const [filterValue, setFilterValue] = useState('All')
   const [search, setSearch] = useState('')

   useEffect(() => {
      getEmployees(skipCount, filterValue, search)
   }, [getEmployees, skipCount, filterValue, search])

   const decreasePageCount = () => {
      if (currentPage > 1) {
         setCurrentPage(currentPage - 1)
         setSkipCount((currentPage - 2) * 5)
      }
   }

   const increasePageCount = () => {
      if (currentPage < pageCount) {
         setCurrentPage(currentPage + 1)
         setSkipCount(currentPage * 5)
      }
   }

   const onChange = (e) => {
      setFilterValue(e.target.value)
      setSkipCount(0)
      setCurrentPage(1)
   }

   const onSearchChange = (e) => {
      setSearch(e.target.value)
      setSkipCount(0)
      setCurrentPage(1)
   }

   return (
      <Container>
         <Header>EMPLOYEES</Header>
         <Hr />
         <Card>
            <Search
               type='text'
               placeholder='Search'
               value={search}
               onChange={onSearchChange}
            />
            <Div>
               <Table>
                  <Thead>
                     <Tr>
                        <Th>Employee ID</Th>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Gender</Th>
                        <Th>
                           <Div2>
                              Designation
                              <form>
                                 <Select
                                    value={filterValue}
                                    onChange={onChange}
                                 >
                                    <option value='All'>All</option>
                                    <option value='Software Developer'>
                                       Software Developer
                                    </option>
                                    <option value='Senior Software Developer'>
                                       Senior Software Developer
                                    </option>
                                    <option value='Team Lead'>Team Lead</option>
                                    <option value='Manager'>Manager</option>
                                    <option value='Senior Manager'>
                                       Senior Manager
                                    </option>
                                 </Select>
                              </form>
                           </Div2>
                        </Th>
                     </Tr>
                  </Thead>
                  <Tbody>
                     {employees.map((employee) => (
                        <Tr2 key={employee.empId}>
                           <Td>{employee.empId}</Td>
                           <Td>{employee.name}</Td>
                           <Td>{employee.email}</Td>
                           <Td>{employee.gender}</Td>
                           <Td>{employee.designation}</Td>
                        </Tr2>
                     ))}
                  </Tbody>
               </Table>
            </Div>
            <Nav>
               <Li onClick={decreasePageCount}>&laquo;</Li>
               <Span>
                  {currentPage} / {pageCount}
               </Span>
               <Li onClick={increasePageCount}>&raquo;</Li>
            </Nav>
         </Card>
      </Container>
   )
}

const mapStateToProps = (state) => ({
   employees: state.employees.employees,
   pageCount: state.employees.pageCount,
})

export default connect(mapStateToProps, { getEmployees })(Home)
