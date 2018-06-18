<template>
    <div class="fillcontain">
        <Row style="height: 100%;">
            <!-- S 左边菜单 -->
            <i-col :span="4" style="min-height: 100%; background-color: #324057;">
                <i-menu theme="dark" mode="vertical" width="auto">
                    <menu-item name="1-1">
                        <router-link to="/businessDashboard">首页</router-link>
                    </menu-item>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-paper-outline"></Icon>
                            数据管理
                        </template>
                        <menu-item name="2-1">
                            <router-link to="businessGoodsList">商品列表</router-link>
                        </menu-item>
                        <menu-item name="2-2">
                            <router-link to="businessOrderList">订单列表</router-link>
                        </menu-item>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="plus-round"></Icon>
                            添加数据
                        </template>
                        <menu-item name="3-1">
                            <router-link to="addBusinessGoods">添加商品</router-link>
                        </menu-item>
                    </Submenu>
                    <Submenu name="4">
                        <template slot="title">
                            <Icon type="cash"></Icon>
                            收款
                        </template>
                        <menu-item name="4-1">
                            <router-link to="businessCollection">处理收款</router-link>
                        </menu-item>
                    </Submenu>
                    <Submenu name="5">
                        <template slot="title">
                            <Icon type="ios-analytics"></Icon>
                            图表
                        </template>
                        <menu-item name="5-1">日销量、营业收入</menu-item>
                        <menu-item name="5-2">月销量、营业收入</menu-item>
                        <menu-item name="5-3">季销量、营业收入</menu-item>
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
