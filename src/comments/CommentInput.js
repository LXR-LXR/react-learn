import React,{Component} from 'react';
class CommentInput extends Component{
    constructor(){
        super()
        this.state={
            username:'',
            content:''
        }
        this.handleUserChange=this.handleUserChange.bind(this)
        this.handleContextChange=this.handleContextChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
        // this.handleUserBlur=this.handleUserBlur
    }
    //不依赖DOM操作的组件启动的操作都可以放在componentWillMount中进行
    componentWillMount(){
        this._loadUsename()
    }
    _loadUsename(){
        const userName=localStorage.getItem('username')
        if (userName){
            this.setState({userName})
        }
    }
    handleUserChange(event){
        this.setState({
            username:event.target.value
        })
    }
    handleContextChange(event){
        this.setState({
            content:event.target.value
        })
    }
    handleSubmit(){
        // 判断props中是否传入了onsumit属性，有的话就调用该函数
        // 并且把用户输入的用户名和平数据传入该函数，然后再通过setState情况用户数输入的评论没人
       if( this.props.onSubmit){
            const {username,content}=this.state
            const createdTime=+new Date()
            this.props.onSubmit({username,content,createdTime})

       }else{
           this.setState({content:''})
       }
    }

    handleUserBlur(event){
        const username=event.target.value
        localStorage.setItem('username',username)
    }
    componentWillMount () {
        this._loadUsername()
      }
      _loadUsername () {
        const username = localStorage.getItem('username')
        if (username) {
          this.setState({ username })
        }
      }
   render(){
       return(
        <div className='comment-input'>
            <div className='comment-field'>
                <span className='comment-field-name'>用户名：</span>
                  <div className='comment-field-input'>
                  <input value={this.state.username}
                   onChange={this.handleUserChange}
                   onBlur={this.handleUserBlur}
                   />
            </div>
        </div>
        <div className='comment-field'>
              <span className='comment-field-name'>评论内容：</span>
              <div className='comment-field-input'>
                 <textarea value={this.state.content} onChange={this.handleContextChange} />
             </div>
        </div>
        <div className='comment-field-button'>
          <button onClick={this.handleSubmit}>
            发布
          </button>
        </div>
      </div>
       )
   }
}
export default CommentInput