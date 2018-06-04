const numberOfSpacesToIndent = 2;

var seen = [];

function replacerFunction(key, val) {
  if (val != null && typeof val == "object") {
    if (seen.indexOf(val) >= 0) {
      return;
    }
    seen.push(val);
  }
  return val;
}

export default function stringify(arg) {
  return JSON.stringify(arg, replacerFunction);
}
