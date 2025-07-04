export class ApiError extends Error {
    statusCode: number
    message: string
    success: boolean
    error: string[]

    constructor(statusCode = 500, message= "", errors= [], stack= ""){
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.success = false
        this.error = errors

        if(stack){
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}