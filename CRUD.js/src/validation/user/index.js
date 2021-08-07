const { body, validationResult, check } = require('express-validator')
const { readFile, writeFile } = require('../../shared/fileMethods')
const path = "./src/database/user.json"


exports.existsEmail = (email_current) => {
  const file = readFile(path);
  const user = file.find(user => user.email == email_current)
  if (user) {
    return {
      "value": user.email,
      "msg": "Já possui um cadastro com este e-mail",
      "param": "email",
      "location": "body"
    }
  }
  else
    return false
}
exports.validateRequest = (req) => {
  const result = validationResult(req);
  if (!req.body.email && !req.body.senha)
    result.errors.push({ errorMessage: "informe os dados para atualizar" })
  return result.errors;
};

exports.validatorCreate = [
  check('email')
    .notEmpty()
    .withMessage('email não informado')
    .isLength({ min: 9 })
    .withMessage('O campo email deve conter pelo menos 9 caracteres')
    .isEmail()
    .withMessage('Precisa ser um e-mail válido')
  ,
  check('senha')
    .notEmpty()
    .withMessage('senha não informada')
    .isLength({ min: 5 })
    .withMessage('O campo senha deve conter pelo menos 5 caracteres')
];
exports.validatorUpdate = [
  check('email')
    .optional()
    .isLength({ min: 9 })
    .withMessage('O campo email deve conter pelo menos 9 caracteres')
    .isEmail()
    .withMessage('Precisa ser um e-mail válido')
  ,
  check('senha')
    .optional()
    .isLength({ min: 5 })
    .withMessage('O campo senha deve conter pelo menos 5 caracteres')
];