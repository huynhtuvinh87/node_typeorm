
export class BaseResponse {
    status: number = 200;
    success : boolean = true;
    data: object;
    message: string = "Success";
    error: number = 0;
}