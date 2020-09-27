import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

const ShowAlert = styled.div`
   padding: 0.8rem;
   margin: 85px 10px -55px 10px;
   opacity: 0.9;
   border-radius: 5px;
   // background: #f8d7da;
   color: #000;
`

const Alert = ({ alerts }) => {
   return (
      alerts !== null &&
      alerts.length > 0 &&
      alerts.map((alert) => (
         <ShowAlert key={alert.id} className={alert.alertType}>
            {alert.msg}
         </ShowAlert>
      ))
   )
}

const mapStateToProps = (state) => ({
   alerts: state.alert,
})

export default connect(mapStateToProps)(Alert)
