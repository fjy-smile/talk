<template>
    <div class="sendmsg-wrapper">
        <el-input
            type="textarea"
            :autosize="{minRows: 7, maxRows: 7}"
            :show-word-limit="true"
            resize="none"
            v-model="textarea"
        ></el-input>

        <el-button type="success" round class="sendbtn" @click="send">发送</el-button>
    </div>
</template>

<script>
export default {
    name: 'SendMsg',
    props: ["socket", "username"],
    data(){
        return {
            textarea: ''
        }
    },
    methods:{
        send(){
            const that = this
            this.socket.send(
                JSON.stringify({
                    name: that.username,
                    data: that.textarea,
                    type: "send"
                })
            )
            this.textarea = ""
        }
    },
    mounted() {
        let _this = this;
        document.onkeydown = function(e) {
            if (e.keyCode === 13) {
                _this.send();
            }
        };
    }
}
</script>

<style lang="less">
.sendmsg-wrapper{
    position:relative;
    width:100%;
    height:100%;
    padding:10px;
    box-sizing: border-box;

    .el-textarea__inner{
        height:80%;
        border:0px;
    }

    .sendbtn{
        position:absolute;
        bottom:10px;
        right:20px;
    }
}
</style>