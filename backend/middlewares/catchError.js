const catchError = (req, res, next) => {
    next(createError(404));
}

module.exports = catchError