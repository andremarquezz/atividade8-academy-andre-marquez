# language: pt
Funcionalidade: Gerenciamento de conta

 Contexto: O usuário deve estar cadastrado no sistema para acessar a página de gerenciamento de conta
  Dado que estou cadastrado e logado no sistema

 Cenário: Deve ser possível visualizar as informações no gerenciamento de conta com o tipo de usuário Comum
   Quando o tipo de usuário for do tipo "0"
   E acesso a página de gerenciamento de conta
   Então devo visualizar as minhas informações
   E o tipo de usuário deve ser "Comum"

 Cenário: Deve ser possível visualizar as informações no gerenciamento de conta com o tipo de usuário Administrador
   Quando o tipo de usuário for do tipo "1"
   E acesso a página de gerenciamento de conta
   Então devo visualizar as minhas informações
   E o tipo de usuário deve ser "Administrador"

 Cenário: Deve ser possível visualizar as informações no gerenciamento de conta com o tipo de usuário Crítico(a)
   Quando o tipo de usuário for do tipo "2"
   E acesso a página de gerenciamento de conta
   Então devo visualizar as minhas informações
   E o tipo de usuário deve ser "Crítico(a)"

 Cenário: Deve redirecionar para a página de login ao acessar a página de gerenciamento de conta sem estar logado
   Quando realizo o logout
   E acesso a página de gerenciamento de conta
   Então devo ser redirecionado para a página de login

 Cenário: Não deve ser possível alterar o email no gerenciamento de conta
   Quando acesso a página de gerenciamento de conta
   Então o campo de email deve estar desabilitado

 Cenário: Deve ser possível alterar o nome no gerenciamento de conta
   Quando acesso a página de gerenciamento de conta
   E alterar o nome para um nome válido
   E clicar em Salvar
   Então devo visualizar a mensagem que a informação foi alterada com sucesso

 Cenário: Deve ser possível alterar a senha no gerenciamento de conta
   Quando acesso a página de gerenciamento de conta
   E os campos de senha e confirmação de senha estão desabilitados
   E clicar em Alterar senha
   E preencher os campos de senha e confirmação de senha corretamente
   E clicar em Salvar
   Então devo visualizar a mensagem que a informação foi alterada com sucesso

 Esquema do Cenário: Deve exibir mensagem de erro ao tentar alterar a senha com menos de 6 dígitos
   Quando acesso a página de gerenciamento de conta
   E os campos de senha e confirmação de senha estão desabilitados
   E clicar em Alterar senha
   E preencher os campos de senha e confirmação de senha incorretamente "<senha>"
   E clicar em Salvar
   Então devo visualizar a mensagem de erro que a senha deve ter pelo menos 6 dígitos
    
   Exemplos:
    | senha |
    | 12345 |
    | 1     |

 Esquema do Cenário: Deve exibir mensagem de erro ao tentar alterar a senha com mais de 12 dígitos
   Quando acesso a página de gerenciamento de conta
   E os campos de senha e confirmação de senha estão desabilitados
   E clicar em Alterar senha
   E preencher os campos de senha e confirmação de senha incorretamente "<senha>"
   E clicar em Salvar
   Então devo visualizar a mensagem de erro que a senha deve ter no máximo 12 dígitos
    
   Exemplos:
    | senha            |
    | 1234567890123    |
    | 1234567890123456 |

 Esquema do Cenário: Deve exibir mensagem de erro ao tentar alterar a senha com senhas diferentes
   Quando acesso a página de gerenciamento de conta
   E os campos de senha e confirmação de senha estão desabilitados
   E clicar em Alterar senha
   E preencher os campos de senha e confirmação de senha incorretamente "<senha>" e "<confirmacaoSenha>"
   E clicar em Salvar
   Então devo visualizar a mensagem de erro que as senhas não são iguais
    
   Exemplos:
    | senha     | confirmacaoSenha |
    | 123456    | 1234567          |
    | 123456789 | 12345678         |

 Cenário: Deve exibir mensagem de erro ao tentar alterar a senha com campos vazios
   Quando acesso a página de gerenciamento de conta
   E os campos de senha e confirmação de senha estão desabilitados
   E clicar em Alterar senha
   E clicar em Salvar
   Então devo visualizar a mensagem de erro que os campos de senha e confirmação de senha são obrigatórios

 Cenário: Deve exibir mensagem de erro ao tentar alterar o nome com nome vazio
