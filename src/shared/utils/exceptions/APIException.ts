import HttpException from "./HttpException";

class APIException extends HttpException {

    constructor(error: any) {
        if (error.name === 'ValidationError') {
            super(400, error.message);
        } else if (error.message.indexOf('duplicate key error') > -1) {
            super(400, `Campo ${JSON.stringify(error.keyValue)} já existe no sistema.`)
        } else {
            super(500, error.message);
        }
    }
}

export default APIException;