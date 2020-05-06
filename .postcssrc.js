const autoprefixer = require("autoprefixer");

module.exports = {
    plugins: [
        autoprefixer({
            Browserslist: ["last 2 versions", "Firefox ESR", "> 1%", "ie >= 8", "iOS >= 8", "Android >= 4"]
        })
    ]
};
