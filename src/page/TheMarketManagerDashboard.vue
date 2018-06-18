<template>
    <div class="fillcontain">
        <Row style="height: 100%;">
            <!-- S 左边菜单 -->
            <i-col :span="4" style="min-height: 100%; background-color: #324057;">
                <i-menu theme="dark" mode="vertical" width="auto">
                    <menu-item name="1-1">
                        <router-link to="/marketManagerDashboard">首页</router-link>
                    </menu-item>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-paper-outline"></Icon>
                            数据管理
                        </template>
                        <menu-item name="2-1">
                            <router-link to="marketGoodsList">商品列表</router-link>
                        </menu-item>
                        <menu-item name="2-2">
                            <router-link to="marketCashierList">商场收银员列表</router-link>
                        </menu-item>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="plus-round"></Icon>
                            添加数据
                        </template>
                        <menu-item name="3-1">
                            <router-link to="addMarketGoods">添加商品</router-link>
                        </menu-item>
                        <menu-item name="3-2">
                            <router-link to="addMarketCashier">添加商场收银员</router-link>
                        </menu-item>
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
