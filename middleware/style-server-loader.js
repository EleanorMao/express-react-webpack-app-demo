module.exports = function() {};
module.exports.pitch = function(req) {
    this.cacheable();
    return "require(" + JSON.stringify(require.resolve("./style-collector")) + ").add(require(" + JSON.stringify("!!" + req) + ")[0][1]);\n" +
        "delete require.cache[module.id];";
}