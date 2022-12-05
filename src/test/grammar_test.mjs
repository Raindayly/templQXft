
/**
 * 测试对象解构赋值
 */
const route = {
    a:"1",
    b:"2",
    c:"3",
    d:"4",
    e:{
        a:"1",
        b:"2",
        c:"3",
    }
}
const tmp = { ...route }
route.e.a = "5"
console.log(tmp);

//concat测试
const arr1 = [1,2]
const arr2 = [2,3]
const resArr = arr1.concat(arr2)
console.log(resArr);



