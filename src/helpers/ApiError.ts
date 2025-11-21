 class ApiError extends Error {
    public stack;
    constructor(
        public statusCode: number = statusCode, 
        public message: string = "Something went wrong",
        public errors: string [] = errors, 
        public success: boolean = false,
        stack?: string 
    ){
        super(message);

        if(stack){
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
    
}

export {ApiError};