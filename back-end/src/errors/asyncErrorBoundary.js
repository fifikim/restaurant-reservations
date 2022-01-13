/**
 * Higher-order function used to handle potential errors from 
 * an asynchronous controller function calling the API.
 * 
 * @param delegate: async/await handler or middleware function
 * @param defaultStatus: optional status code to return if delegate throws an error
 * @returns Express next() handler or middleware function
 */
function asyncErrorBoundary(delegate, defaultStatus) {
  return (request, response, next) => {
    Promise.resolve()
      .then(() => delegate(request, response, next))
      .catch((error = {}) => {
        const { status = defaultStatus, message = error } = error;
        next({
          status,
          message,
        });
      });
  };
}

module.exports = asyncErrorBoundary;
