<template>
  <div id="app">
    <div class="left">
      <div id="id">
        <draggable v-model="list">
          <hello-world
            v-for="(item, index) in list"
            :key="index"
            :qqnumber="item"
          ></hello-world>
        </draggable>
      </div>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import sockio from "socket.io-client"
import draggable from "vuedraggable";
import HelloWorld from "./components/HelloWorld.vue";
import api from "./api/api";
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      list: new Array<number>(),
    };
  },
  components: {
    HelloWorld,
    draggable,
  },
  async mounted() { 
    const config:any = localStorage.getItem('config')
    if(config===null) this.$router.push('/config')
    const {ip,qq} = JSON.parse(config)
    // console.log(ip,qq)
    Vue.prototype.socket = Vue.prototype.socket = sockio(ip,{
      transports: ['websocket']
    })
    this.socket.on("connect", () => {
      this.socket.emit("GetWebConn", qq, (e: any) => {
        console.log(e);
      });
    });
    this.socket.on("OnEvents", function(data: any) {
      // console.log(data);
      // console.log(JSON.stringify(data));
    });
    //收到好友消息的回调事件
    this.socket.on("OnFriendMsgs", async (data: IQTQQ.friendMsg) => {
      console.log(data.CurrentPacket.Data)
      this.$store.commit("AddfirendMsg", data);
      const UserID = data.CurrentPacket.Data.FromUin;
      // console.log(this.list);
      if (this.list.includes(UserID))
        this.list.splice(this.list.indexOf(UserID), 1);
      // console.log(UserID)
      this.list.unshift(UserID);
      // console.log(this.list);
    });
    //收到群消息的回调事件
    this.socket.on("OnGroupMsgs", function(data: any) {
      //   console.log("收到群消息");
      //   console.log(JSON.stringify(data));
    });
    // console.log(Sortable)
    // this.rowDrop();
  },
  methods: {},
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;

  .left {
    flex: 2;
    border-right: 1px solid black;
    // height: calc(100vh - 1vh);
    min-width: 240px;
  }

  .main {
    flex: 8;
    // border: 1px solid black;
    // height: calc(100vh - 1vh);
  }
}
* {
  margin: 0;
  padding: 0;
}
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
::-webkit-scrollbar-track {
  background: #eee;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #ccc;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #f79533;
}
.w-e-text-container{
    height: 200px !important;/*!important是重点，因为原div是行内样式设置的高度300px*/
}
.w-e-text{
  img{
    max-height: 50px;
    
  }
}
</style>
