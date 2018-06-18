<template>
    <div>
        <HeadTop class="head"></HeadTop>
        <Row>
            <i-col span="18" offset="4">
                <Card title="收款" icon="person-add">
                    <Form ref="marketOrderInformation" :model="marketOrderInformation" :label-width="80">
                        <FormItem
                                v-for="(item, index) in marketOrderInformation.items"
                                v-if="item.status"
                                :key="index"
                                :label="'商品 ' + item.index"
                                :prop="'items.' + index + '.value'"
                                :rules="{required: true, message: 'Item ' + item.index +'商品编号不能为空', trigger: 'blur'}">
                            <Row>
                                <i-col span="11">
                                    <i-input type="text" v-model="item.value" placeholder="输入商品编号"></i-input>
                                </i-col>
                                <i-col span="3" offset="1">
                                    <span>单价</span>
                                    <i-input v-model="item.univalence" :number="true" :readonly="true" style="width: 50%;"></i-input>
                                </i-col>
                                <i-col span="3" offset="1">
                                    <span>数量:</span>
                                    <i-input v-model="item.quantity" :number="true" style="width: 50%;"></i-input>
                                </i-col>
                                <i-col span="4" offset="1">
                                    <Button type="ghost" @click="handleRemove(index)">删除</Button>
                                </i-col>
                            </Row>
                        </FormItem>
                        <FormItem>
                            <Row>
                                <i-col span="12">
                                    <Button type="dashed" long @click="handleAdd" icon="plus-round">添加</Button>
                                </i-col>
                            </Row>
                        </FormItem>
                        <FormItem label="总价">
                            <span v-text="totalPrice"></span>
                        </FormItem>
                        <FormItem label="支付方式">
                            <Select v-model="marketOrderInformation.payment" style="width:200px">
                                <Option v-for="item in payments" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="handleSubmit('marketOrderInformation')">提交</Button>
                            <Button type="ghost" @click="handleReset('marketOrderInformation')" style="margin-left: 8px">重置</Button>
                        </FormItem>
                    </Form>
                </Card>
            </i-col>
        </Row>
    </div>
</template>
<script>
import HeadTop from '@/components/CommonHeadTop'
export default {
    data () {
        return {
            index: 1,
            marketOrderInformation: {
                items: [
                    {
                        value: '', // 商品id
                        index: 1,
                        status: 1,
                        quantity: 1, // 数量
                        univalence: 0.0 // 单价
                    }
                ],
                payment: '现金'
            },
            payments: [
                {
                    value: '现金',
                    label: '现金'
                },
                {
                    value: '微信',
                    label: '微信'
                },
                {
                    value: '支付宝',
                    label: '支付宝'
                }
            ]
        }
    },
    computed: {
        // 订单总额
        totalPrice () {
            return this.marketOrderInformation.items.length
        }
    },
    methods: {
        handleSubmit (marketOrderInformation) {
            this.$refs[marketOrderInformation].validate((valid) => {
                if (valid) {
                    let a = 23.3
                    let b = 40.1
                    let c = (a * 100 + b * 100) / 100
                    this.$Message.success('成功!总价为：' + c)
                } else {
                    this.$Message.error('失败!')
                }
            })
        },
        handleReset (marketOrderInformation) {
            this.$refs[marketOrderInformation].resetFields()
        },
        handleAdd () {
            this.index++
            console.log(this.index)
            this.marketOrderInformation.items.push({
                value: '',
                index: this.index,
                status: 1,
                quantity: 1, // 数量
                univalence: 0.0 // 单价
            })
        },
        handleRemove (index) {
            this.marketOrderInformation.items.splice(index, 1) // 从指定位置删除一个元素
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
