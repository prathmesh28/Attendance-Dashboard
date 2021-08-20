import * as React from "react";
import Login from "./Pages/Login"
import Dashboard from "./Pages/Dashboard"
import Firebase from "./config";

class Home extends React.Component {
    state = {
        signedIn:false,
        loading:false
    }
    componentDidMount(){
      this.setState({loading:true})
      Firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ signedIn:true })
             
              var uid = user.uid;
            //  console.log(uid)
              setTimeout(() => {
                this.setState({
                  loading: false,
                });
              }, 2500);

            } else {
                this.setState({ signedIn:false })

              console.log('not signed in')
              setTimeout(() => {
                this.setState({
                  loading: false,
                });
              }, 2500);
             
            }
          });
    }
    render(){
      if(this.state.loading)
        return <div style={{width:'100vw',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'#F5F5F5',fontSize:30}}>
          Just a moment...
        </div>
      else
        return this.state.signedIn?<Dashboard Firebase={Firebase}/>:<Login/>
   
    }
  }
  export default Home