var access  = require('fs').access
var unlink  = require('fs').unlinkSync
var rmdir   = require('fs').rmdirSync
var readdir = require('fs').readdirSync
module.exports = rm
function rm (dir) {
  access(dir, require('fs').R_OK | require('fs').W_OK, remove)
  function remove (err) {
    if (err) return
    try { unlink(dir) } catch ($) {
      try { rmdir(dir) } catch ($) {
        try{
          readdir(dir)
            .map(function(f) { return dir + '/' + f })
            .forEach(rm)
          setImmediate(rm, dir)
        } catch($) {}
      }
    }
  }
}
