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
                <span class="expand-value">{{ row.categoryLabel }}</span>
            </i-col>
        </Row>
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
</style>
