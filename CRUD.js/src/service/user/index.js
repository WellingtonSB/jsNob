const validators = require('../../validation/user');
const { readFile, writeFile } = require('../../shared/fileMethods')
const { errorMessage } = require('../../errors/userError');

exports.findAll = (req, res) => {
  const file = readFile();

  if (file.length)
    res.status(200).send(file);
  else {
    res.status(400).send(errorMessage(1));
  }
}

exports.findOne = (req, res) => {
  const file = readFile();
  const { user_id } = req.params;
  const index = file.findIndex(user => user.id == user_id)

  if (index != -1) {
    res.status(200).send(file[index]);
  }
  else {
    res.status(404).send(errorMessage(2));
  }
}

exports.create = (req, res) => {
  const { email, senha } = req.body;
  const errors = validators.validateRequest(req);
  const emailExists = validators.existsEmail(email)
  if (errors.length || emailExists) {
    if (emailExists)
      errors.push(emailExists)
    return res.status(400).send({ errors })
  }

  const file = readFile();
  const id = (file.length > 0) ? file[file.length - 1].id + 1 : 1;
  const finalFile = [...file, { email, senha, id }]
  const error = writeFile(finalFile);

  if (error) {
    res.status(500).send(errorMessage(3));
  }
  else {
    res.status(201).send({ email, senha })
  }

}

exports.update = (req, res) => {
  const { email, senha } = req.body;
  const errors = validators.validateRequest(req);
  const emailExists = validators.existsEmail(email)

  if (errors.length || emailExists) {
    if (emailExists)
      errors.push(emailExists)
    return res.status(400).send({ errors })
  }

  const file = readFile();
  const { user_id } = req.params
  const index = file.findIndex(user => user.id == user_id)

  if (index != -1) {
    const { email: ant_email, senha: ant_senha } = file[index];

    file[index] = {
      email: (email) ? email : ant_email,
      senha: (senha) ? senha : ant_senha,
      id: file[index].id
    }

    const error = writeFile(file);

    if (error) {
      res.status(500).send(errorMessage(3, 'atualizar'));
    }
    else {
      res.status(202).send({ email, senha })
    }
  }
  else {
    res.status(404).send(errorMessage(3, 'encontrar'));
  }
}

exports.deleteOne = (req, res) => {
  const file = readFile();
  const { user_id } = req.params;
  const index = file.findIndex(user => user.id == user_id)

  if (index != -1) {
    const deletedUser = file.splice(index, 1);
    const error = writeFile(file);

    if (error) {
      res.status(500).send(errorMessage(3, 'deletar'));
    }
    else {
      res.status(200).send(deletedUser[0]);
    }
  }
  else {
    res.status(404).send(errorMessage(2));
  }

}

exports.deleteAll = (req, res) => {
  const file = readFile();
  var error;

  if (file.length) {
    error = writeFile([]);
  }
  if (error) {
    res.status(500).send(errorMessage(3, 'deletar'));
  }
  else {
    res.status(200).send(readFile());
  }
}
