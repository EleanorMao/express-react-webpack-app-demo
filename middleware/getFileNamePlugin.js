var fs = require('fs');
var path = require('path');
var defPath = __dirname;

function GetFileNamePlugin(options) {
    this.filePath = options.filePath || defPath;
    this.publicPath = options.publicPath || '';
    this.fileName = options.fileName || 'fileName.json';
    this.extensions = options.extensions || ['js', 'css'];
}

GetFileNamePlugin.prototype.apply = function (compiler) {
    var output = {},
        extensions = this.extensions,
        filePath = path.join(this.filePath, this.fileName),
        publicPath = this.publicPath;
    extensions = extensions instanceof Array ? extensions : [extensions];
    compiler.plugin('done', function (status) {
        var assetsByChunkName = status.toJson().assetsByChunkName;
        for (var chunkName in assetsByChunkName) {
            var assets = assetsByChunkName[chunkName],
                newOutput = output[chunkName] = {};
            assets = assets instanceof Array ? assets : [assets];
            for (var i = 0; i < assets.length; i++) {
                var item = assets[i];
                for (var j = 0; j < extensions.length; j++) {
                    if (!newOutput[extensions[j]]) {
                        newOutput[extensions[j]] = []
                    }
                    if (item.endsWith(extensions[j])) {
                        newOutput[extensions[j]].push(path.join('/', publicPath, item));
                    }
                }
            }
        }
        fs.writeFileSync(
            filePath,
            JSON.stringify(output)
        )
    })
};

module.exports = GetFileNamePlugin;