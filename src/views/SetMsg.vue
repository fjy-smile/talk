<template>
    <div class="setmsg-wrapper">
        <div class="content-wrapper">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="70px"
                label-position="right"
                :status-icon="true"
                :hide-required-asterisk="true"
                size="medium"
                class="demo-ruleForm form-wrapper"
            >
                <el-form-item label="昵称" prop="nickname" class="form-item">
                    <el-input v-model="ruleForm.nickname" :placeholder="`${ruleForm.nickname}` || '请输入昵称'"></el-input>
                </el-form-item>

                <el-form-item label="性别">
                    <el-radio-group v-model="ruleForm.sex" size="medium">
                    <el-radio border label="男"></el-radio>
                    <el-radio border label="女"></el-radio>
                    <el-radio border label="保密"></el-radio>
                    </el-radio-group>
                </el-form-item>

                <div class="avatar-wrapper">
                    <div class="show">
                        <div class="avatar-text">头像</div>
                        <img :src="`http://47.112.249.51:8199${avatar}`">
                    </div>
                    <Cropper class="cropper-wrapper" @listenAvatarRes="getAvatarRes"/>
                </div>

                <el-form-item label="个人签名" prop="signature" class="form-item">
                    <el-input v-model="ruleForm.signature" :placeholder="`${ruleForm.signature}` || '请输入个人签名'"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm">提交</el-button>
                    <el-button @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="back" @click="back"></div>
    </div>
</template>

<script>
import Cropper from '../components/setmsg/cropper'

export default {
    name: 'SetMsg',
    components:{
        Cropper
    },
    data(){
        return {
            flag: true,
            avatar:'',
            ruleForm: {
                nickname: "",
                signature: "",
                sex: ""
            },
            rules: {
                nickname: [
                    {
                        required: true,
                        type: "string",
                        message: "请输入昵称",
                        trigger: "blur"
                    },
                    { 
                        min: 6, 
                        max: 16,  
                        message: '用户名长度为 6 - 16 个字符'
                    }
                ],
                signature: [
                    {
                        required: true,
                        message: "请输入个人签名",
                        trigger: "blur"
                    },{ 
                        min: 0, 
                        max: 20,  
                        message: '用户名长度为 0 - 20 个字符'
                    }
                ],
                sex: [
                    {
                        required: true,
                        message: "请选择性别",
                        trigger: "blur"
                    }
                ]
            }
        }
    },
    methods:{
        // 上传截图后返回的截图信息
        getAvatarRes(res){
            const { status, data:{ code, msg, data:avatar } } = res
            if(status === 200 && code === 0){
                this.avatar = avatar
            }else{
                this.$alert(`发生错误，${msg || '请联系负责人'}`, {
                    confirmButtonText: "确定"
                });
            }
        },
        submitForm(){
            const that = this
            if(this.flag){
                this.flag = false

                let sexRes = 2
                if(this.ruleForm.sex === '男'){
                    sexRes = 1
                }else if(this.ruleForm.sex = '女'){
                    sexRes = 0
                }
                
                this.axios({
                    method: 'post',
                    url: 'http://47.112.249.51:8199/user/set-profile',
                    params:{
                        nickname: that.ruleForm.nickname,
                        signature: that.ruleForm.signature,
                        sex: sexRes
                    }
                }).then(res => {
                    const { status, data: { code, msg } } = res
                    if(status === 200 && code === 0){
                        this.$alert(`修改成功！`, {
                            confirmButtonText: "确定",
                            callback: action => {
                                let NewPage = "_empty" + "?time=" + new Date().getTime() / 500;
                                this.$router.push(NewPage);
                                this.$router.go(-1);
                            }
                        })
                    }else{
                        this.$alert(`修改失败，${msg || '请联系负责人'}`, {
                            confirmButtonText: "确定"
                        })
                    }
                })
            }else{
                this.$alert(`修改中，请稍等`, {
                    confirmButtonText: "确定"
                });
            }
        },
        resetForm(){
            this.ruleForm = {
                nickname: "",
                signature: "",
                sex: ""
            }
        },
        back(){
            this.$router.push({ path: `/index/` });
        }
    },
    mounted(){
        const that = this
        this.axios({
            method: 'get',
            url: 'http://47.112.249.51:8199/user/profile'
        }).then(res => {
            const { status, data: { code, data:resData } } = res
            if(status === 200 && code === 0){
                let sex = '保密'
                if(resData.Sex === 1){
                    sex = '男'
                }else if(resData.Sex === 0){
                    sex = '女'
                }
                that.avatar = resData.Avatar
                that.ruleForm.nickname = resData.Nickname
                that.ruleForm.sex = sex
                that.ruleForm.signature = resData.Signature
            }
        })
    }
}
</script>

<style lang='less'>
    .setmsg-wrapper{
        position:relative;
        width:100%;
        height:100%;
        padding:70px 20px 20px 20px;
        box-sizing: border-box;
        background:rgba(255,255,255);

        .content-wrapper{
            width:80%;
            margin:0 auto;
            .avatar-wrapper{
                position:relative;
                margin-bottom:22px;
                .show{
                    .avatar-text{
                        display: inline-block;
                        width:70px;
                        height:40px;
                        padding-right:12px;
                        line-height:40px;
                        font-size:14px;
                        box-sizing: border-box;
                        text-align:right;
                        color:#606266;
                    }
                    img{
                        width:150px;
                        height:150px;
                        border-radius:50%;
                    }
                }
                .cropper-wrapper{
                    position:absolute;
                    right:0;
                    bottom:25px;
                    width:30%;
                    height:150px;
                    box-sizing: border-box;
                }
            }
        }

        .back{
            position:absolute;
            top: 30px;
            left:30px;
            width:30px;
            height:30px;
            background:url('../assets/back.png');
            background-repeat: no-repeat;
            background-size: contain;
            transition:all .2s ease-in-out;
            &:hover{
                transform: scale(1.2);
                cursor:pointer;
            }
        }
    }
</style>