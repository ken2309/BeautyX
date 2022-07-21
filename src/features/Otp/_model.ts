export interface IPropOtp{
    setOpen: (props: Boolean) => {}
    open: boolean
    dataOtp: IDataOtp
    setDataOtp: (prop:IDataOtp)=>{}
    handleSubmit: (props:any)=>{}
}
export interface IDataOtp{
    telephone: number|string
    code: string
    verification_id: string
}
