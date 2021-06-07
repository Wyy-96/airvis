// 定义全局事件视图的参数
const state = {
  selectedData: {},
  nowData: {},
}

const mutations = {
  SET_NOW_DATA: (state:any, nowData:any) => {
    state.nowData = nowData
  },
  SET_SELECTED_DATA: (state:any, selectedData:any) => {
    state.selectedData = selectedData
  },
  Empty_DATA_LIST: (state:any,data:any) =>{
    state.nowData = data
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