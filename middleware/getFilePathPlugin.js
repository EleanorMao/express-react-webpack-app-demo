var path = require('path');

function getFilePath(status, fileName, publicPath, extensions) {
    var assetsByChunkName = status.toJson().assetsByChunkName,
        publicPath = publicPath || 'assets/',
        extensions = extensions || ['js', 'css'],
        extLen = extensions.length,
        output = {},
        assets = assetsByChunkName[fileName];
    for (var i = 0; i < assets.length; i++) {
        var item = assets[i];
        for (var j = 0; j < extLen; j++) {
            if (!output[extensions[j]]) {
                output[extensions[j]] = [];
            }
            if (item.endsWith(extensions[j])) {
                output[extensions[j]].push(path.join('/', publicPath, item));

            }
        }
    }
    return output;
}

module.exports = getFilePath;