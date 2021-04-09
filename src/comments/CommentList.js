import React,{Component} from 'react';
import Comment from './Comment'
class CommentList extends Component{
    // 加入defaultPprops防止默认值comments[]不传入的情况
    static defaultProps={
        comments:[]
    }
   render(){
    // const comments = [
    //     {username: 'Jerry', content: 'Hello'},
    //     {username: 'Tomy', content: 'World'},
    //     {username: 'Lucy', content: 'Good'}
    //   ]
    
    
       return(
           <div>
              {this.props.comments.map((comment,i)=>{
                  return (
                      <Comment comment={comment} key={i} />
                  )
              })}  
           </div>
       )
   }
}
export default CommentList