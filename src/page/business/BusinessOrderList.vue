<template>
    <div>
        <HeadTop></HeadTop>
        <div class="main">
            <!-- S 查找 -->
            <div class="search">
                <i-input v-model="keyword" placeholder="输入查找的订单编号" clearable style="width: 200px"  @on-change="handleKeywordChange" @on-enter="handleFindById"></i-input>
                <Button type="primary" @click="handleFindById">查找</Button>
            </div>
            <!-- E 查找 -->

            <!-- S 表格数据 -->
            <Table stripe :columns="columns" :data="results" class="result_query"></Table>
            <!-- E 表格数据 -->
            <Page :total="count" :page-size='pageSize' show-total show-elevator class='page_query' @on-change="changePage"></Page>

            <!-- S 编辑商家信息 -->
            <Modal
                v-model="dialogFormVisible"
                title="修改订单信息"
                @on-ok="updateBusinessOrder"
                @on-cancel="dialogFormVisible = false">
                <i-form :model="currentRow" label-position="right" :label-width="100">
                    <FormItem label="订单编号">
                        <i-input v-model="currentRow.id"></i-input>
                    </FormItem>
                    <FormItem label="订单总额">
                        <i-input v-model="currentRow.totalAmount"></i-input>
                    </FormItem>
                    <FormItem label="支付方式">
                        <i-input v-model="currentRow.payment"></i-input>
                    </FormItem>
                    <FormItem label="订单日期">
                        <i-input v-model="currentRow.createTime"></i-input>
                    </FormItem>
                </i-form>
            </Modal>
            <!-- E 编辑商家信息 -->
        </div>
    </div>
</template>
<script>
// import { mapState } from 'vuex'
import HeadTop from '@/components/CommonHeadTop'
import BusinessOrderExpandRow from '@/page/business/BusinessOrderExpand'
import {
    getBusinessOrderByPage
} from '@/service/businessDataService'
import { getLoginUserFromStorage } from '@/util/storage'
export default {
    data () {
        return {
            loginUser: getLoginUserFromStorage(),
            pageChoice: 'all', // 默认查找所有入住商家信息
            dialogFormVisible: false, // Modal 编辑商家信息对话框是否显示
            keyword: '', // 查找关键字
            columns: [
                {
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        return h(BusinessOrderExpandRow, {
                            props: {
                                items: params.row.items
                            }
                        })
                    }
                },
                {
                    title: '订单编号',
                    key: 'id'
                },
                {
                    title: '订单总额',
                    key: 'totalAmount'
                },
                {
                    title: '创建日期',
                    key: 'createTime'
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
                            }, '编辑'),
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
            results: [
                {
                    id: '5a5e07d772cb620e64ef482e', // 订单编号
                    totalAmount: 20000, // 订单总额
                    payment: '现金', // 支付方式
                    items: [ // 订单包含的商品项
                        {
                            id: '5b11ea59cdb0502a1b570df6', // 商品id mongodb ObjectId
                            name: '男装 DRY-EX V领T恤(短袖) 404148 优衣库UNIQLO', // 商品的名称
                            sku: '901366277776527256', // 商品的sku编号
                            quantity: 2, // 数量
                            univalence: 7900 // 单价
                        },
                        {
                            id: '5b11ebcbcdb077e89649f2a2', // 商品id mongodb ObjectId
                            name: '男装 DRY-EX圆领T恤(短袖) 406888 优衣库UNIQLO', // 商品的名称
                            sku: '905066477704762422', // 商品的sku编号
                            quantity: 3, // 数量
                            univalence: 9900 // 单价
                        }
                    ],
                    createTime: '2017-06-08 16:32:24' // 订单创建时间
                }
            ],
            currentRow: {}, // 当前选择的订单行
            count: 0,
            currentPage: 1,
            pageSize: 4
        }
    },
    // computed: {
    //     ...mapState({
    //         loginUser: state => state.loginUser
    //     })
    // },
    components: {
        HeadTop,
        BusinessOrderExpandRow
    },
    created () {
        // 获取后台数据
        // this.results = new Array(50).fill(this.results[0])
        // this.count = this.results.length
        this.initData()
    },
    methods: {
        modify (index) {
            this.currentRow = this.results[index]
            // console.log(this.currentRow)
            this.dialogFormVisible = true
        },
        // 删除点击行
        remove (index) {
            this.results.splice(index, 1)
            this.count--
        },
        // 处理分页
        changePage (page) {
            console.log(page)
            this.currentPage = page
            if (this.pageChoice === 'all') {
                this.getBusinessOrderByPage(this.currentPage - 1, this.pageSize)
            } else if (this.pageChoice === 'findByKey') {
                // this.getAllBusinessByNameAndPage(this.keyword, this.currentPage - 1, this.pageSize)
            }
        },

        /**
         * 通过分页查看所有入住商家订单信息
         */
        getBusinessOrderByPage (pageIndex, pageSize) {
            let businessId = this.loginUser.id
            getBusinessOrderByPage(businessId, pageIndex, pageSize).then((response) => {
                this.results = response.data.data.content
                this.count = response.data.data.totalElements
            }).catch((error) => {
                console.log(error)
            })
        },

        /**
         * 处理查找请求
         */
        handleFindById () {
            console.log('查找')
            this.currentPage = 1
            // this.pageChoice = 'findByKey'
            // this.getAllBusinessByNameAndPage(this.keyword, 0, this.pageSize)
        },

        handleKeywordChange (event) {
            console.log('keyword 改变为：')
            console.log(this.keyword)
            if (this.keyword === '' || this.keyword === null || this.keyword.length === 0) { // 清空查找关键字时候查找所有
                this.pageChoice = 'all'
                this.getBusinessOrderByPage(0, this.pageSize)
            }
        },
        updateBusinessOrder () {
            console.log('更新订单信息')
            this.$Message.success('更新订单信息成功!')
        },
        initData () {
            // this.getAllBusinessCategories()
            // this.getAllBusinessByPage(0, this.pageSize)
            this.getBusinessOrderByPage(0, this.pageSize)
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
