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
  },
  pullutionHour(state:any){
    return state.timeLineData.pullutionHour
  },
  pullution(state:any){
    return state.timeLineData.pullution
  }
}
export default getters