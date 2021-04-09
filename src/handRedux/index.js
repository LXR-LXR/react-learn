import React from 'react'
class index extends React.Component{
    constructor(){
        super();
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
        let oldState=store.getState()//缓存旧的state
        store.subscribe(()=>{
            const newState=store.getState()//数据可能变化，获取新的state
            this.renderApp(newState,oldState)//把新旧state传进去渲染
            oldState=newState//渲染完以后 新的newSate变成了旧的oldState ,等待下一次数据变化重新渲染
        })
        // 首次渲染页面
        // this.renderApp(this.state.appState)
        this.renderApp(store.getState())
        // this.dispatch({type:'UPDATA_TITLE_TEXT',text:'修改'})
        // this.dispatch({type:'UPDATA_TITLE_COLOR',color:'yellow'})
        store.dispatch({type:'UPDATA_TITLE_TEXT',text:'修改测试'})
        store.dispatch({type:'UPDATA_TITLE_COLOR',color:'red'})
        // 把新的数据渲染到页面上
        // this.renderApp(this.state.appState)
        // this.renderApp(store.getState())
        //后面不管如何store.dispatch 都不需要重新调用renderApp
    }
    // renderApp(appState){
    //   this.renderTitle(appState.title)
    //   this.renderContent(appState.content)
    // }

    //性能,不修改不渲染
    renderApp(newAppState,oldAppState={}){
    //    防止oldAppState没有传入，所以加了默认参数 oldAppState = {}
        if(newAppState===oldAppState)return //没有数据变化就不渲染了
        this.renderTitle(newAppState.title,oldAppState.title)
        this.renderContent(newAppState.content,oldAppState.content)
        console.log('render app...')
    }

    // renderTitle(title){
    //   const titleDOM=document.getElementById('title')
    //   titleDOM.innerHTML=title.text
    //   titleDOM.style.color=title.color
    // }

    //性能 不修改不渲染
    renderTitle(newTitle,oldTitle){
         if(newTitle===oldTitle)return
        const titleDOM=document.getElementById('title')
        titleDOM.innerHTML=newTitle.text
        titleDOM.style.color=newTitle.color
        console.log('renderTitle Title...')
     }
    // renderContent(content){
    //     const contentDOM=document.getElementById('content')
    //     contentDOM.innerHTML=content.text
    //     contentDOM.style.color=content.color
    //   }

    //性能 不修改不渲染
    renderContent(newcContent,oldContent){
        if(newcContent===oldContent) return
        const contentDOM=document.getElementById('content')
        contentDOM.innerHTML=newcContent.text
        contentDOM.style.color=newcContent.color
        console.log('renderContent Content...')
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
    /**----------------
     上一节我们有了appState和dispatch，现在我们把它集中到一个地方，给这个地方起个名字叫做store,然后构建一个函数createStore,用来
     专门生产这种state和dispath的集合，这样别的APP也可以用这种模式了

    /*
    createStore接受两个参数，一个是标识应用程序状态的state 另一个是stateChanger 他来描述应用程序状态会根据action发生什么变化，其实就是相当于
    本节开头的dispathc代码里面的内容
    1、createStore会返回一个对象 这个对象包含两个方法 getState和dispach getState用于获取states数据，其实就是简单的把state参数返回
    2、createStore的dispatch用于修改数据，和以前一样会接受action 然后他会把state和action 一并传给stateChanger 
    那个stateChanger 就可以根据action来修改state了 
     */

    /**
     我们在creatStore里面定义了一个数组listeners 还有一个新的方法subscribe,可以通过store.subscribe(listener)的方式给subscribe传入一个监听函数，
     这个函数会被push到数组当中
     我们修改了disapatch 每次当他调用到的时候，除了会stateChanger进行数据的修改，还会遍历listeners数组里面的函数 然后一个一个去调用
     相当于我们可以通过subscibe传入数据变化的监听函数，每当dispatch的时候，监听函数就会被调用 这样我们就可以在每当数据变化是进行重新渲染

     */
    createStore(state,stateChanger){
       const listeners=[]
       const subscribe=(listener)=>listeners.push(listener)
       const getState=()=>state
       const dispatch=(action)=>{
           state=stateChanger(state,action)//覆盖原对象
           // stateChanger(state,action)不会修改原来对象了，而是返回对象
           listeners.forEach((listener)=>{
            listener()
          })

       }
       return {getState,dispatch,subscribe}
    }
    /* 现在有了createStore 我们就可以这么修改原来的代码 保留原来所有的渲染函数不变，修改数据生成的方法*/
    stateChanger(state,action) {
        switch (action.type) {
            case 'UPDATA_TITLE_TEXT':
                //构建新的对象并且返回
                return {
                    ...state,
                    title: {
                        ...state.title,
                        text: action.text
                    }
                }
            // state.title.text=action.text
            // break

            case 'UPDATA_TITLE_COLOR':
                return {
                    ...state,
                    title: {
                        ...state.title,
                        color: action.color
                    }
                }
            // state.title.color=action.color
            // break
            default:
                // break
                return state

        }
    }
        /**
         * 总结：
         * 针对每个不同改的APP 我们可以给creatStore传入初始的数据appState 和一个描述数据变化的函数statehanger 然后生成一个stor
         * 需要修改数据的时候通过store.dispatch  需要获取数据的时候通过store.getState()
         *
         *
         * 现在我们欧了一个比较通用的createStore 他可以产生一种我们新定义的数据类型store 通过store.getSate 我们获取共享状态 而且我们约定只能通过用
         * store.dispatch修改共享状态 ,store也允许我们通过store.subscibe 监听数据状态被修改了
         */
        render() {
            return (
                <div>
                    <div id='title'></div>
                    <div id='content'></div>
                </div>
            )
        }

}
export default index