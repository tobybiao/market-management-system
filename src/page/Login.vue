<template>
    <div class="fillcontain">
        <div class="login">
            <h2 class="login_form_title">华贸商场后台管理系统</h2>
            <Form ref="loginForm" :model="loginForm" :rules="loginFormRule" :label-width="80">
                <FormItem label="用户名" prop="username">
                    <i-input type="text" v-model="loginForm.username" name="username"></i-input>
                </FormItem>
                <FormItem label="密码" prop="passwd">
                    <i-input type="password" v-model="loginForm.passwd" name="password"></i-input>
                </FormItem>
                <FormItem label="身份" prop="userType">
                    <Select v-model="loginForm.userType" name="userType">
                        <Option v-for="item in userTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('loginForm')">登录</Button>
                    <Button type="ghost" @click="handleReset('loginForm')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { accountLogin } from '@/service/dataService'
import { saveLoginUserToStorage } from '@/util/storage'
export default {
    data () {
        const validateUsername = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名...'))
            } else {
                callback()
            }
        }
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码...'))
            } else {
                callback()
            }
        }
        return {
            loginForm: {
                username: '',
                passwd: '',
                userType: 'business'
            },
            loginFormRule: {
                username: [
                    { validator: validateUsername, trigger: 'blur' }
                ],
                passwd: [
                    { validator: validatePass, trigger: 'blur' }
                ]
            },
            userTypeList: [
                {
                    value: 'business',
                    label: '商家'
                },
                {
                    value: 'marketManager',
                    label: '商场管理员'
                },
                {
                    value: 'marketCashier',
                    label: '收银员'
                },
                {
                    value: 'admin',
                    label: '管理员'
                }
            ]
        }
    },
    methods: {
        /**
         * 处理登录
         */
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    accountLogin(this.loginForm.username, this.loginForm.passwd, this.loginForm.userType)
                        .then((response) => {
                            if (response.data.data) {
                                // 登录成功把登录用户信息用Vuex 保存起来
                                let loginUser = {
                                    id: response.data.data.id,
                                    username: this.loginForm.username,
                                    userType: this.loginForm.userType
                                }
                                this.rememberLoginUser({
                                    loginUser
                                })
                                // 把登陆信息保存到 Storage 中
                                saveLoginUserToStorage(loginUser)
                                this.$Message.success('登录成功!')
                                switch (this.loginForm.userType) {
                                    case 'admin':
                                        this.$router.push('/adminDashboard')
                                        break
                                    case 'marketManager':
                                        this.$router.push('/marketManagerDashboard')
                                        break
                                    case 'marketCashier':
                                        this.$router.push('/marketCashierDashboard')
                                        break
                                    case 'business':
                                        this.$router.push('/businessDashboard')
                                        break
                                    default:
                                        console.log('不存在这种身份登录')
                                }
                            } else {
                                this.$Message.error(response.data.message)
                                console.log('登录失败')
                            }
                        }).catch((error) => {
                            this.$Message.error('登录失败!')
                            console.log(error)
                        })
                } else {
                    this.$Message.error('Fail!')
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields()
        },
        ...mapMutations({
            rememberLoginUser: 'USER_LOGIN' // 将 `this.rememberLoginUser()` 映射为 `this.$store.commit('USER_LOGIN')`
        })
    }
}
</script>
<style scoped>
    .fillcontain {
        width: 100vw;
        height: 100vh;
        background-image: url("../assets/background.jpg");
        background-repeat: no-repeat;
        /*background-size:contain;*/
        background-size: cover;
    }
    .login_form_title {
        color: #fff;
        position: absolute;
        width: 100%;
        top: -100px;
        font-size: 30px;
        text-align: center;
    }
    /* 水平、垂直居中 */
    .login {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        min-width: 340px;
        padding: 28px 35px 10px 2px;
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.62);
    }
</style>
