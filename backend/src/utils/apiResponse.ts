export class ApiResponse<T= object> {
    statusCode: number
    data: T;
    message: string
    success: boolean

    constructor(statusCode: number = 200,  data?: T, message: string = "Success",) {
        this.statusCode = statusCode
        this.data = data || ({} as T)
        this.message = message
        this.success = statusCode < 400
    }
}