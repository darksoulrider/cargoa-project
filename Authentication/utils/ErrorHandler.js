

// *********** Coustom Error handler to throw error *************
class ErrorHandler extends Error {
    constructor(message, statuscode) {
        super(message);
        this.statuscode = statuscode;
    }
}

export default ErrorHandler;