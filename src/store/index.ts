import Vue from 'vue'
import Vuex from 'vuex'
import { state } from "./State "
Vue.use(Vuex)

export default new Vuex.Store({
  state ,
  mutations: {
      AddResfirendMsg(state,Payload:IQTQQ.friendMsg){
        // console.log(Payload)
        if(state.friend[Payload.CurrentPacket.Data.FromUin]==undefined){
          state.friend[Payload.CurrentPacket.Data.FromUin]=new Array<IQTQQ.friendMsgdata>()
        }
        state.friend[Payload.CurrentPacket.Data.FromUin].push(Payload.CurrentPacket.Data);
        if(state.activate){
          // console.log(state.activate.$nextTick)
          state.activate.$forceUpdate()
          state.activate.$nextTick(() => {
            const container = state.activate.$el.querySelector("#chatContainer");
            container.scrollTop = container.scrollHeight;
            
           })
        }
      },
      setActivate(state,Payload){
        // console.log(Payload)
        state.activate = Payload;
      },
      AddSendfirendMsg(state,Payload:IQTQQ.friendMsg){
        // console.log(Payload)
        if(state.friend[Payload.CurrentPacket.Data.FromUin]==undefined){
          state.friend[Payload.CurrentPacket.Data.FromUin]=new Array<IQTQQ.friendMsgdata>()
        }
        // Payload.CurrentPacket.Data.isSend = true;
        state.friend[Payload.CurrentPacket.Data.FromUin].push(Payload.CurrentPacket.Data);
        if(state.activate){
          state.activate.$forceUpdate()
          state.activate.$nextTick(() => {
            const container = state.activate.$el.querySelector("#chatContainer");
            container.scrollTop = container.scrollHeight;
           })
        }
      },
  },
  actions: {
  },
  modules: {
  },
  getters:  {
        allfriendMsg: state => state.friend
    }
})

