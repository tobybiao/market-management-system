<template>
    <div>
        <HeadTop></HeadTop>
        <Row>
            <i-col span="7" offset="1">
                <div>
                    <Card>
                        <p slot="title">
                            <Icon type="ios-film-outline"></Icon>
                            监控在线人数
                        </p>
                        <p>
                            <OnlineNumber></OnlineNumber>
                        </p>
                    </Card>
                </div>
            </i-col>
            <i-col span="7" offset="1">
                <div>
                    <Card>
                        <p slot="title">
                            <Icon type="ios-film-outline"></Icon>
                            每分钟请求数、调用数
                        </p>
                        <p>
                            <RequestsPerMinute></RequestsPerMinute>
                        </p>
                    </Card>
                </div>
            </i-col>
            <i-col span="7" offset="1">
                <div>
                    <Card>
                        <p slot="title">
                            <Icon type="ios-film-outline"></Icon>
                            监控系统压力
                        </p>
                        <p>
                            <Pressure></Pressure>
                        </p>
                    </Card>
                </div>
            </i-col>
        </Row>
    </div>
</template>
<script>
import HeadTop from '@/components/CommonHeadTop'
import OnlineNumber from '@/components/chart/OnlineNumber'
import RequestsPerMinute from '@/components/chart/RequestsPerMinute'
import Pressure from '@/components/chart/Pressure'
export default {
    components: {
        HeadTop,
        OnlineNumber,
        RequestsPerMinute,
        Pressure
    }
}
</script>
<style scoped>
</style>
