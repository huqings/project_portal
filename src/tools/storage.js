function set(key, value) {
  return localStorage.setItem(key, value);
}

function get(key) {
  return localStorage.getItem(key);
}

function remove(key) {
  return localStorage.removeItem(key);
}

export default {
  set,
  get,
  remove,
};
