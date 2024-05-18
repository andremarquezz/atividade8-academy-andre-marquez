#language: pt
Funcionalidade: Cadastro de usuário

  Contexto: O usuário deve ter acesso à página de cadastro
   Dado que acessei a página de cadastro

  Cenário: Deve ser possível cadastrar um usuário com sucesso
   Quando preencher um nome válido, um email válido e confirmar a senha corretamente
   Então o cadastro deve ser realizado com sucesso e devo ver a mensagem de sucesso