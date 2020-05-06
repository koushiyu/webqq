import http from '../http'
interface sendDate{
    /**
     * 欲发给的对象 群或QQ好友或私聊对象
     */
    toUser:	Number	
    /**
     * 发送消息对象的类型 1好友 2群3私聊
     */
    sendToType:	1|2|3
    /**
     *欲发送消息的类型 TextMsg、JsonMsg、XmlMsg、ReplayMsg、TeXiaoTextMsg、PicMsg、VoiceMsg、PhoneMsg 
    */	
    sendMsgType:"TextMsg" | "JsonMsg" | "XmlMsg"|"ReplayMsg"|"TeXiaoTextMsg"|"PicMsg"|"VoiceMsg"|"PhoneMsg"
    /**
     * 发送私聊消息是 在此传入群ID 其他情况为0
     */
    groupid:0|Number
    /**
     * 发送的文本内容
     */
    content:string
    /**
     * At用户 传入用户的QQ号 其他情况为0
     */
    atUser:	Number	|0
    /**
     * 发送语音的网络地址 skilk格式
     */
    voiceUrl?:string	
    /**
     * 发本地送语音的buf 转 bas64 编码
     */
    voiceBase64Buf?:string
    /**
     * 发送图片的网络地址
     */
    picUrl?:string
    /**
     * 发本地送图片的buf 转 bas64 编码
     */
    picBase64Buf?:string
    /**
     * 待定
     */
    forwordBuf?:string	
    /**
     * 待定
     */
    forwordField?:string	
    /**
     * 通过md5 值发送 图片 
     */
    fileMd5?:string	
    /**
     * 回复类型消息（回复某人的消息）
     */
    replayInfo?:object	
}

interface userinfo{
    code:number
    data:{
            /**
         * 未知值
         */
        bitmap:	string
        /**
         * 成为好友时为1
         */
        friendship:	number
        /**
         * 未知值
         */
        intimacyScore:	number
        /**
         * 备注
         */ 	
        realname:	string
        /**
         * 1 开通了QQ空间 0没有
         */
        qzone:	number
        /** 
         * 头像图片
        */
        avatarUrl:	string	
        /**
         * 未知值
         */
        astro:	number,
        /**
         * qq昵称
         */
        nickname:string
    },
    
}


//发送消息
async function sendMsg(e:sendDate){
    console.log(e)
    http({
        method:"POST",
        data:e ,
        params:{
            funcname:"SendMsg",
            timeout:10
        }
    })
    return;
}

async function GetQQUserList(StartIndex:number=0){
    return (await http({
        method:"POST",
        data:{
            StartIndex
        },
        params:{
            funcname:arguments.callee.name,
            timeout:10
        }
    })).data
}

async function GetUserInfo(e:{
    /**
     * 好友qq号
     */
    UserID:number
}):Promise<userinfo>{
    const {data} = await http({
        method:"POST",
        data:e,
        params:{
            funcname:"GetUserInfo",
            timeout:10
        }
    })
    // console.log(data)
    return data
}

export default{
    sendMsg,
    GetQQUserList,
    GetUserInfo
}