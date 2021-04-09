import React from 'react';
import Son from './Son'
export const {Provider,Consumer} = React.createContext("默认名称");
export default class App extends React.Component{
    render(){
      let name='global全局'
      return(
        <>
        {/*Provider(生成者)，用于生产共享数据的地方 value放置共享的数据 */}
        <Provider value={name}>
            {/* 里面可以渲染对应的内容 */}
            <div style={{border:'1px solid red',width:'30%',margin:'50px auto',textAlign:'center'}}>
                父组件定义的值{name}
             <Son />
            </div>
           
        </Provider>
       </>
      )
    }
}