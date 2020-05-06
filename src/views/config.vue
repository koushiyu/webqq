<template>
    <div>
        <label for="">ip</label><input type="text" v-model="ip"><br>
        <label for="">qq号</label><input type="text" v-model="qq">
        <button @click="click">确定</button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            ip:"",
            qq:""
        }
    },
    methods:{
        click(){
            localStorage.setItem("config",JSON.stringify({
                ip:this.ip,
                qq:this.qq
            }))
            alert("请重启浏览器")
        }
    }
}
</script>

<style lang="less" scoped>

</style>