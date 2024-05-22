# language: pt
Funcionalidade: Login de usuário

 Contexto: O usuário deve ter acesso à página de login
  Dado que acessei a página de login
   E que estou cadastrado

 Cenário: Deve ser possível realizar login com credenciais válidas
   Quando preencher o e-mail com um e-mail válido
   E preencher a senha com uma senha válida
   E clicar no botão Login
   Então devo ser autenticado
   E devo ser redirecionado para a página inicial

 Cenário: Deve ser exibida uma mensagem de erro ao tentar logar com e-mail inválido
   Quando preencher o e-mail com um e-mail inválido
   E preencher a senha com uma senha válida
   E clicar no botão Login
   Então devo ver a mensagem de erro 'Falha ao autenticar'

 Cenário: Deve ser exibida uma mensagem de erro ao tentar logar com senha inválida
   Quando preencher o e-mail com um e-mail válido
   E preencher a senha com uma senha inválida
   E clicar no botão Login
   Então devo ver a mensagem de erro 'Falha ao autenticar'

 Cenário: Deve ser exibida uma mensagem de erro ao tentar logar sem preencher o e-mail
   Quando não preencher o e-mail
   E preencher a senha com uma senha válida
   E clicar no botão Login
   Então devo ver a mensagem de erro informado que o e-mail é obrigatório

 Cenário: Deve ser exibida uma mensagem de erro ao tentar logar sem preencher a senha
   Quando preencher o e-mail com um e-mail válido
   E não preencher a senha
   E clicar no botão Login
   Então devo ver a mensagem de erro informado que a senha é obrigatório

 Cenário: Deve ser exibida uma mensagem de erro ao tentar logar sem preencher o e-mail e a senha
   Quando não preencher o e-mail
   E não preencher a senha
   E clicar no botão Login
   Então devo ver a mensagem de erro informado que o e-mail é obrigatório
   E devo ver a mensagem de erro informado que a senha é obrigatório
