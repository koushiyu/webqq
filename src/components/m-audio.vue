<template>
  <div>
    <audio style="display: block;" controls :src="base64"></audio>
  </div>
</template>

<script>
import axios from "axios"
export default {
    data(){
        return{
            base64:""
        }
    },
  props: {
    url: {
      type: String,
      default: "",
    },
  },
  mounted() {
    // console.log(this.url);
    this.getVoice(this.url)
  },
  methods: {
    getVoice(url) {
      axios({
        url:"http://text.nepukou.xyz/?url="+url,
      }).then(e=>this.base64 = "data:audio/mp3;base64," + e.data);
    },
  },
  name: "mAudio",
};
</script>

<style></style>
