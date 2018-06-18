<template>
    <div>
        <HeadTop></HeadTop>
        <div class="main_container">
            <Card title="选择分类" icon="briefcase" class="main_category">
                <Form ref="categoryInformation" :label-width="80">
                    <FormItem label="分类">
                        <Cascader :data='businessGoodsCategory' v-model='category' change-on-select></Cascader>
                    </FormItem>
                    <FormItem label="">
                        <Collapse v-model='addCatPanel'>
                            <Panel name='1'>
                                添加分类
                                <div slot="content">
                                    <Cascader :data='businessGoodsCategory' v-model='businessGoodsNewCategory.parent' change-on-select placeholder="父分类" class="input_item"></Cascader>
                                    <i-input placeholder="商品种类名称" v-model='businessGoodsNewCategory.name' class="input_item"></i-input>
                                    <i-input placeholder="商品种类描述" v-model='businessGoodsNewCategory.description' class="input_item"></i-input>
                                    <!-- S 添加规格分组 -->
                                    <Form :model='businessGoodsNewCategory'>
                                        <FormItem v-for="(item, index) in businessGoodsNewCategory.paramTemplate" :key="index">
                                            <Row>
                                                <i-col span='12'>
                                                    <i-input type='text' v-model='item.group' placeholder='分组名' class="input_item"></i-input>
                                                </i-col>
                                                <i-col span='4' offset="7">
                                                    <Button type="ghost" @click="handleRemove(index)" class="input_item">删除规格分组</Button>
                                                </i-col>
                                            </Row>
                                            <!-- S 添加规格参数 -->
                                            <Form :model='businessGoodsNewCategory.paramTemplate[index]'>
                                                <FormItem v-for="(param, pIndex) in businessGoodsNewCategory.paramTemplate[index].params" :key="pIndex">
                                                    <Row>
                                                        <i-col span='12' offset="3">
                                                            <i-input type='text' v-model='businessGoodsNewCategory.paramTemplate[index].params[pIndex]' placeholder='规格项名称' class="param_item"></i-input>
                                                        </i-col>
                                                        <i-col span='4' offset="3">
                                                            <Button type="ghost" @click="handleRemoveParam(index, pIndex)" class="param_item">删除规格项</Button>
                                                        </i-col>
                                                    </Row>
                                                </FormItem>
                                                <Row>
                                                    <i-col span="12" offset="3">
                                                        <Button type="dashed" long @click="handleAddParam(index)" icon="plus-round" class="param_item">添加规格规格项</Button>
                                                    </i-col>
                                                </Row>
                                            </Form>
                                            <!-- E 添加规格参数-->
                                        </FormItem>
                                        <FormItem>
                                            <Row>
                                                <i-col span="12">
                                                    <Button type="dashed" long @click="handleAdd" icon="plus-round" class="input_item">添加规格分组</Button>
                                                </i-col>
                                            </Row>
                                        </FormItem>
                                    </Form>
                                    <!-- E 添加规格分组 -->
                                    <Button type="ghost" @click='addCat'>添加分类</Button>
                                </div>
                            </Panel>
                        </Collapse>
                    </FormItem>
                </Form>
            </Card>
            <Card title="添加商品" icon="wineglass" class="main_add_goods">
                <Form :label-width="100">
                    <FormItem label="商品名称">
                        <i-input type="text" v-model="businessGoodsNew.name"></i-input>
                    </FormItem>
                    <FormItem label="商品描述">
                        <i-input type="text" v-model="businessGoodsNew.description"></i-input>
                    </FormItem>
                    <FormItem label="商品库存量">
                        <i-input type="text" v-model="businessGoodsNew.stock"></i-input>
                    </FormItem>
                    <FormItem label="零售价格">
                        <i-input type="text" v-model="businessGoodsNew.pricing.retail"></i-input>
                    </FormItem>
                    <FormItem label="批发价格">
                        <i-input type="text" v-model="businessGoodsNew.pricing.sale"></i-input>
                    </FormItem>
                    <div v-if='paramTemplateView'>
                        <h4>商品规格</h4>
                        <div v-for='(item, index) in categoryParamTemplates' :key='index'>
                           <h5>{{ item.group }}</h5>
                           <FormItem :label="param.key" v-for='(param, index2) in item.params' :key='index+index2'>
                                <Row>
                                    <i-col span="12" offset="3">
                                        <i-input type="text" v-model='param.value'></i-input>
                                    </i-col>
                                </Row>
                           </FormItem>
                        </div>
                    </div>
                    <FormItem label="商品图片">
                        <MarketGoodsUploadImage></MarketGoodsUploadImage>
                    </FormItem>
                    <div style="display: flex;justify-content: space-around;">
                        <Button type="primary" @click='handleAddBusinessGoods'>添加商品</Button>
                        <Button type="ghost">重置</Button>
                    </div>
                </Form>
            </Card>
        </div>
    </div>
</template>
<script>
import HeadTop from '@/components/CommonHeadTop'
import MarketGoodsUploadImage from '@/page/MarketGoodsUploadImage'
import {
    businessGoodsNewCategoryAdd,
    getAllBusinessGoodsCategories,
    getBusinessGoodsCategoryParamsTemplateInformationByCategoryId,
    businessGoodsNewGoodsAdd
} from '@/service/businessDataService'
import { getLoginUserFromStorage } from '@/util/storage'
export default {
    data () {
        return {
            loginUser: getLoginUserFromStorage(),
            addCatPanel: '0', // 默认隐藏添加分类信息面板
            // 已经存在的分类信息
            businessGoodsCategory: [],
            // 添加入住商家商品新分类信息
            businessGoodsNewCategory: {
                parent: [], // 添加商品种类时候选择的父分类
                name: '', // 添加的商品种类名称
                description: '', // 添加商品种类的描述
                paramTemplate: [ // 分类规格模板信息
                    {
                        group: '',
                        params: []
                    }
                ]
            },
            // 添加的商场商品信息
            category: [], // 添加商品时候选择的分类
            businessGoodsNew: {
                businessId: '', // 分类所属商家id MongoDB ObjectId
                businessName: '', // 分类所属商家名称
                category: [], // 添加商品时候选择的分类
                name: '',
                description: '',
                stock: 100, // 库存量
                pricing: {
                    retail: 0.0, // 零售价格
                    sale: 0.0 // 批发价格
                },
                details: []
            },
            paramTemplateView: false, // 是否显示规格参数模板
            categoryParamTemplates: [] // 添加商场商品的规格模板 含有参数对应的值
            // [
            //     {
            //         group: '主体',
            //         params: [
            //             {
            //                 key: '保质期',
            //                 value: ''
            //             },
            //             {
            //                 key: '净含量',
            //                 value: ''
            //             },
            //             {
            //                 key: '贮存条件',
            //                 value: ''
            //             },
            //             {
            //                 key: '包装清单',
            //                 value: ''
            //             }
            //         ]
            //     },
            //     {
            //         group: '特色功能',
            //         params: [
            //             {
            //                 key: '净含量',
            //                 value: ''
            //             },
            //             {
            //                 key: '保质期',
            //                 value: ''
            //             }
            //         ]
            //     }
            // ]
        }
    },
    watch: {
        // 如果 category 改变，这个函数会执行 this 指向 vue实例
        category: function () {
            if (this.category.length > 0) { // 选择的分类不为空
                // 根据选择的分类id,获取分类参数模板信息
                this.paramTemplateView = true
                let categoryAndName = this.category[this.category.length - 1] // 取直接分类
                let categoryAndNameArr = categoryAndName.split('|')
                let categoryId = categoryAndNameArr[0]
                console.log(categoryId)
                getBusinessGoodsCategoryParamsTemplateInformationByCategoryId(categoryId).then((response) => {
                    // 获取分类参数模板，并设置相应的值
                    this.categoryParamTemplates = response.data
                })
            } else {
                this.paramTemplateView = false
            }
        }
    },
    methods: {
        /**
         * 添加新分类信息
         */
        addCat () {
            this.addCatPanel = '0' // 关闭添加分类信息面板
            this.businessGoodsNewCategory.businessId = this.loginUser.id
            this.businessGoodsNewCategory.businessName = this.loginUser.username
            console.log(this.businessGoodsNewCategory)
            businessGoodsNewCategoryAdd(this.businessGoodsNewCategory).then(() => {
                this.$Message.success('添加新分类成功')
                // 添加数据后重新设置 businessGoodsCategory
                this.getAllBusinessGoodsCategories()
            }).catch((error) => {
                this.$Message.error('添加新分类失败')
                console.log(error)
            })
        },
        /**
         * 处理删除规格分组
         */
        handleRemove (index) {
            this.businessGoodsNewCategory.paramTemplate.splice(index, 1) // 从指定位置删除一个元素
        },
        /**
         * 处理添加规格分组
         */
        handleAdd () {
            this.businessGoodsNewCategory.paramTemplate.push({
                group: '',
                params: []
            })
        },
        /**
         * 处理删除规格项
         */
        handleRemoveParam (index, pIndex) {
            this.businessGoodsNewCategory.paramTemplate[index].params.splice(pIndex, 1) // 从指定位置删除一个元素
        },
        /**
         * 处理添加规格项
         */
        handleAddParam (index) {
            this.businessGoodsNewCategory.paramTemplate[index].params.push('')
        },
        /**
         * 获取指定商家商品分类信息
         */
        getAllBusinessGoodsCategories () {
            getAllBusinessGoodsCategories(this.loginUser.id).then((response) => {
                this.businessGoodsCategory = Array.prototype.slice.call(response.data.data)
                console.log(this.businessGoodsCategory)
            })
        },
        /**
         * 处理添加商品
         */
        handleAddBusinessGoods () {
            this.businessGoodsNew.businessId = this.loginUser.id
            this.businessGoodsNew.businessName = this.loginUser.username
            this.businessGoodsNew.category = this.category
            this.businessGoodsNew.details = this.categoryParamTemplates
            console.log(this.businessGoodsNew)
            businessGoodsNewGoodsAdd(this.businessGoodsNew).then((response) => {
                console.log('传递商品信息到服务器成功')
                this.$Message.success('添加商品成功')
                console.log(response)
            }).catch((error) => {
                console.log(error)
                this.$Message.error('添加商品失败')
            })
        },
        initData () {
            // businessGoodsCategory =
            // [{
            //     value: '5a5e07d772cb620e64ef485f|食品', // ObjectId
            //     label: '食品',
            //     children: [
            //         {
            //             value: '5a5e07d772cb620e64ef487k|新鲜水果',
            //             label: '新鲜水果',
            //             children: [
            //                 {
            //                     value: '5a5e07d772cb620e64ef488e|苹果',
            //                     label: '苹果',
            //                     children: [
            //                         {
            //                             value: '5a5e07d772cb620e64ef483b|红富士',
            //                             label: '红富士'
            //                         },
            //                         {
            //                             value: '5a5e07d772cb620e64ef483a|青苹果',
            //                             label: '青苹果'
            //                         }
            //                     ]
            //                 }
            //             ]
            //         }
            //     ]
            // }]
            //     备注：“|”为英文状态下"|"
            this.getAllBusinessGoodsCategories()
        }
    },
    components: {
        HeadTop,
        MarketGoodsUploadImage
    },
    created () {
        this.initData()
    }
}
</script>
<style scoped>
.main_container {
    display: flex;
    flex-direction: column;
    min-height: 90vh;
    margin: 0;
}
.main_category {
    margin: 20px auto;
    min-width: 50vw;
}
.main_add_goods {
    margin:0 auto;
    min-width: 50vw;
}
.input_item {
    margin-bottom: 16px;
}
.param_item {
    margin-bottom: 8px;
}
</style>
