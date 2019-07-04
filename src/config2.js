// 方式一
// const a=100
// const fn=function(){}
// const foo={
//     name:'za',
//     age:22
// }

// exports.a=a;
// exports.fn=fn;
// exports.foo=foo;



//通过export导出的成员
//必须通过解构赋值的方式按需加载
//或者通过 * as 变量名 的方式加载所有通过export关键字导出的成员

//通过export default 导出的成员必须通过 import 变量名 from 模块标识  进行加载
//export default  和 export 可以共存

//方式二  es6的方式
// export const a = 100;
// export const fn = function () { }
// export const foo = {
//     name: 'za',
//     age: 22
// }

//方式二
const a = 100;
const fn = function () { }
const foo = {
    name: 'za',
    age: 22
}
export {
    a,
    fn,
    foo
}

export default {
    name: '张三',
    age: 44
}

