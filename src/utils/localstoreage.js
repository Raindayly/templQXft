export const getstore = (v)=>{
  return localStorage.getItem(v) != null ? JSON.parse(localStorage.getItem(v)):null
}

export const rmstore = (v)=>{
  localStorage.removeItem(v)
}

export const setstore = (k,v)=>{
  localStorage.setItem(k,v)
}