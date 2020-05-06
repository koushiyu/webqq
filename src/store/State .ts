export interface State {
    activate:any
    friend:{
        [index:string]:Array<IQTQQ.friendMsg>
    }
}

export const state: State = {
    activate:undefined,
    friend:{

    }

};