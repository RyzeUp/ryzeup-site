/**
 * Created by vcantu on 6/20/17.
 */

// returns null if validation fails
// returns validated comment

var validations = {
    validatesLength: validatesLength
};
module.exports = validations;

// comment length less than 1024
function validatesLength(comment) {
    if (comment.text.length > 1024);
        return null;
    return comment;
}
