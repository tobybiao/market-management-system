<template>
    <div>
        <HeadTop></HeadTop>
        <div class='main'>
            <!-- S 查找 -->
            <div class='search'>
                <i-input v-model='keyword' placeholder='输入查找关键字' clearable style='width: 200px' @on-change="handleKeywordChange" @on-enter="handleFindByName"></i-input>
                <Button type='primary' @click="handleFindByName">查找</Button>
            </div>
            <!-- E 查找 -->

            <!-- S 表格数据 -->
            <Table stripe :columns='columns' :data='results' class='result_query'></Table>
            <!-- E 表格数据 -->
            <Page :total='count' :page-size='pageSize' :current='currentPage' show-total show-elevator class='page_query' @on-change='changePage'></Page>

            <!-- S 编辑商品信息 -->
            <Modal
                v-model='dialogFormVisible'
                title='修改商品信息'
                @on-ok='updateBusinessGoods'
                @on-cancel='dialogFormVisible = false'>
                <i-form :model='currentRow' label-position='right' :label-width='100'>
                    <FormItem label='商品id'>
                        <i-input v-model='currentRow.id' readonly></i-input>
                    </FormItem>
                    <FormItem label='商品名称'>
                        <i-input v-model='currentRow.name'></i-input>
                    </FormItem>
                    <FormItem label='商品介绍'>
                        <i-input v-model='currentRow.description'></i-input>
                    </FormItem>
                    <FormItem label='商品分类' prop='category'>
                        <Cascader :data='businessGoodsCategory' v-model='currentRow.categoryIdAndName'></Cascader>
                    </FormItem>
                    <FormItem label='商品图片'>
                        <BusinessGoodsUploadImage></BusinessGoodsUploadImage>
                    </FormItem>
                </i-form>
            </Modal>
            <!-- E 编辑商品信息 -->
        </div>
    </div>
</template>
<script>
import HeadTop from '@/components/CommonHeadTop'
import BusinessGoodsListTableExpandRow from '@/page/business/BusinessGoodsListTableExpand'
import BusinessGoodsUploadImage from '@/page/business/BusinessGoodsUploadImage'
import {
    getAllBusinessGoodsCategories,
    getAllBusinessGoodsByPage,
    getAllBusinessGoodsByNameAndPage,
    updateBusinessGoods,
    deleteBusinessGoods
} from '@/service/businessDataService'
import { getLoginUserFromStorage } from '@/util/storage'
export default {
    data () {
        return {
            loginUser: getLoginUserFromStorage(),
            pageChoice: 'all', // 默认查找所有商品信息
            dialogFormVisible: false, // Modal 编辑商家信息对话框是否显示
            keyword: 'T恤', // 查找关键字
            columns: [
                {
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        return h(BusinessGoodsListTableExpandRow, {
                            props: {
                                row: params.row
                            }
                        })
                    }
                },
                {
                    title: '商品名称',
                    key: 'name'
                },
                {
                    title: '商品介绍',
                    key: 'description'
                },
                {
                    title: '库存量',
                    key: 'stock'
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
            // 固定数据，需要获取数据库数据
            results: [
                {
                    id: '6a5e07d772cb620e64ef48ee',
                    sku: '9901',
                    name: '宏辉果蔬 山东烟台红富士苹果 12个 经典80号 约2.6kg 自营水果',
                    description: '宏辉果蔬 山东烟台红富士苹果 12个 经典80号 约2.6kg 自营水果',
                    stock: 250,
                    pricing: {
                        retail: 5990,
                        sale: 2470
                    },
                    category: ['食品', '新鲜水果', '苹果', '红富士'],
                    categoryIdAndName: ['5a5e07d772cb620e64ef485f|男装', '5a5e07d772cb620e64ef485f|T恤'],
                    details: [],
                    tags: ['京东团队', '产地直采', '脆甜多汁', '苹果', '红富士'],
                    thumbs: ['thumb_default.jpg'],
                    imgs: []
                }
            ],
            // 需要获取数据库数据 商家商品分类信息
            businessGoodsCategory: [{
                value: '5a5e07d772cb620e64ef485f|服装', // ObjectId
                label: '服装',
                children: [
                    {
                        value: '5a5e07d772cb620e64ef487k|男装',
                        label: '男装',
                        children: [
                            {
                                value: '5a5e07d772cb620e64ef488e|T恤',
                                label: 'T恤',
                                children: [
                                    {
                                        value: '5a5e07d772cb620e64ef483b|XXXT恤',
                                        label: 'XXXT恤'
                                    },
                                    {
                                        value: '5a5e07d772cb620e64ef483a|YYT恤',
                                        label: 'YYT恤'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }],
            currentRow: {},
            limit: 20,
            count: 0,
            currentPage: 1,
            pageSize: 10
        }
    },
    components: {
        HeadTop,
        BusinessGoodsListTableExpandRow,
        BusinessGoodsUploadImage
    },
    created () {
        // 获取后台数据
        this.initData()
    },
    methods: {
        /**
         * 获取商家商品分类信息
         */
        getAllBusinessGoodsCategories () {
            console.log('获取登录商家信息====商家商品分类：')
            console.log(this.loginUser)
            getAllBusinessGoodsCategories(this.loginUser.id).then((response) => {
                this.businessGoodsCategory = Array.prototype.slice.call(response.data.data)
                console.log(this.businessGoodsCategory)
            })
        },
        /**
         * 通过分页查看商场所有商品信息
         */
        getAllBusinessGoodsByPage (businessId, pageIndex, pageSize) {
            getAllBusinessGoodsByPage(businessId, pageIndex, pageSize).then((response) => {
                this.results = response.data.data.content
                this.count = response.data.data.totalElements
            }).catch((error) => {
                console.log(error)
            })
        },
        /**
         * 通过商品名称查找 分页显示
         */
        getAllBusinessGoodsByNameAndPage (name, businessId, pageIndex, pageSize) {
            getAllBusinessGoodsByNameAndPage(name, businessId, pageIndex, pageSize).then((response) => {
                this.results = response.data.data.content
                this.count = response.data.data.totalElements
            }).catch((error) => {
                console.log(error)
            })
        },
        handleKeywordChange (event) {
            console.log('keyword 改变为：')
            console.log(this.keyword)
            if (this.keyword === '' || this.keyword === null || this.keyword.length === 0) { // 清空查找关键字时候查找所有
                this.currentPage = 1
                this.pageChoice = 'all'
                this.getAllBusinessGoodsByPage(this.loginUser.id, 0, this.pageSize)
            }
        },
        /**
         * 处理查找请求
         */
        handleFindByName () {
            console.log('查找')
            this.currentPage = 1
            this.pageChoice = 'findByKey'
            this.getAllBusinessGoodsByNameAndPage(this.keyword, this.loginUser.id, 0, this.pageSize)
        },
        initData () {
            this.getAllBusinessGoodsCategories()
            this.getAllBusinessGoodsByPage(this.loginUser.id, 0, this.pageSize)
        },
        modify (index) {
            this.currentRow = this.results[index]
            console.log(this.currentRow)
            this.dialogFormVisible = true
        },
        /**
         * 更新商家商品信息
         */
        updateBusinessGoods () {
            updateBusinessGoods(this.currentRow).then(() => {
                this.$Message.success('修改商品信息成功!')
                // 修改成功后重新获取商品列表数据
                this.changePage(this.currentPage)
            }).catch((error) => {
                console.log(error)
                this.$Message.error('修改商品信息失败!')
            })
            console.log('更新商家商品信息完成')
        },
        // 删除点击行
        remove (index) {
            console.log('删除商品index=' + index)
            let delelteItem = this.results[index]
            console.log('删除商品：')
            console.log(delelteItem)
            deleteBusinessGoods(delelteItem.id).then(() => {
                this.$Message.success('删除商品信息成功!')
                // 修改成功后重新获取商品列表数据
                this.changePage(this.currentPage)
            }).catch((error) => {
                console.log(error)
                this.$Message.error('删除商品信息失败!')
            })
            // this.results.splice(index, 1)
            this.count--
        },
        // 处理分页
        changePage (page) {
            console.log('当前页：' + page)
            this.currentPage = page
            if (this.pageChoice === 'all') {
                this.getAllBusinessGoodsByPage(this.loginUser.id, this.currentPage - 1, this.pageSize)
            } else if (this.pageChoice === 'findByKey') {
                this.getAllBusinessGoodsByNameAndPage(this.keyword, this.loginUser.id, this.currentPage - 1, this.pageSize)
            }
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
