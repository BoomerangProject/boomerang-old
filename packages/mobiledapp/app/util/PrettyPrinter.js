
const numberOfSpacesToIndent = 2;

function indentation(nestLevel) {
  let numberOfSpaces = nestLevel*numberOfSpacesToIndent;
  let spaces = '';
  for (var i = 0; i < numberOfSpaces; i++) {
    spaces += ' ';
  }
  return spaces;
}

export default function prettyPrint(reviewInformation) {

  let text = '';

  const loopNestedObj = (obj, nestLevel) => {

    Object.entries(obj).forEach(([key, val]) => {

      if (val && typeof val === 'object') {

        // console.log(key + ' of ' + val.length);
        // if (Array.isArray(val)) {
          text += indentation(nestLevel) + key + ':' + '\n';
        // console.log(key);
        // }

        loopNestedObj(val, nestLevel+1);
      } else {
        text += indentation(nestLevel) + key + ': ' + val + '\n';
        // console.log(key, val);
      }
    });


  };

  loopNestedObj(reviewInformation, 1);
  return text;
}
