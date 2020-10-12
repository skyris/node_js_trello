function isFunction(fn) {
  return (
    fn &&
    ({}.toString.call(fn) === '[object Function]' ||
      {}.toString.call(fn) === '[object AsyncFunction]')
  );
}

function selectRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generatePassword(pwdLen = 10) {
  const pwdChars =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  return Array(pwdLen)
    .fill(pwdChars)
    .map(chars => chars[Math.floor(Math.random() * chars.length)])
    .join('');
}

module.exports = { isFunction, selectRandom, generatePassword };
