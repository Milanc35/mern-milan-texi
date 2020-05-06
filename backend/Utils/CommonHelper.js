class CommonHelper {
    static validateEmail(email) {
        var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(email); // Assuming email has a text attribute
    }
}

module.exports = CommonHelper;
