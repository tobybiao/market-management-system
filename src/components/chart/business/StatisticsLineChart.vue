<template>
    <div>
        <ve-line :data="chartData"></ve-line>
    </div>
</template>
<script>
import VeLine from 'v-charts/lib/line'
export default {
    props: {
        columns: Array,
        rows: Array
    },
    data () {
        this.chartSettings = {
            xAxisType: 'time'
        }
        return {
            chartData: {
                columns: this.columns,
                rows: this.rows
            }
        }
    },
    components: { VeLine }
}
</script>
<style scoped>
</style>
