<template>
    <div>
        <Row class="expand-row">
            <i-col span="8">
                <span class="expand-key">联系电话: </span>
                <span class="expand-value">{{ row.phone }}</span>
            </i-col>
            <i-col span="8">
                <span class="expand-key">评分: </span>
                <span class="expand-value">{{ row.rating }}</span>
            </i-col>
            <i-col span="8">
                <span class="expand-key">销量: </span>
                <span class="expand-value">{{ row.salesVolume }}</span>
            </i-col>
        </Row>
        <Row>
            <i-col span="8">
                <span class="expand-key">店铺分类: </span>
                <span class="expand-value">{{ row.category }}</span>
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
