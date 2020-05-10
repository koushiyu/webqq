<template>
    <el-card :style="$route.params.id == qqnumber?'background-color:#eee':''" ref="card">
        <router-link :to="'/friend/'+qqnumber">
        <div style="display:flex" >
            <div style="height: 70px;height: 70px;">
                <img style="width: 70px; height: 70px" :src="imagesrc" alt="realname" :title="realname">
            </div>
            <div style="width: 100%;">
                <p class="nickname txt"  v-show="len>20" :title="realname" >
                    {{realname}}
                    <!-- {{$refs.card}} -->
                    
                </p>
            </div>
        </div>
        </router-link>
    </el-card>
</template>

<script lang="ts">
    import api from "../api/api";
    import {
        Component,
        Prop,
        Vue,
        Watch
    } from 'vue-property-decorator';
import { watch } from 'fs';

    @Component({
        data() {
            return {
                imagesrc: "",
                realname: "",
                card:""
            }
        },
        async mounted() {
            console.log(this.$route)
            this.$data.imagesrc = `http://q.qlogo.cn/headimg_dl?dst_uin=${this.$props["qqnumber"]}&spec=100`
            const {data} = await api.GetUserInfo({UserID:this.$props["qqnumber"]})
            this.$data.realname = data.nickname
            this.$data.card = (this.$refs.card as any).$el
        }
    })
    export default class HelloWorld extends Vue {
        @Prop() private qqnumber!: number;
        @Prop() private len!: number;
        // @Prop() private text!: string;
        @Watch("qqnumber")
        async getVisible(newVal:any, oldVal:any) {
            // console.log(newVal, oldVal)
            this.$data.imagesrc = `http://q.qlogo.cn/headimg_dl?dst_uin=${this.$props["qqnumber"]}&spec=100`
            const {data} = await api.GetUserInfo({UserID:this.$props["qqnumber"]})
            // console.log(data)
            this.$data.realname = data.nickname
        };
        
        
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
img{
    border-radius:50%;
    /* margin: 0.45rem; */

}
.card-body{
    padding:0.5rem
}
p{
    margin: 0;
    text-align: right;
    font-size:1rem;
    line-height:2rem;
    /* text-align: left; */
    /* width: 100%; */
}
a{
    text-decoration:none;
}
.el-card{
    color: #000 !important;
}



.el-card:hover {
    background-color:#eee;
}
.txt{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>