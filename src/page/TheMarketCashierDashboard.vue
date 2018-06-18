<template>
    <div class="fillcontain">
        <Row style="height: 100%;">
            <!-- S 左边菜单 -->
            <i-col :span="4" style="min-height: 100%; background-color: #324057;">
                <i-menu theme="dark" mode="vertical" width="auto">
                    <menu-item name="1-1">
                        <router-link to="/marketCashierDashboard">首页</router-link>
                    </menu-item>
                    <menu-item name="2-1">
                            <router-link to="marketCashierCollection">收款</router-link>
                    </menu-item>
                </i-menu>
            </i-col>
            <!-- E 左边菜单 -->

            <!-- S 右边主要内容 -->
            <i-col :span="20" style="height: 100%;overflow: auto;">
                <transition>
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </i-col>
            <!-- E 右边主要内容 -->
        </Row>
    </div>
</template>
<script>
export default {
}
</script>
<style scoped>
.fillcontain{
    height: 100%;
    width: 100%;
}
a {
    color: #fff;
}
</style>
