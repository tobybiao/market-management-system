<template>
    <div>
        <Row class="expand-row">
            <i-col span="8">
                <span class="expand-key">编号: </span>
                <span class="expand-value">{{ row.sku }}</span>
            </i-col>
            <i-col span="8">
                <span class="expand-key">批发价格: </span>
                <span class="expand-value">{{ row.pricing.sale }}</span>
            </i-col>
            <i-col span="8">
                <span class="expand-key">零售价格: </span>
                <span class="expand-value">{{ row.pricing.retail }}</span>
            </i-col>
        </Row>
        <Row>
            <i-col span="8">
                <span class="expand-key">商品分类: </span>
                <span class="expand-value">{{ row.category }}</span>
            </i-col>
        </Row>
        <div>
            <h3>商品规格</h3>
            <div v-for='(item, index) in row.details' :key='index'>
               <h5>{{ item.group }}</h5>
               <div v-for='(param, index2) in item.params' :key='index+index2' class="param_item">
                    <mark>{{param.key}}:</mark> {{param.value}}
               </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        row: Object
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
