<template>
    <div>
        <label for="">机器人的地址 形如http://127.0.0.1:8888</label><input type="text" v-model="ip"><br>
        <label for="">机器人的qq号</label><input type="text" v-model="qq">
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