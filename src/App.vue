<template>
  <div id="app">
    <el-container
      style="max-height: 100vh;min-height: 100vh;position: relative;"
    >
      <el-aside width="70px" style="border-right:1px solid #eee;">
        <div style="margin:10px;">
          <img
            style="border-radius:50%"
            height="50px"
            width="50px"
            :src="`http://q.qlogo.cn/headimg_dl?dst_uin=${qq}&spec=100`"
            alt
          />
        </div>
      </el-aside>
      <el-aside
        id="box"
        ref="box"
        :width="v+110 + 'px'"
        style="  max-width: 300px;min-width: 110px;"
      >
      <div style="position:fixed;width:190px;left:180px;">
        <el-slider v-model="v" :show-tooltip="false" :max="190"></el-slider>
      </div>
        <draggable v-model="list">
          <hello-world
            v-for="(item, index) in list"
            :key="index"
            :qqnumber="item"
            :len="v"
          ></hello-world>
        </draggable>
        <div
          style="position: absolute;left: 20px;bottom: 60px;"
        >
          <img height="30px" width="30px" src="./assets/friend.png" alt />
        </div>
        <div
          style="position: absolute;left: 20px;bottom: 5px;"
          @click="drawer = true"
        >
          <img height="30px" width="30px" src="./assets/setting.png" alt />
        </div>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-drawer :visible.sync="drawer">
        <span>设置还没有写</span>
      </el-drawer>
    </el-container>
  </div>
</template>

<script lang="ts">
// const BindingX = require("weex-bindingx")
import sockio from "socket.io-client";
import draggable from "vuedraggable";
import HelloWorld from "./components/HelloWorld.vue";
import api from "./api/api";
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      list: new Array<number>(),
      v:50,
      qq: "",
      drawer: false,
      ismousedown: false,
      w: 200,
      originX: 0,
    };
  },
  components: {
    HelloWorld,
    draggable,
  },
  async mounted() {
    this.__init();
  },
  watch: {
    w(e1, e2) {
      if (e1 >= 240) this.w = 240;
      if (e1 <= 150) this.w = 150;
    },
  },
  methods: {
    input(e: number) {
      console.log(e);
      "".split("http").length;
      // this.w =this.w*e/100
    },
    mousemove() {
      const div = this.$refs.div as Element;
      div.addEventListener("mouseover ", (e) => {
        console.log(e);
      });
    },
    __init() {
      const config: any = localStorage.getItem("config");
      if (config === null) this.$router.push("/config");
      const { ip, qq } = JSON.parse(config);
      this.qq = qq;
      // console.log(ip,qq)
      Vue.prototype.socket = Vue.prototype.socket = sockio(ip, {
        transports: ["websocket"],
      });

      this.socket.on("connect", () => {
        this.socket.emit("GetWebConn", qq, (e: any) => {
          // console.log(e);
        });
      });
      this.socket.on("OnEvents", function(data: any) {
        // console.log(data);
        // console.log(JSON.stringify(data));
      });
      //收到好友消息的回调事件
      this.socket.on("OnFriendMsgs", async (data: IQTQQ.friendMsg) => {
        if ("TempUin" in data.CurrentPacket.Data) {
          console.log(data);
          const Content = JSON.parse(data.CurrentPacket.Data.Content);
          if ("Url" in Content) {
            data.CurrentPacket.Data.MsgType = "PicMsg";
          } else {
            data.CurrentPacket.Data.MsgType = "TextMsg";
            data.CurrentPacket.Data.Content = Content["Content"];
          }
        }
        // new  Notification("您有一条消息",{
        //   body:"请点击查看",
        //   icon :`http://q.qlogo.cn/headimg_dl?dst_uin=${data.CurrentPacket.Data.FromUin}&spec=100`
        // }).onclick = (e)=>{
        //   window.location.hash = "#/friend/" + data.CurrentPacket.Data.FromUin
        // }
        this.$store.commit("AddResfirendMsg", data);
        console.log(data);
        const UserID = data.CurrentPacket.Data.FromUin;
        if (this.list.includes(UserID))
          this.list.splice(this.list.indexOf(UserID), 1);
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
  },
});
</script>

<style lang="scss">
.el-main {
  padding: 0 !important;
}
.el-footer {
  padding: 0 !important;
  height: auto !important;
}
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
.w-e-text-container {
  height: 200px !important; /*!important是重点，因为原div是行内样式设置的高度300px*/
}
.w-e-text {
  img {
    max-height: 50px;
  }
}
.el-slider__bar
{
  background-color: transparent !important;
}
.el-slider__runway{
  background-color: transparent !important;
}
.el-slider__button{
  width: 0px !important;
  height: 100vh !important;
  border-radius: 0 !important;
  border: 1px solid #ddd !important;
}
</style>
