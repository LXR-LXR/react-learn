import React from 'react';
import {Consumer} from './App'
const  GrandSon=()=>{
    return (
        //Consumer容器,可以拿到上文传递下来的name属性,并可以展示对应的值
        <Consumer>
            {( name ) =>
                <div style={{ border: '1px solid blue', width: '60%', margin: '20px auto', textAlign: 'center' }}>
                    <p>孙组件。获取传递下来的值:{name}</p>
                    {/* 孙组件内容 */}
               </div>
            }
        </Consumer>
    );
}
export default GrandSon;