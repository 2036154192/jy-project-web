import { NfcDto } from "@/dto";
import axios from "./index";

export const addNfc = (params:NfcDto)=>{
  return axios.post('/nfc',params)
}

export const updateNfc = (params:NfcDto) => {
  return axios.patch('/nfc/update',params)
}