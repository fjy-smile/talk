<template>
    <div class="index-wrapper">
        <div class="left-wrapper">
            <Title class="left-title"/>
            <List class="left-list"/>
            <Admin class="left-admin"/>
        </div>
        <div class="right-wrapper">
            <router-view />
        </div>
    </div>
</template>

<script>
import Title from './Title'
import List from './List'
import Admin from './Admin'

export default {
    name: 'Index',
    components:{
        Title,
        List,
        Admin
    },
    mounted(){
        this.axios({
            method: 'get',
            url: 'http://47.112.249.51:8199/user/is-login'
        }).then(res => {
            const { status, data:{ code, data:login } } = res
            if(status === 200 && code === 0){
                if(login === false){
                    this.$router.push({ path: `/` });
                }
            }
        })
    }
}
</script>

<style lang="less">
*{
    margin:0;
    padding:0;
}

    .index-wrapper{
        width:80%;
        height:calc(100vh - 20px);
        margin:0 auto;
        box-sizing: border-box;

        .left-wrapper{
            float:left;
            width:28%;
            height:100%;
            margin-right:2%;

            .left-title{
                width:100%;
                height:calc(10vh);
            }

            .left-list{
                width:100%;
                height:calc(59vh);
                margin-bottom:calc(1vh);
                background:#fff;
            }

            .left-admin{
                width:100%;
                height:calc(30vh - 20px);
                background:	#fff;
            }
        }

        .right-wrapper{
            float:right;
            width:70%;
            height:100%;
        }
    }
</style>