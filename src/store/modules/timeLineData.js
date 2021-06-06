// 定义全局事件视图的参数
const state = {
  nowData: {},
}

const mutations = {
  SET_NOW_DATA: (state, nowData) => {
    state.nowData = nowData
  },
  Empty_DATA_LIST: (state,data) =>{
    state.nowData = {}
  },
}
const actions = {
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}