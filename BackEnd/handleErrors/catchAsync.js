import AppError from "./appError.js";
// export const catchAsync= fn => {
//     return (req, res, next) => {
//       fn(req, res, next).catch(err=>{ next(new AppError(err.message, err.statusCode || 500))});
//     };
//   };

 const catchAsync = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(err => {
            if (!err.statusCode) {
                next(new AppError(err.message, 500));
            } else {
                next(err);
            }
        });
    };
};
export default catchAsync