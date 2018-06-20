<template>
    <div>
        <HeadTop></HeadTop>
        <Row>
            <i-col span="7" offset="1">
                <div>
                    <Card>
                        <p slot="title">
                            <Icon type="ios-film-outline"></Icon>
                            近七天销售情况
                        </p>
                        <p>
                            <StatisticsLineChart :columns="sevenDays.columns" :rows="sevenDays.rows"></StatisticsLineChart>
                        </p>
                    </Card>
                </div>
            </i-col>
            <i-col span="7" offset="1">
                <div>
                    <Card>
                        <p slot="title">
                            <Icon type="ios-film-outline"></Icon>
                            近一个月销售情况
                        </p>
                        <p>
                            <StatisticsLineChart :columns="month.columns" :rows="month.rows"></StatisticsLineChart>
                        </p>
                    </Card>
                </div>
            </i-col>
            <i-col span="7" offset="1">
                <div>
                    <Card>
                        <p slot="title">
                            <Icon type="ios-film-outline"></Icon>
                            近一个季度销售情况
                        </p>
                        <p>
                            <StatisticsLineChart :columns="quarter.columns" :rows="quarter.rows"></StatisticsLineChart>
                        </p>
                    </Card>
                </div>
            </i-col>
        </Row>
    </div>
</template>
<script>
import HeadTop from '@/components/CommonHeadTop'
import StatisticsLineChart from '@/components/chart/business/StatisticsLineChart'
export default {
    data () {
        return {
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
                columns: ['日期', '销售量', '营收额'],
                rows: [
                    { '日期': '2018-05-01', '销售量': 1593, '营收额': 2000 },
                    { '日期': '2018-05-02', '销售量': 3530, '营收额': 4000 },
                    { '日期': '2018-05-03', '销售量': 2923, '营收额': 3500 },
                    { '日期': '2018-05-04', '销售量': 1723, '营收额': 2300 },
                    { '日期': '2018-05-05', '销售量': 3792, '营收额': 4000 },
                    { '日期': '2018-05-06', '销售量': 4593, '营收额': 4600 },
                    { '日期': '2018-05-07', '销售量': 4693, '营收额': 4700 },
                    { '日期': '2018-05-08', '销售量': 4693, '营收额': 4700 },
                    { '日期': '2018-05-09', '销售量': 4693, '营收额': 4700 },
                    { '日期': '2018-05-10', '销售量': 4693, '营收额': 4700 },
                    { '日期': '2018-05-11', '销售量': 4693, '营收额': 4700 },
                    { '日期': '2018-05-12', '销售量': 4693, '营收额': 4900 }
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
    components: {
        HeadTop,
        StatisticsLineChart
    }
}
</script>
<style scoped>
</style>
