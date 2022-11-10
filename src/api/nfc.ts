import { NfcDto } from "@/dto";
import axios from "./index";
export const addNfc = (params:NfcDto)=>{
  return axios.post('/nfc',params)
}

export const updateNfc = (params:NfcDto) => {
  return axios.patch('/nfc',params)
}

//删除指定页面（单个及子）
export const deleteNfc = (params:string) => {
  return axios.delete('/nfc/'+params)
}
