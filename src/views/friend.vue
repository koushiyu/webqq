<template>
  <div style="display:flex;height:100vh;flex-flow: column;position: relative;">
    <div class="sol" style="overflow:auto;height:calc(100vh - 200px)">
      <div class="m-message">
        <ul>
          <li
            v-for="(item, index) in $store.state.friend[$route.params.id]"
            :key="index"
          >
            <!-- <p class="time"><span>{{item.date | time}}</span></p> -->
            <div class="m-main">
              <img
                class="avatar"
                width="50"
                height="50"
                :src="
                  'http://q.qlogo.cn/headimg_dl?dst_uin=' +
                    $route.params.id +
                    '&spec=640'
                "
              />
              <!-- {{item}}--{{index}} -->
              <div
                class="text"
                v-if="item.CurrentPacket.Data.MsgType == 'TextMsg'"
              >
                {{ item.CurrentPacket.Data.Content }}
              </div>
              <img
                class="text"
                v-else-if="item.CurrentPacket.Data.MsgType == 'PicMsg'"
                style="background-color: #fff;max-width:200px;padding: 0 ;"
                :src="JSON.parse(item.CurrentPacket.Data.Content).Url"
              />
              <div
                class="text"
                style="background-color: #fff;padding: 0 ;"
                v-else-if="item.CurrentPacket.Data.MsgType == 'VoiceMsg'"
              >
                <div>
                  <mAudio
                    :url="JSON.parse(item.CurrentPacket.Data.Content).Url"
                  ></mAudio>
                </div>
              </div>
              <div class="text" v-else>
                [消息类型暂时不支持,会支不支持也不一定]
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- <i class="text">{{  }}</i> -->
    </div>
    <!-- {{Msg}} -->
    <div id="edit" style="text-align:left"></div>
    <div style="bottom: 10px;right: 10px;position:absolute;">
      <el-button style="z-index:100001" type="primary" @click="click"
        >发送</el-button
      >
    </div>
  </div>
</template>

<script>
import cheerio from "cheerio"
import axios from "axios";
import mAudio from "@/components/m-audio";
import wangEditor from "wangEditor";
import api from "../api/api";
export default {
  name: "Home",
  components: {
    mAudio,
  },
  data() {
    return {
      edit: null,
    };
  },
  mounted() {
    this.$store.commit("setActivate", this);
    this.edit = new wangEditor("#edit");
    this.edit.customConfig.zIndex = 0;
    this.edit.customConfig.uploadImgShowBase64 = true;
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
      const $ = cheerio.load(this.edit.txt.html())
      if($("img")[0]?.attribs["src"]){
      const src = $("img")[0]?.attribs["src"]
      api.sendMsg({
          "toUser":parseInt(this.$route.params.id),
          "sendToType": 1,
          "sendMsgType": "PicMsg",
          "content": this.edit.txt.text().split("&nbsp;")[1],
          "groupid": 0,
          "atUser": 0,
          "picUrl": src.startsWith("http")?src:'',
          "picBase64Buf": src.startsWith("data")?src.split('data:image/jpeg;base64,')[1]:'',
          "fileMd5": ""
      });
      }else{
         api.sendMsg({
          "toUser": parseInt(this.$route.params.id),
          "sendToType": 1,
          "sendMsgType": "TextMsg",
          "content": this.edit.txt.text(),
          "groupid": 0,
          "atUser": 0,
          "picUrl": "",
          "fileMd5": ""
        });
      }
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
