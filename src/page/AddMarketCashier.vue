<template>
    <div>
        <HeadTop class="head"></HeadTop>
        <Row>
            <i-col span="12" offset="4">
                <Card title="商场收银员" icon="person-add">
                    <Form ref="marketManagerInformation" :model="marketManagerInformation" :rules="ruleValidate" :label-width="100">
                        <FormItem label="商场收银员名" prop="username">
                            <i-input v-model="marketManagerInformation.username" placeholder="请输入商场收银员名称"></i-input>
                        </FormItem>
                        <FormItem label="详细地址" prop="address">
                            <i-input v-model="marketManagerInformation.address" placeholder="请输入商场收银员地址"></i-input>
                        </FormItem>
                        <FormItem label="联系电话" prop="phone">
                            <i-input v-model="marketManagerInformation.phone" placeholder="请输入商场收银员联系电话"></i-input>
                        </FormItem>
                        <FormItem label="联系邮箱" prop="email">
                            <i-input type="email" v-model="marketManagerInformation.email" placeholder="请输入商场收银员邮箱"></i-input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="handleSubmit('marketManagerInformation')">提交</Button>
                            <Button type="ghost" @click="handleReset('marketManagerInformation')" style="margin-left: 8px">重置</Button>
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
    addMarketCashier
} from '@/service/dataService'
export default {
    data () {
        return {
            marketManagerInformation: {
                username: '',
                email: '',
                address: '',
                phone: ''
            },
            ruleValidate: {
                username: [
                    { required: true, message: '商场收银员名不能为空', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '商场收银员邮箱不能为空', trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '商场收银员地址不能为空', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '商场收银员联系电话不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit (marketManagerInformation) {
            this.$refs[marketManagerInformation].validate((valid) => {
                if (valid) {
                    // this.$Message.success('成功!')
                    this.addMarketCashier(this.marketManagerInformation)
                } else {
                    this.$Message.error('失败!')
                }
            })
        },
        handleReset (marketManagerInformation) {
            this.$refs[marketManagerInformation].resetFields()
        },
        /**
         * 添加商场收银员
         */
        addMarketCashier (marketCashier) {
            addMarketCashier(marketCashier).then((response) => {
                this.$Message.success('添加商场收银员成功!')
            })
        }
    },
    components: {
        HeadTop
    }
}
</script>
<style scoped>
    .head {
        margin-bottom: 20px;
    }
</style>
