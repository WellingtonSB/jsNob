const fs = require('fs');
const path = "./src/database/user.json"

exports.readFile = () => {
  const file = fs.readFileSync(path, 'utf-8');
  return JSON.parse(file);
}
exports.writeFile = (file) => {
  fs.writeFile(path, JSON.stringify(file), 'utf-8', (error) => {
    return error;
  })
}