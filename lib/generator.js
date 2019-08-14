var configuration = require('./configuration');
var fonts = require('./font');
var gm = require('gm').subClass({imageMagick: true});

module.exports.AvatarGenerator = function () {
    var generateImage = function generateImage(config, next) {
        var text = config.text;
        var font = fonts.get(config.font, config.fontSize);
        var words = text.toUpperCase();
        var width = config.width;
        var circleWidth = width - 1;

        var image = config.shape === 'square'
            ? gm(width, width, config.color)
            : gm(width, width, '#000')
                .transparent('#000')
                .fill(config.color)
                .drawCircle(circleWidth / 2, circleWidth / 2, 0, circleWidth / 2);

        image
            .fill(config.fontColor)
            .font(font.file)
            .fontSize(font.fontsize)
            .drawText(0, 0, words, 'Center');
        next(image);
    };


    return {
        generate: function (conf, next) {
            var config = configuration(conf);
            generateImage(config, next);
        }
    };
};
