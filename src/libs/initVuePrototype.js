export const initVuePrototype = function(vue){

    vue.prototype.successMsg = "请求成功"

    vue.prototype.throwError = res => {
        if(!res.success) throw new Error(res.message)
    }
    
}
