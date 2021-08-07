exports.errorMessage = (id, type) => {
  switch (id) {
    case 1:
      return {
        errorMessage: "não há usuários cadastrados"
      }
    case 2:
      return {
        errorMessage: "Usuario não encontrado"
      }
    case 3:
      return {
        errorMessage: `Não foi possível ${type} usuário`
      }
    default:
      break;
  }
}