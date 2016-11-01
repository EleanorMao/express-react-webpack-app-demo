var installed = false;

function install() {

    if (installed) {
        return;
    }

    var extensions = arguments.length ? arguments : ['.css', '.scss', '.sass', '.less', '.sss', '.gif', '.jpeg', '.jpg', '.png', '.svg', '.mp4', '.ogv'];
    for (var i = extensions.length; i--;) {
        require.extensions[extensions[i]] = function () {
        };
    }

    installed = true;
}

module.exports = {
    install: install
};