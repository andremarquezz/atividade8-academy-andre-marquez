#language: pt
Funcionalidade: Header das paginas

  Cenario: Header da pagina inicial
   Dado que estou na pagina inicial
   Entao devo ver o header com o logo da empresa e o input de busca de filmes
   E devo ver o menu de navegacao com as opcoes: Filmes, Login, Registre-se

  Cenario: Deve alterar o header após o cadastro
   Dado que estou na pagina de cadastro
   Quando realizar o cadastro com sucesso
   Entao devo ver no header o botão Registre-se ser alterado para Perfil
   E não deve ter a opção de Login


  Cenario: Deve redirecionar para pagina inicial ao clicar no logo da Raro
   Dado que estou na pagina de cadastro
   Quando clicar no logo da Raro
   Entao devo ser redirecionado para a pagina inicial
   

  # Cenario: Header da pagina de contato
  #  Dado que eu estou na pagina de contato
  #  Entao eu devo ver o header com o logo da empresa
  #  E eu devo ver o menu de navegacao com as opcoes: Home, Produtos, Sobre, Contato
