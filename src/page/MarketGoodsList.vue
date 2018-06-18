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
            <Page :total='count' :page-size='pageSize' show-total show-elevator class='page_query' @on-change='changePage'></Page>

            <!-- S 编辑商品信息 -->
            <Modal
                v-model='dialogFormVisible'
                title='修改商品信息'
                @on-ok='updateMarketGoods'
                @on-cancel='dialogFormVisible = false'>
                <i-form :model='currentRow' label-position='right' :label-width='100'>
                    <FormItem label='商品名称'>
                        <i-input v-model='currentRow.name'></i-input>
                    </FormItem>
                    <FormItem label='商品介绍'>
                        <i-input v-model='currentRow.description'></i-input>
                    </FormItem>
                    <FormItem label='商品分类' prop='category'>
                        <Cascader :data='marketGoodsCategory' v-model='currentRow.category'></Cascader>
                    </FormItem>
                    <FormItem label='商品图片'>
                        <MarketGoodsUploadImage></MarketGoodsUploadImage>
                    </FormItem>
                </i-form>
            </Modal>
            <!-- E 编辑商品信息 -->
        </div>
    </div>
</template>
<script>
import HeadTop from '@/components/CommonHeadTop'
import MarketGoodsListTableExpandRow from '@/page/MarketGoodsListTableExpand'
import MarketGoodsUploadImage from '@/page/MarketGoodsUploadImage'
import {
    getAllMarketGoodsCategories,
    getAllMarketGoods,
    getAllMarketGoodsByPage,
    getAllMarketGoodsByNameAndPage
} from '@/service/dataService'
export default {
    data () {
        return {
            pageChoice: 'all', // 默认查找所有商品信息
            dialogFormVisible: false, // Modal 编辑商家信息对话框是否显示
            keyword: '酒', // 查找关键字
            columns: [
                {
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        return h(MarketGoodsListTableExpandRow, {
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
            // todo 固定数据，需要获取数据库数据
            results: [
                {
                    _id: '6a5e07d772cb620e64ef48ee',
                    sku: '9901',
                    name: '宏辉果蔬 山东烟台红富士苹果 12个 经典80号 约2.6kg 自营水果',
                    description: '宏辉果蔬 山东烟台红富士苹果 12个 经典80号 约2.6kg 自营水果',
                    stock: 220,
                    pricing: {
                        retail: 5990,
                        sale: 2470
                    },
                    category: ['5a5e07d772cb620e64ef485f', '5a5e07d772cb620e64ef487k', '5a5e07d772cb620e64ef488e', '5a5e07d772cb620e64ef483b'],
                    categoryLabel: ['食品', '新鲜水果', '苹果', '红富士'], // todo 根据重新选择的分类动态跟新，目前思路有两种： 前端运算；后端运算返回结果动态更新
                    primaryCategory: {
                        _id: '5a5e07d772cb620e64ef483b',
                        name: '红富士'
                    },
                    categoryAncestors: [
                        {
                            name: '食品',
                            _id: '5a5e07d772cb620e64ef485f'
                        },
                        {
                            name: '新鲜水果',
                            _id: '5a5e07d772cb620e64ef487k'
                        },
                        {
                            name: '苹果',
                            _id: '5a5e07d772cb620e64ef488e'
                        }
                    ],
                    tags: ['京东团队', '产地直采', '脆甜多汁', '苹果', '红富士'],
                    thumbs: ['thumb_default.jpg'],
                    imgs: []
                }
            ],
            // 固定数据，需要获取数据库数据 商场商品分类信息
            marketGoodsCategory: [{
                value: '5a5e07d772cb620e64ef485f', // ObjectId
                label: '食品',
                children: [
                    {
                        value: '5a5e07d772cb620e64ef487k',
                        label: '新鲜水果',
                        children: [
                            {
                                value: '5a5e07d772cb620e64ef488e',
                                label: '苹果',
                                children: [
                                    {
                                        value: '5a5e07d772cb620e64ef483b',
                                        label: '红富士'
                                    },
                                    {
                                        value: '5a5e07d772cb620e64ef483a',
                                        label: '青苹果'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }],
            currentRow: {},
            offset: 0,
            limit: 20,
            count: 0,
            currentPage: 1,
            pageSize: 8
        }
    },
    components: {
        HeadTop,
        MarketGoodsListTableExpandRow,
        MarketGoodsUploadImage
    },
    created () {
        // 获取后台数据
        this.initData()
    },
    methods: {
        /**
         * 获取商场商品分类信息
         */
        getMarketGoodsCategories () {
            getAllMarketGoodsCategories().then((response) => {
                this.marketGoodsCategory = Array.prototype.slice.call(response.data.data)
                console.log(this.marketGoodsCategory)
            })
        },
        /**
         * 获取商场所有商品
         */
        getAllMarketGoods () {
            getAllMarketGoods().then((response) => {
                this.results = response.data.data
                this.count = this.results.length
            }).catch((error) => {
                console.log(error)
            })
        },
        /**
         * 通过分页查看商场所有商品信息
         */
        getAllMarketGoodsByPage (pageIndex, pageSize) {
            getAllMarketGoodsByPage(pageIndex, pageSize).then((response) => {
                this.results = response.data.data.content
                this.count = response.data.data.totalElements
            }).catch((error) => {
                console.log(error)
            })
        },
        /**
         * 通过商品名称查找 分页显示
         */
        getAllMarketGoodsByNameAndPage (name, pageIndex, pageSize) {
            getAllMarketGoodsByNameAndPage(name, pageIndex, pageSize).then((response) => {
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
                this.pageChoice = 'all'
                this.getAllMarketGoodsByPage(0, this.pageSize)
            }
        },
        /**
         * 处理查找请求
         */
        handleFindByName () {
            console.log('查找')
            this.currentPage = 1
            this.pageChoice = 'findByKey'
            this.getAllMarketGoodsByNameAndPage(this.keyword, 0, this.pageSize)
        },
        initData () {
            this.getMarketGoodsCategories()
            // this.getAllMarketGoods()
            this.getAllMarketGoodsByPage(0, this.pageSize)
        },
        modify (index) {
            this.currentRow = this.results[index]
            console.log(this.currentRow)
            this.dialogFormVisible = true
        },
        /** todo
         * 更新商家信息
         */
        updateMarketGoods () {
            console.log('更新商品信息完成')
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
                this.getAllMarketGoodsByPage(this.currentPage - 1, this.pageSize)
            } else if (this.pageChoice === 'findByKey') {
                this.getAllMarketGoodsByNameAndPage(this.keyword, this.currentPage - 1, this.pageSize)
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
