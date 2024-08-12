//to know status of my error
// class AppError extends Error {
//     constructor(message, statusCode) {
//       super(message);
  
//       this.statusCode = statusCode;
//       //this.status = `${statusCode}`.startsWith('4')?'fail':'error';
//       //this.isOperational = true;
  
//       // Error.captureStackTrace(this, this.constructor);
//     }
//   }
  
  class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode || 500; // Default to 500 if not provided
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

  export default AppError;