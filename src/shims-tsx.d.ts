import Vue, { VNode } from 'vue'
import { AxiosInstance } from "axios"
import "socket.io-client"
import "VueLocalStorage"
declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode { }
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue { }
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
  namespace IQTQQ {
    /**
        * 收到好友消息
     */
    interface friendMsg {
      CurrentPacket: {
        Data:friendMsgdata
      }
      CurrentQQ: number
    }
    interface friendMsgdata {
      FromUin: number
      ToUin: number
      MsgType: string
      MsgSeq: number
      Content: string
      RedBaginfo: string
      isSend: boolean,
      TempUin:number|null
    }
  }
}
declare module 'vue/types/vue' {
  interface Vue {
    axios: AxiosInstance;
    socket: SocketIOClient.Socket;
    notice:Function
  }
}
