const getters ={
  nowData(state:any){
    return state.timeLineData.nowData  //selectedData
  },
  selectedData(state:any){
    return state.timeLineData.selectedData
  },
  selectedTime(state:any){
    return state.timeLineData.selectedTime
  },
  selectedYMD(state:any){
    return state.timeLineData.selectedYMD
  },
  flagID(state:any){
    return state.timeLineData.flagID
  }
}
export default getters