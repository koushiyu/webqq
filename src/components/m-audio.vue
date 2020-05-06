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
    console.log(this.url);
    this.getVoice(this.url)
  },
  methods: {
    getVoice(url) {
      axios({
        url,
        responseType: "blob",
      }).then((e) => {
        const data = new FormData();
        data.append("file", new File([e.data], "a.silk"));
        console.log(e);
        axios({
          method: "post",
          data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          url: "http://silk2mp3.wlphp.com/api.php",
          // url:"http://localhost/"
        }).then((a) =>
          axios({
            url: a.data.url,
            responseType: "blob",
          }).then((b) => {
            let t = new FileReader();
            t.onload = (v) => this.base64 = v.target.result;
            t.readAsDataURL(b.data);
          })
        );
      });
      // console.log(this)
    },
  },
  name: "mAudio",
};
</script>

<style></style>
