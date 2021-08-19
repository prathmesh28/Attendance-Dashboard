import * as React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CModal,
  CCardHeader
} from '@coreui/react'
// import Loader from "react-loader";
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import Firebase from "../config"


class Login extends React.Component {
    state = {
        email:"",
        password:"",
        error:"",
        loaded:false
    }
  
  
  

  trySignIn = () => {
    this.setState({loaded:true})
    Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      console.log(user)
      this.setState({loaded:false})
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('check')
      console.log(errorCode)
      console.log(errorMessage)
      this.setState({loaded:false,password:"",error:errorMessage})


      // ..
    });
  };

 
 render(){

  return (
  
              
        <CContainer fluid
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height:'100vh',
            backgroundColor:"#F5F5F5"
          }}
         
          >
            
          
        <CModal 
              show={this.state.loaded} 
              onClose={() => this.setState({loaded:false})}
              //color="info"
              closeOnBackdrop={false}
              
              style={{height:'80vh',backgroundColor:'transparent',border:0}}
              
            >

           
             
            </CModal>
        <CRow className="justify-content-center" >
          <CCol >
            <CCardGroup >
              <CCard  className="p-4" style={{minWidth:'25vw'}}>
              
                <CCardBody >
                  <CForm >
                    <h1>Login</h1>
                    <CInputGroup className="mb-3" >
                   

                      <CInput type="text" 
                        //value={this.state.email} 
                        onChange={(email)=>this.setState({email:email.target.value})} 
                        placeholder="Enter Email" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                     
           
                      <CInput type="password" 
                      //value={this.state.password} 
                        onChange={(password)=>this.setState({password:password.target.value})} 
                        placeholder="Password" autoComplete="current-password" />
                    </CInputGroup>
                    <div className="error_response">{this.state.error}</div>
                    <CRow>
                    <CCol  >
                      <div class="d-flex justify-content-between">

                      </div>
                        <CButton  className="px-0">Forgot password?</CButton>
                     
                        <CButton
                        style={{backgroundColor:'#424242',color:'#fff'}}
                        onClick={this.trySignIn}
                          className="px-4">Login</CButton>
                      </CCol>
                      
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              </CCardGroup>
              
          </CCol>
        </CRow>
  
      </CContainer>
 
  )
}
}
export default Login