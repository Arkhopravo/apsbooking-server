export const createError = (status, message) => {
    const err = new Error();
    err.status = status;
    err.message = "error message";
    return err;
}