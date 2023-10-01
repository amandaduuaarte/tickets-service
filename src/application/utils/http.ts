import { BAD_REQUEST, SUCCESS } from '../constants'

interface ReturnContent {
    code: number
    body: any
}

interface NoContent {
    code: number
}

export const success = (data: any): ReturnContent => {
    return {
        code: SUCCESS,
        body: data ,
    }
}

export const error = (data: any): ReturnContent => {
    return {
        code: BAD_REQUEST,
        body: data,
    }
}

export const noContent = (): void => {
    return;
}