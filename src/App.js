// import logo from './logo.svg';
import {React,Component} from 'react'
import './App.css';

// function App() {
//   return (
//     <div className="App">
        
//     </div>
//   );
// }



// class LikeButton extends Component{
//   constructor(){
//       super()
//       this.state={isLiked:false}
//       this.handleClick=this.handleClick.bind(this)
//   }
//   handleClick(){
//       this.setState({isLiked:!this.state.isLiked})
//   }
//   render(){
//       return(
//           <div>
//                 <button onClick={this.handleClick}>{this.state.isLiked?'取消':"点赞"}</button>
//           </div>
//       )
//   }
// }
// -------------------------------------------------
//  任务 组件取消和点赞的可配置性 在导入LikeButton的地方属性加上自己的props
// react.js的props就可以帮助我们达到这个效果 每个组件都可以接受一个props参数，它是一个对象 
class LikeButton extends Component{
    // 默认配置defaultProps,
    // 上面的组件默认配置是我们通过||操作符来实现的，在react中非常常见，也提供了一种方式defaultProps,
    static defaultProps={
        likeText:"点赞",
        unlikedText:"取消"
    }
    constructor(){
        super()
        this.state={isLiked:false}
        this.handleClick=this.handleClick.bind(this)
    }
    componentWillMount(){
        this.fun()
    }
        
    handleClick(){
        // this.props.likedText = '取消'    报错 likeText of Object '#<Object>'
        this.setState({isLiked:!this.state.isLiked})
    }
    fun(){
        const nums=[2,7,11,15]
        const target=9
        const arr=[]
    //     var getIndex = (target,arr)=>{
    //         for(let i = 0 ,i = arr.length; i < len;i++){
    //             //深复制数组
    //              let temp = JSON.parse(JSON.stringify(arr));
    //              //每个数字只有一次
    //              temp[i] = undefined;
    //              //如果数组中有target-arr[i]这个数，直接结束函数（因为一个输入对应一个输出）
    //              let index = temp.indexOf(target-arr[i]);
    //              if(index!=-1){
    //                  return [i,index]
    //              }
    //         }
    //      //    如果遍历之后还没找到，就返回false
    //         return false;

    //    }
    //    console.log(getIndex(9,[2,7,11,15]))
     var fun=(nums,target)=>{
        for(var i=0;i<nums.length;i++){
                for(var j=i;j<nums.length;j++){
                    if(nums[i]+nums[j]==target){
                        return [i,j]
                    }
                }        
       } 
     }
     console.log('fun',fun([2,7,11,15],9))
    }
    render(){
        // 定义单个的属性配置取消与点赞
        // const likeText=this.props.likeText||"取消"
        const likeText=this.props.likeText
        // const unlikedText=this.props.unlikedText||"点赞"
        const unlikedText=this.props.unlikedText
        // 定义一个对象作为参数，传入取消和点赞
        const wordings=this.props.wordings||{
            likeText,unlikedText
        }
        return(
            <div>
                  <button onClick={this.handleClick}>{this.state.isLiked? likeText: unlikedText}</button>
                  <button onClick={this.handleClick}>{this.state.isLiked? wordings.likeText: wordings.unlikedText}</button>
            </div>
        )
    }
  }
export default LikeButton;
