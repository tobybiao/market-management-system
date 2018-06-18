<template>
    <div>
        <p v-for="(item, index) in items" :key='index'>
            <Row class="expand-row">
                <i-col span="6">
                    <span class="expand-key">商品编号: </span>
                    <span class="expand-value">{{item.sku}}</span>
                </i-col>
                <i-col span="10">
                    <span class="expand-key">商品名称: </span>
                    <span class="expand-value">{{item.name}}</span>
                </i-col>
                <i-col span="4">
                    <span class="expand-key">购买数量: </span>
                    <span class="expand-value">{{item.quantity}}</span>
                </i-col>
                <i-col span="4">
                    <span class="expand-key">单价: </span>
                    <span class="expand-value">{{item.univalence}}</span>
                </i-col>
            </Row>
        </p>
    </div>
</template>
<script>
export default {
    props: {
        items: Array // 订单包含的商品
    }
}
</script>
<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
    .param_item {
        display: inline-block;
        margin-right: 16px;
    }
</style>
