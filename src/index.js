import express from 'express';
import cors from 'cors';

const onlyLettersPattern = /^[^\.,\\/#!$%^&*;:{}=\-_`~()0-9]*$/i;

function firstLetterToUpper(word) {
  return `${word[0].toUpperCase()}${word.substring(1)}`;
}

function isNameValid(name) {
  return name && onlyLettersPattern.test(name);
}

function splitFullName(fullName) {

  const splittedName = fullName.trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map(firstLetterToUpper);

  if (splittedName.length > 3 || splittedName.length === 0) {
    return [];
  }

  const result = [splittedName[splittedName.length - 1]];
  if (splittedName.length > 1) {
    result.push(splittedName[0]);
    if (splittedName.length > 2) {
      result.push(splittedName[1]);
    }
  }
  return result;
}

function getInitial(name) {
  return name ? ` ${name[0]}.` : '';
}

function formatName(lastName, firstName, middleName) {
  const middleNameInitial = getInitial(middleName);
  const firstNameInitial = getInitial(firstName);

  return `${lastName}${firstNameInitial}${middleNameInitial}`;
}

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  let formattedName = 'Invalid fullname';
  if (isNameValid(req.query.fullname)) {
    const splittedName = splitFullName(req.query.fullname);
    if (splittedName.length) {
      formattedName = formatName(...splittedName);
    }
  }
  res.send(formattedName);
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
