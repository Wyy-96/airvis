// 定义全局事件视图的参数
const state = {
  selectedData: {},
  nowData: {},
  selectedTime: {},
  selectedYMD: '',
  flagID : []
}

const mutations = {
  SET_NOW_DATA: (state: any, nowData: any) => {
    state.nowData = nowData
  },
  SET_SELECTED_DATA: (state: any, selectedData: any) => {
    state.selectedData = selectedData
  },
  SET_SELECTED_TIME: (state: any, selectedTime: any) => {
    state.selectedTime = selectedTime
  },
  SET_SELECTED_Y_M_D:(state: any, selectedYMD: any)=>{
    state.selectedYMD = selectedYMD
  },
  SET_FLAG_ID:(state: any, flagID: any)=>{
    state.flagID = flagID
  }
}
const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}