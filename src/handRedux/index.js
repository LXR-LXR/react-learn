import React from 'react'
class index extends React.Component{
    constructor(){
        super()
        const appState={
            title:{
                text:"小书",
                color:'red'
            },
            content:{
                text:"React.js小书内容",
                color:"blue"
            }
       }
        this.state={appState}
    }
    componentDidMount(){
        const store=this.createStore(this.state.appState,this.stateChanger)
        console.log('store',store)
        // 首次渲染页面
        // this.renderApp(this.state.appState)
        this.renderApp(store.getState())
        // this.dispatch({type:'UPDATA_TITLE_TEXT',text:'修改'})
        // this.dispatch({type:'UPDATA_TITLE_COLOR',color:'yellow'})
        store.dispatch({type:'UPDATA_TITLE_TEXT',text:'修改测试'})
        store.dispatch({type:'UPDATA_TITLE_COLOR',color:'red'})
        // 把新的数据渲染到页面上
        // this.renderApp(this.state.appState)
        this.renderApp(store.getState())
    }
    renderApp(appState){
      this.renderTitle(appState.title)
      this.renderContent(appState.content)
    }
    renderTitle(title){
      const titleDOM=document.getElementById('title')
      titleDOM.innerHTML=title.text
      titleDOM.style.color=title.color
    }
    renderContent(content){
        const contentDOM=document.getElementById('content')
        contentDOM.innerHTML=content.text
        contentDOM.style.color=content.color
      }
/* dispatch专门负责数据的修改,所有对数据的操作必须通过dispath函数，他接受一个参数action 这个action是一个普通的Javascript对象
里面必须包含一个type字段来声明你想干什么，dispathc在switch里面会识别这个type字段，能够识别出来的操作才会执行对appstate的修改
1、上面的dispath他能识别两种操作，一种是UPDATE_TITILE_TEXT 他会用action的text字段取更新appSate.title.text
可以看到 action里面除了type字段是必须的意外，其他的字段都是可以自定义的
任何的模块如果想要修改appSatle.title.text 必须大张旗鼓的调用dispatch
*/
     dispatch(action){
        switch(action.type){
            case 'UPDATA_TITLE_TEXT':
                this.state.appState.title.text=action.text
                break
            case 'UPDATA_TITLE_COLOR':
                this.state.appState.title.color=action.color
                break
            default:
                break
        }
     }
    /*----------------
     上一节我们有了appState和dispatch，现在我们把它集中到一个地方，给这个地方起个名字叫做store,然后构建一个函数createStore,用来
     专门生产这种state和dispath的集合，这样别的APP也可以用这种模式了
    */ 
    /*
    createStore接受两个参数，一个是标识应用程序状态的state 另一个是stateChanger 他来描述应用程序状态会根据action发生什么变化，其实就是相当于
    本节开头的dispathc代码里面的内容
    1、createStore会返回一个对象 这个对象包含两个方法 getState和dispach getState用于获取states数据，其实就是简单的把state参数返回
    2、createStore的dispatch用于修改数据，和以前一样会接受action 然后他会把state和action 一并传给stateChanger 
    那个stateChanger 就可以根据action来修改state了 
     */

    /**
     我们在creatStore里面定义了一个数组listers
     */
    createStore(state,stateChanger){
       const listeners=[]
       const subscribe=(listener)=>listeners.push(listener)
       const getState=()=>state
       const dispatch=(action)=>{
        stateChanger(state,action)
        listeners.forEach((listener)=>{
            listener()
        })
       }
       return {getState,dispatch,subscribe}
       console.log('getState',getState,dispatch,subscribe)
    }
    /* 现在有了createStore 我们就可以这么修改原来的代码 保留原来所有的渲染函数不变，修改数据生成的方法*/
    stateChanger(state,action){
        switch(action.type){
            case 'UPDATA_TITLE_TEXT':
                state.title.text=action.text
                break
            case 'UPDATA_TITLE_COLOR':
                state.title.color=action.color
                break
            default:
                break
        }
    }
    /**
     * 总结：
     * 针对每个不同改的APP 我们可以给creatStore传入初始的数据appState 和一个描述数据变化的函数statehanger 然后生成一个stor
     * 需要修改数据的时候通过store.dispatch  需要获取数据的时候通过store.getState()
     */
    render(){
       
        return(
            <div>
                <div id='title'></div>
                <div id='content'></div>
            </div>
        )
    }
}
export default index