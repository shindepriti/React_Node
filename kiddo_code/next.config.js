const withPlugin = require('next-compose-plugins');
const withImages = require('next-images');
require('dotenv').config();

const nextConfig = {
    env: {
        // Reference a variable that was defined in the .env file and make it available at Build Time
        /*GRAPHURL: "http://localhost:1337/kiddographql",
        GRAPHIMAGEURL: "http://localhost:1337"*/
        GRAPHURL: "http://18.141.11.246:1337/kiddographql",
        GRAPHIMAGEURL: "http://18.141.11.246:1337"
    },
}


module.exports = withPlugin([

[
withImages, {
inlineImageLimit: 2048,
},
],


], nextConfig);