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
function validatesLength(post) {
    if (post.text.length > 2048 || post.title.length > 256);
        return null;
    return post;
}
