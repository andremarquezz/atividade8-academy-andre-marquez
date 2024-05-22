# language: pt
Funcionalidade: Login de usuário

 Contexto: O usuário deve ter acesso à página de login
  Dado que acessei a página de login
   E que estou cadastrado

 Cenário: Deve ser possível realizar login com credenciais válidas
   Quando preencher o email com um e-mail válido
   E preencher a senha com uma senha válida
   E clicar no botão Login
   Então devo ser autenticado
   E devo ser redirecionado para a página inicial

 Cenário: Deve ser exibida uma mensagem de erro ao tentar logar com email inválido
   Quando preencher o email com um e-mail inválido
   E preencher a senha com uma senha válida
   E clicar no botão Login
   Então devo ver a mensagem de erro 'Falha ao autenticar'

 Cenário: Deve ser exibida uma mensagem de erro ao tentar logar com senha inválida
   Quando preencher o email com um e-mail válido
   E preencher a senha com uma senha inválida
   E clicar no botão Login
   Então devo ver a mensagem de erro 'Falha ao autenticar'
