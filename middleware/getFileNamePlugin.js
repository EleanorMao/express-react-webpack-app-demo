var fs = require('fs');
var path = require('path');
function GetFileNamePlugin(options){
    this.filePath = options.filePath || '../server/';
    this.fileName = options.fileName || 'fileName.json';
    this.extensions = options.extensions || ['js', 'css'];
}

GetFileNamePlugin.prototype.apply = function(compiler){
    var output = {};
    var extensions = this.extensions;
    extensions = extensions instanceof Array ? extensions : [ extensions ];
    var filePath = path.join(__dirname, this.filePath, this.fileName);
    compiler.plugin('done', function(status){
        var assetsByChunkName = status.toJson().assetsByChunkName;
        for(var chunkName in assetsByChunkName){
            var assets = assetsByChunkName[chunkName];
            var newOutput = output[chunkName] = {};
            for(var i = 0; i < assets.length; i++){
                var item = assets[i];
                var value = assets[i].split('.');
                var extension = value[value.length - 1];
                for(var j = 0; j < extensions.length; j++){
                    if(extension === extensions[j]){
                        if(!newOutput[extensions[j]]){
                            newOutput[extensions[j]] = []
                        }
                        newOutput[extensions[j]].push(item);
                    }
                }
            }
        }
        fs.writeFileSync(
                filePath,
                JSON.stringify(output)
            )
    })
}

module.exports = GetFileNamePlugin;