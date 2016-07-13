var fs = require('fs');
var path = require('path');
module.exports = function(compiler){
    var output = {};
    this.plugin('done', function(status){
        var assetsByChunkName = status.toJson().assetsByChunkName;
        //{name : [.., ..]}
        for(var chunkName in assetsByChunkName){
            var assets = assetsByChunkName[chunkName];
            var newOutput = output[chunkName] = {'js': [], 'css': []};
            for(var i = 0; i < assets.length; i++){
                var item = assets[i];
                var value = assets[i].split('.');
                if(value[value.length - 1] === 'js'){
                    newOutput.js.push(item);
                }
                if(value[value.length - 1] === 'css'){
                    newOutput.css.push(item);
                }
            }
        }
        fs.writeFileSync(
                path.join(__dirname, '..', 'server', 'fileName.json'),
                JSON.stringify(output)
            )
    })
}

