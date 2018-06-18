<template>
    <div class="header_container">
        <Breadcrumb separator=">">
            <BreadcrumbItem :to="$route.matched[0].path">首页</BreadcrumbItem>
            <BreadcrumbItem v-for="(item, index) in $route.meta" :key="index">{{item}}</BreadcrumbItem>
        </Breadcrumb>

        <Dropdown class="person" @on-click="handleCommand">
            <a href="javascript:void(0)">
                <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                <Icon type="arrow-down-b"></Icon>
            </a>
            <DropdownMenu slot="list">
                <DropdownItem name="home">首页</DropdownItem>
                <DropdownItem name="signout">退出</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>
<script>
import { accountLogout } from '@/service/dataService'
import { removeLoginUserFromStorage } from '@/util/storage'
export default {
    methods: {
        handleCommand (command) {
            if (command === 'home') {
                // todo 返回用户主页
                this.$router.push(this.$route.matched[0].path)
            } else if (command === 'signout') {
                accountLogout().then(() => {
                    // 清除本地登录信息
                    removeLoginUserFromStorage()
                    this.$router.push('/')
                }).catch((error) => {
                    console.log(error)
                })
            }
        }
    }
}
</script>
<style scoped>
.header_container{
    background-color: #EFF2F7;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
}
.person {
    margin-right: 16px;
}
</style>
