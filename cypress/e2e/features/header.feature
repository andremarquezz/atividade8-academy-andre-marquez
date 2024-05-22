# language: pt
Funcionalidade: Header das páginas

 Cenário: Deve exibir o header da página inicial
  Dado que estou na página inicial
   Então devo ver o header com o logo da empresa e o input de busca de filmes
   E devo ver o menu de navegação com as opções: Filmes, Login e Registre-se

 Cenário: Deve alterar o header após o cadastro
  Dado que estou na página de cadastro
   Quando realizar o cadastro com sucesso
   Então devo ver no header o botão Registre-se ser alterado para Perfil
   E não deve ter a opção de Login

 Cenário: Deve redirecionar para página inicial ao clicar no logo da Raro
  Dado que estou na página de cadastro
   Quando clicar no logo da Raro
   Então devo ser redirecionado para a página inicial
