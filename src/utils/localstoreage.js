export const getStore = (v) => {
  return localStorage.getItem(v)
}

export const rmStore = (v) => {
  localStorage.removeItem(v)
}

export const setStore = (k, v) => {
  let data = v
  if(v instanceof Object){
    data = JSON.stringify(v)
  }
  localStorage.setItem(k, data)
}