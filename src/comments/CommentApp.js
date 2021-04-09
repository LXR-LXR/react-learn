import React,{Component} from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import './index.css'
class CommentApp extends Component{
    constructor(){
      super()
    //在commentApp中初始化一个数组，来保存所有的评论数据，并且通过props
    // 把他传递给CommentList 
      this.state={
          comments:[]
      }
      this.handleSubmitComment=this.handleSubmitComment.bind(this)
    }
    componentWillMount() {

    }
    _saveComment(comments){
        localStorage.setItem('comments',comments)
        console.log('comments',comments)
    }
    _loadCommentList(){

    }
    handleSubmitComment(comment){
        // 每当用户发布评论的时候，就把评论数据插入this.state.comment中
        // 然后通过setState把数据更新到页面上
        if(!comment)return
        if(!comment.username) return alert('请输入用户名')
        if(!comment.content) return alert('请输入评论')
        const comments=this.state.comments
        comments.push(comment)
        this.setState({comments})
        this._saveComment(comments)
    }
   render(){
       return(
           <div className="wrapper">
               <CommentInput onSubmit={this.handleSubmitComment} />
               <CommentList comments={this.state.comments}/>
           </div>
       )
   }
}
export default CommentApp