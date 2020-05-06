import Vue from 'vue'
import Vuex from 'vuex'
import { state } from "./State "
Vue.use(Vuex)

export default new Vuex.Store({
  state ,
  mutations: {
      AddfirendMsg(state,Payload:IQTQQ.friendMsg){
        // console.log(Payload)
        if(state.friend[Payload.CurrentPacket.Data.FromUin]==undefined){
          state.friend[Payload.CurrentPacket.Data.FromUin]=new Array<IQTQQ.friendMsg>()
        }
        state.friend[Payload.CurrentPacket.Data.FromUin].push(Payload);
        if(state.activate) state.activate.$forceUpdate()
      },
      setActivate(state,Payload){
        console.log(Payload)
        state.activate = Payload;
      }
  },
  actions: {
  },
  modules: {
  },
  getters:  {
        allfriendMsg: state => state.friend
    }
})

