<template>
    <div>
        <HeadTop class="head"></HeadTop>
        <Row>
            <i-col span="12" offset="4">
                <Card title="店铺" icon="android-home">
                    <Form ref="businessInformation" :model="businessInformation" :rules="ruleValidate" :label-width="80">
                        <FormItem label="店铺名称" prop="businessName">
                            <i-input v-model="businessInformation.businessName" placeholder="请输入店铺名称"></i-input>
                        </FormItem>
                        <FormItem label="详细地址" prop="address">
                            <i-input v-model="businessInformation.address" placeholder="请输入店铺地址"></i-input>
                        </FormItem>
                        <FormItem label="联系电话" prop="phone">
                            <i-input v-model="businessInformation.phone" placeholder="请输入店铺联系电话"></i-input>
                        </FormItem>
                        <FormItem label="店铺介绍" prop="intro">
                            <i-input v-model="businessInformation.intro" placeholder="请输入店铺介绍"></i-input>
                        </FormItem>
                        <FormItem label="店铺评分" prop="rating">
                            <i-input v-model="businessInformation.rating"></i-input>
                        </FormItem>
                        <FormItem label="店铺分类" prop="category">
                            <Cascader :data="businessCategory" change-on-select v-model="businessInformation.category"></Cascader>
                        </FormItem>
                        <Collapse v-model='addCatPanel' style="margin-bottom: 16px">
                            <Panel name="1">
                                添加分类
                                <div slot="content">
                                    <Cascader :data="businessCategory" v-model="newBusinessCategory.parents" change-on-select placeholder="父分类" class="input_item"></Cascader>
                                    <i-input v-model="newBusinessCategory.name" placeholder="分类名称" class="input_item"></i-input>
                                    <i-input v-model="newBusinessCategory.description" placeholder="分类描述" class="input_item"></i-input>
                                    <Button type="dashed" @click="addCategory">添加分类</Button>
                                </div>
                            </Panel>
                        </Collapse>
                        <FormItem>
                            <Button type="primary" @click="handleSubmit('businessInformation')">提交</Button>
                            <Button type="ghost" @click="handleReset('businessInformation')" style="margin-left: 8px">重置</Button>
                        </FormItem>
                    </Form>
                </Card>
            </i-col>
        </Row>
    </div>
</template>
<script>
import HeadTop from '@/components/CommonHeadTop'
import {
    businessCategoryAdd,
    getAllBusinessCategories,
    addBusiness
} from '@/service/dataService'
export default {
    data () {
        return {
            addCatPanel: '0', // 默认隐藏添加分类信息面板
            businessInformation: {
                businessName: '',
                intro: '',
                address: '',
                phone: '',
                rating: 4.5,
                category: []
            },
            newBusinessCategory: {
                name: '',
                description: '',
                parents: []
            },
            businessCategory: [{
                value: '5a5e07d772cb620e64ef485f|服饰',
                label: '服饰',
                children: [
                    {
                        value: '5a5e07d772cb620e64ef482e|男装',
                        label: '男装'
                    },
                    {
                        value: '5a5e07d772cb620e64ef482f|女装',
                        label: '女装'
                    }
                ]
            }],
            ruleValidate: {
                businessName: [
                    { required: true, message: '店铺名称不能为空', trigger: 'blur' }
                ],
                intro: [
                    { required: true, message: '店铺介绍不能为空', trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '店铺地址不能为空', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '店铺联系电话不能为空', trigger: 'blur' }
                ],
                category: [
                    { type: 'array', required: true, message: '分类不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit (businessInformation) {
            this.$refs[businessInformation].validate((valid) => {
                if (valid) {
                    this.addBusiness(this.businessInformation)
                } else {
                    this.$Message.error('失败!')
                }
            })
        },
        handleReset (businessInformation) {
            this.$refs[businessInformation].resetFields()
        },
        /**
         * 添加商家分类
         */
        addCategory () {
            this.addCatPanel = '0' // 关闭添加分类信息面板
            console.log('新商家分类')
            console.log(this.newBusinessCategory)
            businessCategoryAdd(this.newBusinessCategory).then(() => {
                this.$Message.success('添加新分类成功')
                // todo 添加数据后重新设置 businessCategory
                this.getAllBusinessCategories()
            }).catch((error) => {
                this.$Message.error('添加新分类失败')
                console.log(error)
            })
        },
        /**
         * 获取商场商品分类信息
         */
        getAllBusinessCategories () {
            getAllBusinessCategories().then((response) => {
                this.businessCategory = Array.prototype.slice.call(response.data.data)
                console.log(this.businessCategory)
            })
        },

        /**
         * 添加入住商家
         */
        addBusiness (business) {
            addBusiness(business).then((response) => {
                this.$Message.success('添加入住商家成功!')
            }).catch((error) => {
                console.log(error)
                this.$Message.error('添加入住商家失败!')
            })
        },
        initData () {
            this.getAllBusinessCategories()
        }
    },
    components: {
        HeadTop
    },
    created () {
        this.initData()
    }
}
</script>
<style scoped>
    .head {
        margin-bottom: 20px;
    }
    .input_item {
        margin-bottom: 16px;
    }
</style>
