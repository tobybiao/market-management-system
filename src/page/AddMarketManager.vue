<template>
    <div>
        <HeadTop class="head"></HeadTop>
        <Row>
            <i-col span="12" offset="4">
                <Card title="商场管理员" icon="person-add">
                    <Form ref="marketManagerInformation" :model="marketManagerInformation" :rules="ruleValidate" :label-width="80">
                        <FormItem label="管理员名" prop="username">
                            <i-input v-model="marketManagerInformation.username" placeholder="请输入商场管理员名称"></i-input>
                        </FormItem>
                        <FormItem label="详细地址" prop="address">
                            <i-input v-model="marketManagerInformation.address" placeholder="请输入商场管理员地址"></i-input>
                        </FormItem>
                        <FormItem label="联系电话" prop="phone">
                            <i-input v-model="marketManagerInformation.phone" placeholder="请输入商场管理员联系电话"></i-input>
                        </FormItem>
                        <FormItem label="联系邮箱" prop="email">
                            <i-input v-model="marketManagerInformation.email" placeholder="请输入商场管理员邮箱"></i-input>
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
    addMarketManager
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
                    { required: true, message: '商场管理员名不能为空', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '商场管理员邮箱不能为空', trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '商场管理员地址不能为空', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '商场管理员联系电话不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit (marketManagerInformation) {
            this.$refs[marketManagerInformation].validate((valid) => {
                if (valid) {
                    this.addMarketManager(this.marketManagerInformation)
                } else {
                    this.$Message.error('失败!')
                }
            })
        },
        handleReset (marketManagerInformation) {
            this.$refs[marketManagerInformation].resetFields()
        },
        /**
         * 添加商场管理员
         */
        addMarketManager (marketManager) {
            addMarketManager(marketManager).then((response) => {
                this.$Message.success('添加商场管理员成功!')
            }).catch((error) => {
                console.log(error)
                this.$Message.error('添加商场管理员失败!')
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
