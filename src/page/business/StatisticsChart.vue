 <template>
    <div>
        <HeadTop></HeadTop>
        <div class="statisticChart">
            <StatisticsLineChart :columns="sevenDays.columns" :rows="sevenDays.rows" v-if="sevenDaysVisible" key="sevenDaysVisible"></StatisticsLineChart>
            <StatisticsLineChart :columns="month.columns" :rows="month.rows" v-else-if="monthVisible" key="monthVisible"></StatisticsLineChart>
            <StatisticsLineChart :columns="quarter.columns" :rows="quarter.rows" v-else key="quarterVisible"></StatisticsLineChart>
        </div>
    </div>
 </template>
<script>
import HeadTop from '@/components/CommonHeadTop'
import StatisticsLineChart from '@/components/chart/business/StatisticsLineChart'
export default {
    data () {
        return {
            sevenDaysVisible: false,
            monthVisible: false,
            quarterVisible: false,
            type: this.$route.params.statisticsType,
            columns: [],
            rows: [],
            sevenDays: {
                columns: ['日期', '销售量', '营收额'],
                rows: [
                    { '日期': '2018-01-01', '销售量': 1393, '营收额': 2000 },
                    { '日期': '2018-01-02', '销售量': 3530, '营收额': 4000 },
                    { '日期': '2018-01-03', '销售量': 2923, '营收额': 3500 },
                    { '日期': '2018-01-04', '销售量': 1723, '营收额': 2300 },
                    { '日期': '2018-01-05', '销售量': 3792, '营收额': 4000 },
                    { '日期': '2018-01-06', '销售量': 4593, '营收额': 4600 },
                    { '日期': '2018-01-07', '销售量': 4693, '营收额': 4700 }
                ]
            },
            month: {
                columns: ['日期2', '销售量', '营收额'],
                rows: [
                    { '日期2': '2018-05-01', '销售量': 1593, '营收额': 2000 },
                    { '日期2': '2018-05-02', '销售量': 3530, '营收额': 4000 },
                    { '日期2': '2018-05-03', '销售量': 2923, '营收额': 3500 },
                    { '日期2': '2018-05-04', '销售量': 1723, '营收额': 2300 },
                    { '日期2': '2018-05-05', '销售量': 3792, '营收额': 4000 },
                    { '日期2': '2018-05-06', '销售量': 4593, '营收额': 4600 },
                    { '日期2': '2018-05-07', '销售量': 4693, '营收额': 4700 },
                    { '日期2': '2018-05-08', '销售量': 4693, '营收额': 4700 },
                    { '日期2': '2018-05-09', '销售量': 4693, '营收额': 4700 },
                    { '日期2': '2018-05-10', '销售量': 4693, '营收额': 4700 },
                    { '日期2': '2018-05-11', '销售量': 4693, '营收额': 4700 },
                    { '日期2': '2018-05-12', '销售量': 4693, '营收额': 4900 }
                ]
            },
            quarter: {
                columns: ['月份', '销售量', '营收额'],
                rows: [
                    { '月份': '02', '销售量': 25930, '营收额': 30000 },
                    { '月份': '03', '销售量': 45300, '营收额': 50000 },
                    { '月份': '04', '销售量': 39230, '营收额': 45000 },
                    { '月份': '05', '销售量': 27230, '营收额': 33000 }
                ]
            }
        }
    },
    beforeRouteUpdate (to, from, next) {
        this.type = this.$route.params.statisticsType
        let nextFullPath = to.fullPath
        if (nextFullPath === '/businessStatisticsChart/sevenDaysStatistics') {
            this.sevenDaysVisible = true
            this.monthVisible = false
            this.quarterVisible = false
        } else if (nextFullPath === '/businessStatisticsChart/monthStatistics') {
            this.sevenDaysVisible = false
            this.monthVisible = true
            this.quarterVisible = false
        } else if (nextFullPath === '/businessStatisticsChart/quarterStatistics') {
            this.sevenDaysVisible = false
            this.monthVisible = false
            this.quarterVisible = true
        }
        next()
    },
    created () {
        if (this.type === 'sevenDaysStatistics') {
            this.sevenDaysVisible = true
        } else if (this.type === 'monthStatistics') {
            this.monthVisible = true
        } else if (this.type === 'quarterStatistics') {
            this.quarterVisible = true
        }
    },
    components: {
        HeadTop,
        StatisticsLineChart
    }
}
</script>
<style scoped>
.statisticChart {
    width: 95%;
    margin-left: auto;
    margin-right: auto;
}
</style>
