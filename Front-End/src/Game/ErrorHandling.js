// Handles common errors if there is no tailored response before this is called.
export function errorHandling(err) {
    if (err.response.status === 401) {
        return "Unauthorized: Access Denied!";
    } else if (err.response.status === 409) {
        return "Conflict Error"
    } else if (err.response.status === 500) {
        return "Error with Server, please check Database Connection."
    } else {
        return err;
    }
}