
/**
 * @param {Object} options
 * @param {string} [options.name='']
 * @param {string} [options.value='']
 * @param {Date} [options.expires]
 * @param {number} [options.maxAge]
 * @param {string} [options.domain]
 * @param {string} [options.path]
 * @param {boolean} [options.secure]
 * @param {boolean} [options.httpOnly]
 * @param {'Strict'|'Lax'|'None'} [options.sameSite]
 * @return {string}
 */
function createSetCookie(options) {
    return (`${options.name || ''}=${options.value || ''}`)
      + (options.expires != null ? `; Expires=${options.expires.toUTCString()}` : '')
      + (options.maxAge != null ? `; Max-Age=${options.maxAge}` : '')
      + (options.domain != null ? `; Domain=${options.domain}` : '')
      + (options.path != null ? `; Path=${options.path}` : '')
      + (options.secure ? '; Secure' : '')
      + (options.httpOnly ? '; HttpOnly' : '')
      + (options.sameSite != null ? `; SameSite=${options.sameSite}` : '');
  }

  let mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'applilcation/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.svg': 'application/image/svg+xml'
};

  exports.createSetCookie = createSetCookie;
  exports.mimeTypes = mimeTypes;
 