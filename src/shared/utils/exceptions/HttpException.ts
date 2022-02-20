class HttpException extends Error {

    status: number;
    message: string;

    constructor(status: number, message: string) {
        super(message);

        Object.setPrototypeOf(this, new.target.prototype);
        this.name = Error.name;
        this.status = status;
        Error.captureStackTrace(this);
    }

}

export default HttpException;
