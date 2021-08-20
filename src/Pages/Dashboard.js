import * as React from "react";
import {
    CButton,
    CCol,
    CForm,
    CInput,
    CModal,
    CDataTable,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CFormGroup,
    CLabel,
    CFormText
  } from '@coreui/react'
import Firebase from "../config";
import _ from 'lodash';

class Dashboard extends React.Component {

  state={
      data:null,
      form:false,
      name:'',
      email:'',
      error:'',
      thisDay:new Date().toISOString().substr(0,10),
      loading:false
  }

  async componentDidMount(){
    this.setState({loading:true})
    await Firebase.database()
      .ref("UsersList/" )
      .on("value", (snapshot) => {
        const users = _.map( snapshot.val(), (e) => {
            return e 
          })
          
          this.setState({ data:users})
          setTimeout(() => {
            this.setState({loading:false})
        }, 1500) 
      })
     
  }

    dateChange=(e)=>{
        this.setState({ thisDay:e.target.value })
       
    }

    logOut
    UserSignUP=()=>{
      // this.setState({loading:true})
        console.log('check')
        var email = this.state.email
        var name = this.state.name
        Firebase.auth().createUserWithEmailAndPassword(this.state.email, '123456')
        .then(async(userCredentials) => { 
            Firebase.database().ref('UsersList/'+userCredentials.user.uid).set({ name, email })
            this.setState({error:'',name:'',form:false})
        })
        .catch(error => {
            console.log(error.message)
            this.setState({error: error.message})
        })

    }

    render() {
      var thisDay = this.state.thisDay
       
          const fields = [
            'name',
            {
               key: 'sessionOne',
               label: '9am - 12pm',
               filter: false
            },
            {
                key: 'sessionTwo',
                label: '1pm - 2pm',
                filter: false
             },
             {
                key: 'sessionThree',
                label: '2pm - 5pm',
                filter: false
             }
          ]
        
       
// if(this.state.loading)
// return<div style={{width:'100vw',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'#F5F5F5',fontSize:30}}>
// Just a moment...
// </div>
//         else 
        return(
            <div style={{justifyContent:'center',backgroundColor:"#F5F5F5",minHeight:'100vh'}}>
                <div style={{backgroundColor:"#171717",height:'30vh',color:'#fff',fontSize:80,display:'flex',justifyContent:"center",alignItems:"center"}}>
                    Dashboard
                    <CButton style={{backgroundColor:'#FAFAFA',color:'#000',borderRadius:50,textAlign:'center',position:'absolute',right:10,top:10}} 
                    onClick={() => { Firebase.auth().signOut();}} 
                    size="md">LogOut</CButton>
                </div>
                <div style={{display:'flex',flexDirection:'row', justifyContent:'end',alignItems:"center"}}>
                
               
</div>
               
                <div style={{margin:'5vw',backgroundColor:'#E0E0E0',padding:10}}>
                    <div style={{display:'flex',alignContent:'center',flexDirection:'row',fontSize:18,justifyContent:'space-between',padding:10}}>

                    <CButton style={{backgroundColor:'#424242',color:'#fff'}}
                    onClick={() => this.setState({ form:true, error:'', name:'' })} 
                    size="lg">Add new Staff</CButton>

              <CButton style={{backgroundColor:'#424242',color:'#fff'}} 
                    onClick={() => this.setState({ form:true, error:'', name:'' })} 
                    size="lg">View/Edit Staff</CButton>

                <CInput defaultValue={this.state.thisDay} 
                    onChange={e => this.dateChange(e)} 
                    type="date" id="Dob date-input" name="date-input" 
                    style={{width:300}}
                    required/>
                   

                    

                  


                    </div>
                <CDataTable
      items={this.state.data}
      fields={fields}
    
       hover
       sorter
       loading={this.state.loading}
    

    scopedSlots = {{
            'sessionOne':
              (item)=>(
                <td>

                    { 
                   (item.sessions && item.sessions[thisDay])?(item.sessions[thisDay].one!==undefined?new Date(item.sessions[thisDay].one.tempDate).toLocaleTimeString():'-'):'-'
               
                     }

                </td>
              ),
              'sessionTwo':
              (item)=>(
                <td>

                    { 
                    (item.sessions && item.sessions[thisDay])?(item.sessions[thisDay].two!==undefined?new Date(item.sessions[thisDay].two.tempDate).toLocaleTimeString():'-'):'-'
               
                     }

                </td>
              ),
              'sessionThree':
              (item)=>(
                <td>

                    { 
                    
                    (item.sessions && item.sessions[thisDay])?(item.sessions[thisDay].three!==undefined?new Date(item.sessions[thisDay].three.tempDate).toLocaleTimeString():'-'):'-'
                    
                     }

                </td>
              )
    }}

    
    />


        <CModal 
              show={this.state.form} 
              onClose={() => this.setState({form:false})}
              color="info"
              closeOnBackdrop={false}
            >
              <CModalHeader closeButton>
                <CModalTitle> User Form</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CForm className="form-horizontal">

              <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="name">Full name:</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="name" name="text-input" defaultValue={this.state.name} onChange={e => {this.setState({ name:e.target.value,error:'' })}} placeholder="Enter Full Name" required/>
                  </CCol>
                </CFormGroup>
                <br/>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="name">Email:</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="name" name="text-input" defaultValue={this.state.email} onChange={e => this.setState({ email:e.target.value,error:'' })} placeholder="Enter email" required/>
                  </CCol>
                  <CFormText>{this.state.error}</CFormText>
                </CFormGroup>

                <CFormGroup row>
                 <CFormText>Default password is <b>123456</b></CFormText>
                 
                </CFormGroup>

                 

              </CForm>


              </CModalBody>
              <CModalFooter>
                        <CButton style={{backgroundColor:'#424242',color:'#fff'}}  onClick={this.UserSignUP} className="px-4">Add User</CButton>
                {/* <CButton color="secondary" onClick={() => this.setState({form:false})}>Cancel</CButton> */}
              </CModalFooter>
            </CModal>
    </div>
            </div>
        )
    }
}
export default Dashboard