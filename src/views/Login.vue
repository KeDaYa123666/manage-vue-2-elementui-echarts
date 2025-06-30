<template>
    <el-form ref="form" class="login-container" :model="form" :rules="rules">
        <h3 class="login_title">系统登录</h3>
        <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="submit" type="primary">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie'
import { getMenu } from '../api/index'

export default {
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, trigger: 'blur', message: '请输入用户名' }
                ],
                password: [
                    { required: true, trigger: 'blur', message: '请输入密码' }
                ]
            }
        }
    },
    methods: {
        //登录
        submit() {
            //token信息
            //const token = Mock.Random.guid()
            //token信息存入cookie用于不同页面间的通信
            //Cookie.set('token',token)

            //校验通过
            this.$refs.form.validate((vaild) => {
                if (vaild) {
                    getMenu(this.form).then(({ data }) => {
                        if (data.code === 20000) {
                            //token信息存入cookie用于不同页面间的通信
                            Cookie.set('token', data.data.token)

                            //获取菜单数据存入store
                            //data.data.menu
                            this.$store.commit('setMenu',data.data.menu)
                            this.$store.commit('addMenu',this.$router)
                            //跳转到首页
                            this.$router.push('/home')
                        }else{
                            this.$message.error(data.data.message)
                        }
                    })
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.login-container {
    width: 350px;
    border: 1px solid red;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
}
</style>