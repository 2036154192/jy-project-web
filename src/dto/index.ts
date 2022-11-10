export interface PageDto{
    component?:string,
    createTime?:string,
    icon?:string,
    id?:string,
    jurisdiction?:string,
    name?:string,
    path?:string,
    pid?:string,
    title?:string,
    updateTime?:string
}

export interface NfcDto{
    code?:string,
    title?:string,
    subhead?:string,
    img?:string,
    audio?:string
}

export interface TablePaging{
    count:number,
    list:object[]
}