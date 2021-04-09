import {React,Component} from 'react'

class User extends Component{
    render(){
         const {user} =this.props
         console.log(this.props,'props')
         return(
             <div>
                <div>姓名:{user.username}</div>
                {/* <div>姓名:{user.username}</div> */}
             </div>
         )
     }
     
    }
export default User