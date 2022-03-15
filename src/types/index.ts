export interface InitData {
    id: string,
    name: string,
    num: number
}
export class IninObj {
    arrObject: Array<InitData> = [];
    objObject?: InitData = {
        id: '',
        name: '',
        num: 0
    }
}