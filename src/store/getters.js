const getters = {
  token: state => state.userInfo.token,
  avatar: state => state.userInfo.avatar,
  name: state => state.userInfo.name,
  roles: state => state.userInfo.roles,
  permission_routes:  state => state.permission.routes
}
export default getters
