<template>
    <div>
        <HeadTop></HeadTop>
        <div class="main_container">
            <Card title="选择分类" icon="briefcase" class="main_category">
                <Form ref="categoryInformation" :label-width="80">
                    <FormItem label="分类">
                        <Cascader :data='marketGoodsCategory' v-model='category_id'></Cascader>
                    </FormItem>
                    <FormItem label="">
                        <Collapse v-model='addCatPanel'>
                            <Panel name='1'>
                                添加分类
                                <div slot="content">
                                    <Cascader :data='marketGoodsCategory' v-model='marketGoodsNewCategory.parent_ids' change-on-select placeholder="父分类" class="input_item"></Cascader>
                                    <i-input placeholder="商品种类名称" v-model='marketGoodsNewCategory.name' class="input_item"></i-input>
                                    <i-input placeholder="商品种类描述" v-model='marketGoodsNewCategory.description' class="input_item"></i-input>
                                    <!-- S 添加规格分组 -->
                                    <Form :model='marketGoodsNewCategory'>
                                        <FormItem v-for="(item, index) in marketGoodsNewCategory.param_template" :key="index">
                                            <Row>
                                                <i-col span='12'>
                                                    <i-input type='text' v-model='item.group' placeholder='分组名' class="input_item"></i-input>
                                                </i-col>
                                                <i-col span='4' offset="7">
                                                    <Button type="ghost" @click="handleRemove(index)" class="input_item">删除规格分组</Button>
                                                </i-col>
                                            </Row>
                                            <!-- S 添加规格参数 -->
                                            <Form :model='marketGoodsNewCategory.param_template[index]'>
                                                <FormItem v-for="(param, pIndex) in marketGoodsNewCategory.param_template[index].params" :key="pIndex">
                                                    <Row>
                                                        <i-col span='12' offset="3">
                                                            <i-input type='text' v-model='marketGoodsNewCategory.param_template[index].params[pIndex]' placeholder='规格项名称' class="param_item"></i-input>
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
                <Form :label-width="80">
                    <FormItem label="商品名称">
                        <i-input type="text" v-model="marketGoodsNew.name"></i-input>
                    </FormItem>
                    <FormItem label="商品描述">
                        <i-input type="text" v-model="marketGoodsNew.description"></i-input>
                    </FormItem>
                    <FormItem label="商品库存量">
                        <i-input type="text" v-model="marketGoodsNew.stock"></i-input>
                    </FormItem>
                    <FormItem label="零售价格">
                        <i-input type="text" v-model="marketGoodsNew.pricing.retail"></i-input>
                    </FormItem>
                    <FormItem label="批发价格">
                        <i-input type="text" v-model="marketGoodsNew.pricing.sale"></i-input>
                    </FormItem>
                    <div v-if='param_template_view'>
                        <h4>商品规格</h4>
                        <div v-for='(item, index) in category_param_templates' :key='index'>
                           <h5>{{ item.group }}</h5>
                           <FormItem :label="param.key" v-for='(param, index2) in item.params' :key='index+index2'>
                               <i-input type="text" v-model='param.value'></i-input>
                           </FormItem>
                        </div>
                    </div>
                    <FormItem label="商品图片">
                        <MarketGoodsUploadImage></MarketGoodsUploadImage>
                    </FormItem>
                    <div style="display: flex;justify-content: space-around;">
                        <Button type="primary" @click='handleAddMarketGoods'>添加商品</Button>
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
    marketGoodsNewCategoryAdd,
    getAllMarketGoodsCategories,
    getMarketGoodsCategoryParamsTemplateInformationByCategoryId,
    marketGoodsNewGoodsAdd
} from '@/service/dataService'
export default {
    data () {
        return {
            addCatPanel: '0', // 默认隐藏添加分类信息面板
            // 已经存在的分类信息
            marketGoodsCategory: [],
            // 添加商场商品分类信息
            marketGoodsNewCategory: {
                parent_ids: [], // 添加商品种类时候选择的父分类
                name: '', // 添加的商品种类名称
                description: '', // 添加商品种类的描述
                param_template: [ // 分类规格模板信息
                    {
                        group: '',
                        params: []
                    }
                ]
            },
            // 添加的商场商品信息
            // 添加商品时候选择的分类id
            category_id: [],
            marketGoodsNew: {
                name: '',
                description: '',
                stock: 250,
                pricing: {
                    retail: 0.0, // 零售价格
                    sale: 0.0 // 批发价格
                }
            },
            param_template_view: false, // 是否显示规格参数模板
            category_param_templates: [] // 添加商场商品的规格模板 含有参数对应的值
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
        // 如果 category_id 改变，这个函数会执行 this 指向 vue实例
        category_id: function () {
            if (this.category_id.length > 0) { // 选择的分类不为空
                // todo 根据选择的分类id,获取分类参数模板信息
                this.param_template_view = true
                let categoryAndName = this.category_id[this.category_id.length - 1]
                let categoryAndNameArr = categoryAndName.split(',')
                let categoryId = categoryAndNameArr[0]
                console.log(categoryId)
                getMarketGoodsCategoryParamsTemplateInformationByCategoryId(categoryId).then((response) => {
                    // 获取分类参数模板，并设置相应的值
                    console.log('响应数据')
                    console.log(response.data)
                    this.category_param_templates = response.data
                })
            } else {
                this.param_template_view = false
            }
        }
    },
    methods: {
        /**
         * 添加新分类信息
         */
        addCat () {
            this.addCatPanel = '0' // 关闭添加分类信息面板
            console.log('添加新分类信息' + this.addCatPanel)
            console.log(this.marketGoodsNewCategory)
            marketGoodsNewCategoryAdd(this.marketGoodsNewCategory).then(() => {
                this.$Message.success('添加新分类成功')
                // 添加数据后重新设置 marketGoodsCategory
                this.getMarketGoodsCategories()
            }).catch((error) => {
                this.$Message.error('添加新分类失败')
                console.log(error)
            })
        },
        /**
         * 处理删除规格分组
         */
        handleRemove (index) {
            this.marketGoodsNewCategory.param_template.splice(index, 1) // 从指定位置删除一个元素
        },
        /**
         * 处理添加规格分组
         */
        handleAdd () {
            this.marketGoodsNewCategory.param_template.push({
                group: '',
                params: []
            })
        },
        /**
         * 处理删除规格项
         */
        handleRemoveParam (index, pIndex) {
            this.marketGoodsNewCategory.param_template[index].params.splice(pIndex, 1) // 从指定位置删除一个元素
        },
        /**
         * 处理添加规格项
         */
        handleAddParam (index) {
            this.marketGoodsNewCategory.param_template[index].params.push('')
        },
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
         * 处理添加商场商品
         */
        handleAddMarketGoods () {
            let marketGoodsInfo = {
                name: this.marketGoodsNew.name,
                description: this.marketGoodsNew.description,
                stock: this.marketGoodsNew.stock,
                details: this.category_param_templates,
                pricing: this.marketGoodsNew.pricing,
                categoryIds: this.category_id
            }
            console.log('收集到的商品信息为：')
            console.log(marketGoodsInfo)
            marketGoodsNewGoodsAdd(marketGoodsInfo).then((response) => {
                console.log('传递商品信息到服务器成功')
                this.$Message.success('添加商品成功')
                console.log(response)
            }).catch((error) => {
                console.log(error)
                this.$Message.error('添加商品失败')
            })
        },
        initData () {
            // this.marketGoodsCategory =
            // [{
            //     value: '5a5e07d772cb620e64ef485f,食品', // ObjectId
            //     label: '食品',
            //     children: [
            //         {
            //             value: '5a5e07d772cb620e64ef487k,新鲜水果',
            //             label: '新鲜水果',
            //             children: [
            //                 {
            //                     value: '5a5e07d772cb620e64ef488e,苹果',
            //                     label: '苹果',
            //                     children: [
            //                         {
            //                             value: '5a5e07d772cb620e64ef483b,红富士',
            //                             label: '红富士'
            //                         },
            //                         {
            //                             value: '5a5e07d772cb620e64ef483a,青苹果',
            //                             label: '青苹果'
            //                         }
            //                     ]
            //                 }
            //             ]
            //         }
            //     ]
            // }]
            this.getMarketGoodsCategories()
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
