export class ApiResponse {
    statusCode: number
    data: Object
    message: string
    success: boolean

    constructor(statusCode: number = 200,  data?: Object,message: string = "Success",) {
        this.statusCode = statusCode
        this.data = data || {}
        this.message = message
        this.success = statusCode < 400
    }
}