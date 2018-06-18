<template>
    <div class="fillcontain">
        <Row style="height: 100%;">
            <!-- S 左边菜单 -->
            <i-col :span="4" style="min-height: 100%; background-color: #324057;">
                <i-menu theme="dark" mode="vertical" width="auto">
                    <menu-item name="1-1">
                        <router-link to="/adminDashboard">首页</router-link>
                    </menu-item>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-paper-outline"></Icon>
                            数据管理
                        </template>
                        <menu-item name="2-1">
                            <router-link to="businessList">入住商家列表</router-link>
                        </menu-item>
                        <menu-item name="2-2">
                            <router-link to="marketManagerList">商场管理员列表</router-link>
                        </menu-item>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="plus-round"></Icon>
                            添加数据
                        </template>
                        <menu-item name="3-1">
                            <router-link to="addBusiness">添加入住商家</router-link>
                        </menu-item>
                        <menu-item name="3-2">
                            <router-link to="addMarketManager">添加商场管理员</router-link>
                        </menu-item>
                    </Submenu>
                    <Submenu name="4">
                        <template slot="title">
                            <Icon type="ios-analytics"></Icon>
                            图表
                        </template>
                        <menu-item name="4-1">商家利润</menu-item>
                        <menu-item name="4-2">商场利润</menu-item>
                        <menu-item name="4-3">商场销量</menu-item>
                        <menu-item name="4-4">商场总利润</menu-item>
                    </Submenu>
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
