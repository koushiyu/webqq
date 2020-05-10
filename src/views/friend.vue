<template>
<el-container>
  <el-main>
    <div class="sol" style="overflow:auto;height:calc(100vh - 234px)" id="chatContainer">
      <div class="m-message" >
        <ul >
          <li
            v-for="(item, index) in this.$store.state.friend[$route.params.id]"
            :key="index"
          >
            <!-- <p class="time"><span>{{item.date | time}}</span></p> -->
            <div class="m-main" :class="item.isSend ? 'self' : ''">
              <img
                class="avatar"
                width="50"
                height="50"
                :src="`http://q.qlogo.cn/headimg_dl?dst_uin=${item.isSend?qq:$route.params.id}&spec=100`"
              />
              <!-- {{item}}--{{index}} -->
              <div class="text" v-if="item.MsgType == 'TextMsg'">
                {{ item.Content }}
              </div>
              <div v-else-if="item.MsgType == 'PicMsg'">
                <viewer>
                  <img class="text" style="background-color: #fff;max-width:200px;padding: 0 ;" :src="JSON.parse(item.Content).Url"/>  
                </viewer> 
                {{ JSON.parse(item.Content).Content }}
              </div>
              <div
                class="text"
                style="background-color: #fff;padding: 0 ;"
                v-else-if="item.MsgType == 'VoiceMsg'"
              >
                <div>
                  <mAudio :url="JSON.parse(item.Content).Url"></mAudio>
                </div>
              </div>
              <div class="text" v-else>
                [消息类型暂时不支持,会支不支持也不一定]
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </el-main>
  <el-footer>
     <div id="edit" style="text-align:left"></div>
      <div style="bottom: 20px;right: 10px;position:absolute;">
        <el-button :disabled="$route.params.id?false:true" style="z-index:100001" type="primary" @click="click">发送</el-button>
      </div>
  </el-footer>
</el-container>
 
</template>

<script>
import cheerio from "cheerio";
import axios from "axios";
import mAudio from "@/components/m-audio";
import wangEditor from "wangEditor";
import api from "../api/api";
import emoji from "../assets/emoji.json";

export default {
  name: "Home",
  components: {
    mAudio,
  },
  data() {
    return {
      edit: null,
      qq:null
    };
  },
  mounted() {
    this.qq =  JSON.parse(localStorage.getItem("config")).qq
    this.$store.commit("setActivate", this);
    this.edit = new wangEditor("#edit");
    this.edit.customConfig.zIndex = 0;
    this.edit.customConfig.uploadImgShowBase64 = true;
    this.edit.customConfig.emotions = [
      {
        title: "默认",
        type: "image",
        content: emoji,
      },
    ];

    this.edit.customConfig.menus = [
      "emoticon", // 表情
      "image", // 插入图片
      // 'justify',  // 对齐方式
      // "undo", // 撤销
      // "redo", // 重复
    ];
    this.edit.create();
  },
  methods: {
    click() {
      // console.log(123)
      const $ = cheerio.load(this.edit.txt.html());
      const src = $("img")[0]?.attribs["src"]
      const Data = {};
      Data.toUser =  parseInt(this.$route.params.id)
      console.log(this.$store.state?.friend[this.$route.params?.id]&&this.$store.state?.friend[this.$route.params?.id][this.$store.state?.friend[this.$route.params?.id]?.length])
      Data.sendToType = this.$store.state.friend[this.$route.params?.id][this.$store.state.friend[this.$route.params?.id]?.length -1]?.TempUin?3:1
      // console.log((this.$store.state.friend[this.$route.params.id][this.$store.state.friend[this.$route.params.id].length -1]))
      Data.groupid= this.$store.state.friend[this.$route.params.id][this.$store.state.friend[this.$route.params.id].length -1].TempUin|0,
      Data.atUser= 0,
      Data.picUrl= src?.startsWith("http") ? src : "",
      Data.picBase64Buf= src?.startsWith("data")? src.split(/^data:image\/(jpeg|png|gif);base64,/)[2]: "",
      Data.fileMd5= "",
      Data.sendMsgType =  Data.picUrl ||  Data.picBase64Buf ?"PicMsg":"TextMsg"
      Data.content= this.edit.txt.text().split("&nbsp;").join() || ""
      api.sendMsg(Data)
      this.$store.commit("AddSendfirendMsg",{
        CurrentPacket:{
          Data:{
            FromUin:this.$route.params.id,
            MsgType: Data.sendMsgType,
            Content: src? JSON.stringify({Url:Data.picUrl?Data.picUrl:src,Content:Data.content}) :Data.content,
            isSend: true,
            TempUin:this.$store.state.friend[this.$route.params.id][this.$store.state.friend[this.$route.params.id].length -1].TempUin
          }
        }
      })
      this.edit.txt.html("")
    },
  },
};
</script>

<style lang="less" scoped>
.m-main {
  position: relative;
  overflow: hidden;
  // background-color: #eee;
  text-align: left;
}
.m-message {
  padding: 10px 15px;
  overflow-y: scroll;

  li {
    list-style-type: none;
    margin-bottom: 15px;
  }
  .time {
    margin: 7px 0;
    text-align: center;

    > span {
      display: inline-block;
      padding: 0 18px;
      font-size: 12px;
      color: #fff;
      border-radius: 2px;
      background-color: #dcdcdc;
    }
  }
  .avatar {
    float: left;
    margin: 0 10px 0 0;
    border-radius: 3px;
  }
  .text {
    display: inline-block;
    position: relative;
    padding: 0 10px;
    max-width: ~"calc(100% - 200px)";
    min-height: 30px;
    line-height: 2.5;
    font-size: 20px;
    text-align: left;
    word-break: break-all;
    background-color: #99ccff;
    border-radius: 4px;

    &:before {
      content: " ";
      position: absolute;
      top: 9px;
      right: 100%;
      border: 6px solid transparent;
      border-right-color: #fafafa;
    }
  }

  .self {
    text-align: right;

    .avatar {
      float: right;
      margin: 0 0 0 10px;
    }
    .text {
      background-color: #409eff;

      &:before {
        right: inherit;
        left: 100%;
        border-right-color: transparent;
        border-left-color: #b2e281;
      }
    }
  }
}
</style>
