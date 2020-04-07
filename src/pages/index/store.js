import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  // 自定义共享状态
  state: {
    userName: '',
    role: '',
    // 文章查询条件
    paginationQuery: ''

  },
  // 数据改变的唯一方法（处理数据逻辑方法）
  mutations: {
    setPaginationQueryString(state, queryString) {
      state.paginationQuery = queryString;
    },
    setUserRole(state, data) {
      state.role = data.role;
      state.userName = data.userName;
    }
  },
  // 可以包含任意异步操作
  actions: {
    getUserStatus() {
      axios.get("/auth/userStatus")
        .then(resp => {
          if (resp.data.flag) {
            this.commit('setUserRole', resp.data.data)
          }
        })
    }
  }
})
