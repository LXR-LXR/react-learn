import React from 'react';
import {Consumer} from './App'
import GrandSon from './GrandSon'
const  Son=()=>{
    return (
        /*Consumer(消费者)这个可以理解为消费者，他是专门消费供应商
        ,可以拿到上文传递下来的name属性,并可以展示对应的值
        */
        <Consumer>
            {( name ) =>
                <div style={{ border: '1px solid blue', width: '60%', margin: '20px auto', textAlign: 'center' }}>
                    <p>子组件。获取父组件的值:{name}</p>
                    {/* 孙组件内容 */}
                    <GrandSon />
               </div>
            }
        </Consumer>
    );
}
export default Son;