<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" onsubmit="return false">
                <el-form-item>
                    <input type="text" class="el-input__inner" placeholder="请输入城市名称" @keyup.enter="check" v-model="input2">
                </el-form-item>
                <el-form-item>
                    <el-button @click="greet" type="danger">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="24" v-if="show">
            <el-button type="primary">{{city}}</el-button>
            <el-button type="primary">{{country}}</el-button>
        </el-col>
        <el-col :span="24" v-if="show">
            <el-table :data="gridData" stripe fit style="width: 80% ;text-align: center;">
                <el-table-column align="center" prop="date" label="日期">
                </el-table-column>
                <el-table-column align="center" prop="cond.txt_d" label="天气">
                </el-table-column>
                <el-table-column align="center" prop="tmp.max" label="最高温度">
                </el-table-column>
                <el-table-column align="center" prop="tmp.min" label="最低温度">
                </el-table-column>
                <el-table-column align="center" prop="wind.sc" label="刮风情况">
                </el-table-column>
            </el-table>
        </el-col>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'hello',
    data() {
        return {
            msg: '天气预报',
            input2: null,
            show: false,
            gridData: [],
            city: null,
            country: null
        }
    },
    methods: {
        greet() {
            axios({
                    url: `https://free-api.heweather.com/v5/forecast?city=${this.input2}&key=37375519876e4e61b656df30fb8979c0`,
                    method: 'get',
                    transformRequest: [function(data) {
                        let ret = '';
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret;
                    }]
                })
                .then((res) => {
                    this.city = res.data.HeWeather5[0].basic.city;
                    this.country = res.data.HeWeather5[0].basic.cnty;
                    this.gridData = res.data.HeWeather5[0].daily_forecast;
                    console.log(this.gridData);
                    this.show = true;
                    this.input2 = '';
                })
                .catch(function(res) {
                    console.log(res);
                    alert('找不到城市,请检查！');
                    this.input2 = '';
                })
        },
        check() {
            this.greet();
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bounce-enter-active {
    animation: bounce-in .5s;
}

.bounce-leave-active {
    animation: bounce-out .5s;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
}

@keyframes bounce-out {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(0.95);
    }
    100% {
        transform: scale(0);
    }
}

h1,
h2 {
    font-weight: bold;
    font-size: 100px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

.el-table {
    margin: 5% 10%;
    font-size: 28px;
}

.el-row {
    margin-bottom: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple {
    background: #d3dce6;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
</style>
