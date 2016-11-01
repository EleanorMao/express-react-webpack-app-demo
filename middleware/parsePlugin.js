var fs = require('fs');
var path = require('path');

var Def = {
    ignore: ['node_modules'],
    source: __dirname
};

function diff(a, b) {
    return a.filter(x => {
        return b.indexOf(x) === -1
    });
}

function extend(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function(source) {
        for (var prop in source) {
            target[prop] = source[prop];
        }
    });
    return target;
}

function parseEntry(base, params) {
    params = extend({}, Def, params);
    var output = {};
    if (!path.isAbsolute(base)) {
        base = path.join(params.source, base)
    }
    var stats = fs.statSync(base);

    if (stats.isFile()) {
        output[path.parse(base).name] = base;
    } else if (stats.isDirectory(base)) {
        var dir = diff(fs.readdirSync(base), params.ignore);
        dir.map(function(item) {
            extend(output, parseEntry.call(null, path.join(base, item), params));
        });
    }
    return output;
}

function findFile(file, params) {
    params = extend({}, Def, params);
    if (!path.isAbsolute(file)) {
        file = path.join(params.source, file)
    }
    var output;
    var exists = fs.existsSync(file);
    if (exists) {
        output = file;
    } else {
        var dir = diff(fs.readdirSync(params.source), params.ignore);
        var baseFile = path.parse(file);
        var allFiles = {};
        dir.map(function(item) {
            if (item === 'node_modules') return;
            extend(allFiles, parseEntry(path.join(params.source, item, params)));
        });
        for (var key in allFiles) {
            if (key === baseFile.name) {
                output = allFiles[key];
                break;
            }
            var item = path.parse(allFiles[key]);
            if (item.base === baseFile.base) {
                output = allFiles[key];
                break;
            }
        }
    }
    return output;
}

module.exports = {
    parseEntry: parseEntry,
    findFile: findFile
};