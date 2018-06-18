<template>
    <div>
       <VeGauge :data="chartData" :settings="chartSettings"></VeGauge>
    </div>
</template>
<script>
import VeGauge from 'v-charts/lib/gauge'
export default {
    data () {
        return {
            chartData: {
                columns: ['a', 'b', 'type', 'value'],
                rows: [
                    { type: '压力', value: 80, a: 1, b: 2 }
                ]
            }
        }
    },
    created () {
        this.chartSettings = {
            dimension: 'type',
            metrics: 'value'
        }
        this.getSystemPressure()
    },
    methods: {
        getSystemPressure () {
            if (window.EventSource) {
                let source = new EventSource('/api/monitoring/pressure')
                source.addEventListener('message', (event) => {
                    let value = event.data
                    this.chartData.rows[0].value = value
                }, false)
            } else {
                throw new Error('浏览器不支持SSE')
            }
        }
    },
    components: { VeGauge }
}
</script>
<style scoped>
</style>
