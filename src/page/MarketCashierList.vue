<template>
    <div>
        <HeadTop></HeadTop>
        <div class="main">
            <!-- S 查找 -->
            <div class="search">
                <i-input v-model="keyword" placeholder="输入查找关键字" clearable style="width: 200px" @on-enter="handleFindByUsername" @on-change="handleKeywordChange"></i-input>
                <Button type="primary" @click="handleFindByUsername">查找</Button>
            </div>
            <!-- E 查找 -->

            <!-- S 表格数据 -->
            <Table stripe :columns="columns" :data="results" class="result_query"></Table>
            <!-- E 表格数据 -->
            <Page :total="count" show-total :page-size='pageSize' show-elevator class='page_query' @on-change="changePage"></Page>
            <!-- S 修改商场收银员信息 -->
            <Modal
                v-model="dialogFormVisible"
                title="修改商场管理员信息"
                @on-ok="updateMarketCashier"
                @on-cancel="dialogFormVisible = false">
                <i-form :model="currentRow" label-position="right" :label-width="100">
                    <FormItem label="用户名">
                        <i-input v-model="currentRow.username"></i-input>
                    </FormItem>
                    <FormItem label="详细地址">
                        <i-input v-model="currentRow.address"></i-input>
                    </FormItem>
                    <FormItem label="电子邮箱">
                        <i-input v-model="currentRow.email"></i-input>
                    </FormItem>
                    <FormItem label="手机">
                        <i-input v-model="currentRow.phone"></i-input>
                    </FormItem>
                </i-form>
            </Modal>
            <!-- E 修改商场收银员信息 -->
        </div>
    </div>
</template>
<script>
import HeadTop from '@/components/CommonHeadTop'
import {
    getAllmarketCashiersByPage,
    getAllmarketCashiersByNameAndPage
} from '@/service/dataService'
export default {
    data () {
        return {
            pageChoice: 'all', // 默认查找所有收银员信息
            keyword: 'tom', // 查找关键字
            dialogFormVisible: false, // 是否显示修改商场管理员信息对话框
            columns: [
                {
                    title: '用户名',
                    key: 'username'
                },
                {
                    title: '手机',
                    key: 'phone'
                },
                {
                    title: '邮箱',
                    key: 'email'
                },
                {
                    title: '地址',
                    key: 'address'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.modify(params.index)
                                    }
                                }
                            }, '修改'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index)
                                    }
                                }
                            }, '删除')
                        ])
                    }
                }
            ],
            // 从后台服务获取数据
            results: [
                {
                    _id: '5a5e07d772cb620e64ef482e',
                    username: 'kbanker',
                    email: 'kylebanker@gmail.com',
                    address: '河北廊坊三河燕郊开发区学院大街467号',
                    phone: '15766589653'
                }
            ],
            currentRow: {},
            offset: 0,
            limit: 20,
            count: 0,
            currentPage: 1,
            pageSize: 8
        }
    },
    components: {
        HeadTop
    },
    created () {
        // 获取后台数据
        // this.results = new Array(50).fill(this.results[0])
        // this.count = this.results.length
        this.initData()
    },
    methods: {
        modify (index) {
            this.currentRow = this.results[index] // 获取选择的行数据
            this.dialogFormVisible = true
        },
        // todo 修改商场收银员信息
        updateMarketCashier () {
            console.log('修改商场收银员信息')
        },
        // todo 删除点击行
        remove (index) {
            this.results.splice(index, 1)
            this.count--
        },
        // 处理分页
        changePage (page) {
            console.log('当前页：' + page)
            this.currentPage = page
            if (this.pageChoice === 'all') {
                this.getAllMarketCashiersByPage(this.currentPage - 1, this.pageSize)
            } else if (this.pageChoice === 'findByKey') {
                this.getAllmarketCashiersByUsernameAndPage(this.keyword, this.currentPage - 1, this.pageSize)
            }
        },
        handleKeywordChange (event) {
            console.log('keyword 改变为：')
            console.log(this.keyword)
            if (this.keyword === '' || this.keyword === null || this.keyword.length === 0) { // 清空查找关键字时候查找所有
                this.pageChoice = 'all'
                this.getAllMarketCashiersByPage(0, this.pageSize)
            }
        },
        /**
         * 通过分页查看商场所有收银员信息
         */
        getAllMarketCashiersByPage (pageIndex, pageSize) {
            getAllmarketCashiersByPage(pageIndex, pageSize).then((response) => {
                this.results = response.data.data.content
                this.count = response.data.data.totalElements
            }).catch((error) => {
                console.log(error)
            })
        },
        /**
         * 通过用户名查找 分页显示
         */
        getAllmarketCashiersByUsernameAndPage (username, pageIndex, pageSize) {
            getAllmarketCashiersByNameAndPage(username, pageIndex, pageSize).then((response) => {
                this.results = response.data.data.content
                this.count = response.data.data.totalElements
            }).catch((error) => {
                console.log(error)
            })
        },
        /**
         * 处理查找请求
         */
        handleFindByUsername () {
            console.log('查找')
            this.currentPage = 1
            this.pageChoice = 'findByKey'
            this.getAllmarketCashiersByUsernameAndPage(this.keyword, 0, this.pageSize)
        },
        initData () {
            this.getAllMarketCashiersByPage(0, this.pageSize)
        }
    }
}
</script>
<style scoped>
.main {
    margin-left: 24px;
    margin-top: 24px;
}
.search {
    max-width: 260px;
    margin: 0 auto;
}
.result_query{
    margin-top: 20px;
}
.page_query {
    margin-top: 20px;
    margin-bottom: 24px;
}
</style>
