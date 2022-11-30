export const getStore = (v) => {
  return localStorage.getItem(v)
}

export const rmStore = (v) => {
  localStorage.removeItem(v)
}

export const setStore = (k, v) => {
  localStorage.setItem(k, v)
}