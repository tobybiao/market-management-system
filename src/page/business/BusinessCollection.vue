<template>
    <div>
        <HeadTop class="head"></HeadTop>
        <Row>
            <i-col span="18" offset="4">
                <Card title="收款" icon="person-add">
                    <Form ref="businessOrderInformation" :model="businessOrderInformation" :label-width="80">
                        <FormItem
                                v-for="(item, index) in businessOrderInformation.items"
                                v-if="item.status"
                                :key="index"
                                :label="'商品 ' + item.index"
                                :prop="'items.' + index + '.value'"
                                :rules="{required: true, message: 'Item ' + item.index +'商品编号不能为空', trigger: 'blur'}">
                            <Row>
                                <i-col span="5">
                                    <i-input type="text" v-model="item.value" placeholder="输入商品编号" @on-blur="getGoodsItemInform(index)"></i-input>
                                </i-col>
                                <i-col span="5" offset="1">
                                    <span>{{item.name}}</span>
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
                            <Select v-model="businessOrderInformation.payment" style="width:200px">
                                <Option v-for="item in payments" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="handleSubmit('businessOrderInformation')">提交</Button>
                            <Button type="ghost" @click="handleReset('businessOrderInformation')" style="margin-left: 8px">重置</Button>
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
    getBusinessGoodsBySku,
    businessOrder
} from '@/service/businessDataService'
import { getLoginUserFromStorage } from '@/util/storage'
export default {
    data () {
        return {
            loginUser: getLoginUserFromStorage(),
            index: 1,
            businessOrderInformation: {
                items: [
                    {
                        id: '', // 商品id mongodb ObjectId
                        name: '', // 商品的名称
                        value: '', // 商品的sku编号
                        index: 1,
                        status: 1,
                        quantity: 1, // 数量
                        univalence: 0.0 // 单价
                    }
                ],
                payment: '现金',
                businessId: '', // 收款商家id mongoDB ObjectId
                businessName: '' // 收款商家名称
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
            let sum = 0
            for (var i = this.businessOrderInformation.items.length - 1; i >= 0; i--) {
                let item = this.businessOrderInformation.items[i]
                sum += item.univalence * item.quantity
            }
            return sum
        }
    },
    methods: {
        handleSubmit (businessOrderInformation) {
            this.$refs[businessOrderInformation].validate((valid) => {
                if (valid) {
                    this.businessOrderInformation.businessId = this.loginUser.id
                    this.businessOrderInformation.businessName = this.loginUser.username
                    console.log(this.businessOrderInformation)
                    let items = []
                    for (let i = this.businessOrderInformation.items.length - 1; i >= 0; i--) {
                        let item1 = this.businessOrderInformation.items[i]
                        items.push({
                            id: item1.id,
                            name: item1.name,
                            sku: item1.value,
                            quantity: item1.quantity,
                            univalence: item1.univalence
                        })
                    }
                    let order = {
                        businessId: this.businessOrderInformation.businessId,
                        businessName: this.businessOrderInformation.businessName,
                        payment: this.businessOrderInformation.payment,
                        items,
                        totalAmount: this.totalPrice
                    }
                    // console.log('提交的订单的信息：')
                    // console.log(order)
                    businessOrder(order).then((response) => {
                        // console.log('提交订单后响应信息为')
                        // console.log(response)
                        if (response.data.data === null || response.data.status !== 200) { // 库存可能不足，无法生成订单
                            throw new Error('订单提交失败')
                        } else {
                            this.$Message.success('订单提交成功！')
                        }
                    }).catch((error) => {
                        this.$Message.error('订单提交失败!')
                        console.log(error)
                    })
                } else {
                    this.$Message.error('失败!')
                }
            })
        },
        handleReset (businessOrderInformation) {
            this.$refs[businessOrderInformation].resetFields()
            this.businessOrderInformation.items = [] // 清空所有商品
            this.index = 0 // 索引回到开始
        },
        handleAdd () {
            this.index++
            console.log(this.index)
            this.businessOrderInformation.items.push({
                value: '',
                index: this.index,
                status: 1,
                quantity: 1, // 数量
                univalence: 0.0 // 单价
            })
        },
        handleRemove (index) {
            // this.businessOrderInformation.items[index].status = 0
            this.businessOrderInformation.items.splice(index, 1) // 从指定位置删除一个元素
        },
        getGoodsItemInform (index) {
            let goodsSku = this.businessOrderInformation.items[index].value // 通过商品的sku编号查找
            if (goodsSku !== null && goodsSku !== '') {
                getBusinessGoodsBySku(goodsSku).then((response) => {
                    this.businessOrderInformation.items[index].id = response.data.data.id
                    this.businessOrderInformation.items[index].name = response.data.data.name
                    this.businessOrderInformation.items[index].univalence = response.data.data.pricing.retail
                })
            }
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
