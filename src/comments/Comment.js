import React,{Component} from 'react';
class Comment extends Component{
   constructor(){
       super()
       this.state={
           timeString:""
       }
   }
//    _updateTimeString(){
//        const comment=this.props.comment
//        const duration=(+new Date()-comment.createdTime)/1000

//    }
   render(){
    // const comments = [
    //     {username: 'Jerry', content: 'Hello'},
    //     {username: 'Tomy', content: 'World'},
    //     {username: 'Lucy', content: 'Good'}
    //   ]
       return(
           <div className='comment'>
               <div className='comment-user'>
                  <span>{this.props.comment.username}: </span>
               </div>
               <p>{this.props.comment.content}</p>
           </div>
       )
   }
}
export default Comment