const getters ={
  nowData(state:any){
    return state.timeLineData.nowData  //selectedData
  },
  selectedData(state:any){
    return state.timeLineData.selectedData
  },
}
export default getters