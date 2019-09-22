import {http} from '../plugins/axios'

const state=()=>({
  token:'',
  id:'',
  nickname:'',
  avatar:''
})

const mutations={
  SET_TOKEN(state,token){
    state.token=token
  },
  SET_USER(state,user){
    state.id=user._id
    state.email=user.email
    state.nickname=user.nickname
    state.avatar=user.avatar
  }
}

const actions={
  login:async({state,commit},data)=>{
    console.log('login')
    let ret=await http.post('/user/login',data)
    // 登录返回token
    commit('SET_TOKEN',ret.data.token)
    console.log('action data',data)
    return ret
  },
  detail:async({state,commit},data)=>{
    let ret=await http.get('/user/detail')
    if(ret.code===0){
      console.log('setUser',ret)
      commit('SET_USER',ret.data)
      return ret
    }
  }
}

export default{
  namespace:true,
  state,
  mutations,
  actions
}