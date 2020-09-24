<template>
    <div class="showmsg-wrapper">
        <el-scrollbar style="height:100%" ref="myScrollbar">
            <ul>
                <li v-for="(item, index) in showContent" 
                    :key="index"
                    style="clear:both">
                    <div :class="{Omsg: (!item.isOwner),Mmsg:(item.isOwner)}">
                        <el-popover
                            placement="bottom"
                            title=""
                            width="200"
                            trigger="click"
                            :visible-arrow="false"
                        >  
                            <div class="msg-wrapper">
                            <div class="img-wrapper">
                                <img :src="item.avatar">
                            </div>
                            <div class="sex-nickname-wrapper">
                                <div class="sexsecrecy-wrapper" v-if="item.sex === 2"></div>
                                <div class="male-wrapper" v-else-if="item.sex === 1"></div>
                                <div class="female-wrapper" v-else></div>
                                <div class="nickname-wrapper">{{item.sendName}}</div>
                            </div>
                            <div class="signature-wrapper">{{item.signature || '这人很懒，什么也没有写'}}</div>
                        </div>
                        <div slot="reference" class="uavatar">
                            <img :src="item.avatar"/>
                        </div>
                        </el-popover>

                        <div class="uND">
                            <span class="uName">{{item.sendName}}</span>
                            <span class="uData">{{item.data}}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </el-scrollbar>
    </div>
</template>

<script>
export default {
    name: 'ShowMsg',
    props:["showContent"],
    methods:{
        scrollDown() {
            this.$refs['myScrollbar'].wrap.scrollTop = this.$refs['myScrollbar'].wrap.scrollHeight
        }
    },
    updated(){
        this.scrollDown()
    }
}
</script>

<style lang="less">
// 使滚动条组件不显示横向的滚动条
.el-scrollbar__wrap{
	overflow-x: hidden;
}
    .Omsg{
        position: relative;
        margin-left:20px;
        .uavatar{
            display: inline-block;
            float: left;
            width:70px;
            margin-bottom:5px;
            img{
                width:100%;
                height:100%;
                border-radius:50%;
            }
        }
        .uND{
            display: inline-block;
            padding-left: 10px;
            max-width:300px;
            word-break:break-all;
            .uName{
                display:block;
                padding-left:10px;
            }
            .uData{
                display: block;
                width:auto;
                padding: 5px 10px;
                border-radius: 10px;
                background: #ef8201;
            }
        }
    }
    .Mmsg{
        position: relative;
        float:right;
        margin-right:20px;        
        .uavatar{
            display: inline-block;
            float:right;
            width:70px;
            margin-bottom:5px;

            img{
                width:100%;
                height:100%;
                border-radius:50%;
            }
        }
        .uND{
            display: inline-block;
            max-width:300px;
            word-break:break-all;
            .uName{
                display:block;
                text-align:right;
                padding-right:15px;
            }
            .uData{
                display: block;
                margin-right:10px;
                width:auto;
                padding: 5px 10px;
                border-radius: 10px;
                background: #28ff28;
            }
        }
    }
.el-popover{
    background:#4c4e5b;

    .popper__arrow{
        &::after{
            top: 1px;
            margin-left: -6px;
            border-top-width: 0;
            border-bottom-color: #4c4e5b;
        }
    }
    .msg-wrapper{
        text-align: center;
        color:#dae1eb;
        .img-wrapper{
            display: inline-block;
            width:30%;
            margin-bottom:5px;

            img{
                width:100%;
                height:100%;
                border-radius:50%;
            }
        }

        .sex-nickname-wrapper{
            position:relative;
            width:100%;
            height:16px;
            margin-bottom:10px;
            line-height:16px;
            text-align:center;

            .sexsecrecy-wrapper,.male-wrapper,.female-wrapper{
                display: inline-block;
                width:16px;
                height:16px;
            }

            .sexsecrecy-wrapper{
                background:url('../../assets/sexsecrecy.png');
                background-repeat: no-repeat;
                background-size: cover;
            }

            .male-wrapper{
                background:url('../../assets/male.png');
                background-repeat: no-repeat;
                background-size: cover;
            }

            .female-wrapper{
                background:url('../../assets/female.png');
                background-repeat: no-repeat;
                background-size: cover;
            }

            .nickname-wrapper{
                display: inline-block;
                height:16px;
                margin-left:10px;
            }
        }

        .signature-wrapper{
            width:100%;
            text-align: center;
            font-size:16px;
        }
    }
}

</style>