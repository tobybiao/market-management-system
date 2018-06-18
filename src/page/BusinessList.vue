<template>
    <div>
        <HeadTop></HeadTop>
        <div class="main">
            <!-- S 查找 -->
            <div class="search">
                <i-input v-model="keyword" placeholder="输入查找关键字" clearable style="width: 200px"  @on-change="handleKeywordChange" @on-enter="handleFindByUsername"></i-input>
                <Button type="primary" @click="handleFindByUsername">查找</Button>
            </div>
            <!-- E 查找 -->

            <!-- S 表格数据 -->
            <Table stripe :columns="columns" :data="results" class="result_query"></Table>
            <!-- E 表格数据 -->
            <Page :total="count" :page-size='pageSize' show-total show-elevator class='page_query' @on-change="changePage"></Page>

            <!-- S 编辑商家信息 -->
            <Modal
                v-model="dialogFormVisible"
                title="修改商家信息"
                @on-ok="updateBusiness"
                @on-cancel="dialogFormVisible = false">
                <i-form :model="currentRow" label-position="right" :label-width="100">
                    <FormItem label="店铺名称">
                        <i-input v-model="currentRow.businessName"></i-input>
                    </FormItem>
                    <FormItem label="详细地址">
                        <i-input v-model="currentRow.address"></i-input>
                    </FormItem>
                    <FormItem label="店铺介绍">
                        <i-input v-model="currentRow.intro"></i-input>
                    </FormItem>
                    <FormItem label="联系电话">
                        <i-input v-model="currentRow.phone"></i-input>
                    </FormItem>
                    <FormItem label="店铺分类">
                        <Cascader :data="businessCategory" v-model="currentRow.category"></Cascader>
                    </FormItem>
                </i-form>
            </Modal>
            <!-- E 编辑商家信息 -->
        </div>
    </div>
</template>
<script>
import HeadTop from '@/components/CommonHeadTop'
import BusinessExpandRow from '@/page/BusinessListTableExpand'
import {
    getAllBusinessCategories,
    getAllBusinessByPage,
    getAllBusinessByNameAndPage,
    updateBusiness
} from '@/service/dataService'
export default {
    data () {
        return {
            pageChoice: 'all', // 默认查找所有入住商家信息
            dialogFormVisible: false, // Modal 编辑商家信息对话框是否显示
            keyword: '官方旗舰店', // 查找关键字
            columns: [
                {
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        return h(BusinessExpandRow, {
                            props: {
                                row: params.row
                            }
                        })
                    }
                },
                {
                    title: '店铺名称',
                    key: 'businessName'
                },
                {
                    title: '店铺介绍',
                    key: 'intro'
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
                    id: '5a5e07d772cb620e64ef482e',
                    businessName: '潮流男装',
                    intro: '引领男装潮流',
                    address: '1栋大厦001区',
                    phone: '17310266279',
                    rating: 4.7,
                    salesVolume: 200,
                    category: ['服装店', '男装专卖']
                }
            ],
            businessCategory: [{
                value: '5b0de67efcd423273efcd04f|服装店',
                label: '服装店',
                children: [
                    {
                        value: '5b0df5b4fcd40d78c08b2788|男装专卖',
                        label: '男装专卖'
                    },
                    {
                        value: '5b0df735fcd416112670a2b6|女装专卖',
                        label: '女装专卖'
                    }
                ]
            }],
            currentRow: {}, // 当前选择的商家行
            count: 0,
            currentPage: 1,
            pageSize: 5
        }
    },
    components: {
        HeadTop,
        BusinessExpandRow
    },
    created () {
        // 获取后台数据
        this.initData()
    },
    methods: {
        modify (index) {
            this.currentRow = this.results[index]
            this.dialogFormVisible = true
        },
        /**
         * 更新商家信息
         */
        updateBusiness () {
            console.log('更新后数据：')
            console.log(this.currentRow)
            updateBusiness(this.currentRow).then(() => {
                this.$Message.success('修改入住商家信息成功!')
                // 修改成功后重新获取商家列表数据
                this.changePage(this.currentPage)
            }).catch((error) => {
                console.log(error)
                this.$Message.error('修改入住商家信息失败!')
            })
            console.log('更新商家信息完成')
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
                this.getAllBusinessByPage(this.currentPage - 1, this.pageSize)
            } else if (this.pageChoice === 'findByKey') {
                this.getAllBusinessByNameAndPage(this.keyword, this.currentPage - 1, this.pageSize)
            }
        },

        /**
         * 获取入住商家分类信息
         */
        getAllBusinessCategories () {
            getAllBusinessCategories().then((response) => {
                this.businessCategory = Array.prototype.slice.call(response.data.data)
                console.log(this.businessCategory)
            })
        },

        /**
         * 通过分页查看所有入住商家信息
         */
        getAllBusinessByPage (pageIndex, pageSize) {
            getAllBusinessByPage(pageIndex, pageSize).then((response) => {
                this.results = response.data.data.content
                this.count = response.data.data.totalElements
            }).catch((error) => {
                console.log(error)
            })
        },

        /**
         * 通过用户名查找 分页显示
         */
        getAllBusinessByNameAndPage (username, pageIndex, pageSize) {
            getAllBusinessByNameAndPage(username, pageIndex, pageSize).then((response) => {
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
            this.getAllBusinessByNameAndPage(this.keyword, 0, this.pageSize)
        },

        handleKeywordChange (event) {
            console.log('keyword 改变为：')
            console.log(this.keyword)
            if (this.keyword === '' || this.keyword === null || this.keyword.length === 0) { // 清空查找关键字时候查找所有
                this.pageChoice = 'all'
                this.getAllBusinessByPage(0, this.pageSize)
            }
        },

        initData () {
            this.getAllBusinessCategories()
            this.getAllBusinessByPage(0, this.pageSize)
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
