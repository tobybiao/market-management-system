<template>
    <div>
        <ve-line :data="chartData"></ve-line>
    </div>
</template>
<script>
import VeLine from 'v-charts/lib/line'
export default {
    data () {
        return {
            chartData: {
                columns: ['时间', '在线人数'],
                rows: []
            },
            maxRecord: 30 // 最多记录数
        }
    },
    created () {
        this.getOnlineNumber()
    },
    methods: {
        /**
         * 监控在线人数
         */
        getOnlineNumber () {
            if (window.EventSource) {
                let source = new EventSource('/api/monitoring/onlineNumber')
                source.addEventListener('message', (event) => {
                    let record = JSON.parse(event.data)
                    console.log(record)
                    this.chartData.rows.push(record)
                    if (this.chartData.rows.length > this.maxRecord) {
                        this.chartData.rows.shift()
                    }
                    console.log(this.chartData.rows.length)
                }, false)
            } else {
                throw new Error('浏览器不支持SSE')
            }
        }
    },
    components: { VeLine }
}
</script>
<style scoped>
</style>
