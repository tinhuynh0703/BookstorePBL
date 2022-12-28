const errorHandler = (err, req, res, next) => {
  try {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
  } catch (error) {
    console.log(error);
    next();
  }
};

module.exports = errorHandler;
