import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    // 自定义共享状态
    state:{
        // 文章查询条件
        paginationQuery: ''

    },
    // 数据改变的唯一方法（处理数据逻辑方法）
    mutations:{
        setPaginationQueryString(state, queryString){
            state.paginationQuery = queryString;
        }
    },
    // 可以包含任意异步操作
    actions:{


    }
})
