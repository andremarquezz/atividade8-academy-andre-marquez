#language: pt
Funcionalidade: Cadastro de usuário

 Contexto: O usuário deve ter acesso à página de cadastro
  Dado que acessei a página de cadastro

 Cenário: Deve ser possível cadastrar um usuário com sucesso
   Quando preencher um nome válido, um email válido, uma senha válida e confirmar a senha corretamente
   Então o cadastro deve ser realizado com sucesso e devo ver a mensagem de sucesso
  
 Esquema do Cenário: Deve exibir mensagem de erro ao tentar cadastrar um usuário com email inválido
   Quando preencher um nome válido
   E preencher um email inválido "<email>"
   E preencher uma senha válida e confirmar a senha corretamente
   E clicar no botão de Cadastrar
   Então devo ver a mensagem de erro "Não foi possível cadastrar o usuário."
   Exemplos:
    | email      |
    | jey@       |
    | jey@gmail  |
    | @gmail.com |
    | jey@.com   |

 Esquema do Cenário: Deve exibir mensagem de erro ao tentar cadastrar um usuário com senha inválida
   Quando preencher um nome válido
   E preencher um email válido
   E preencher os campos de senha e confirmação de senha com uma senha inválida "<senha>"
   E clicar no botão de Cadastrar
   Então o cadastro não deve ser realizado e devo ver a mensagem de erro "<mensagemDeErro>"
   Exemplos:
    | senha             | mensagemDeErro                         |
    | 12345             | A senha deve ter pelo menos 6 dígitos. |
    | 1                 | A senha deve ter pelo menos 6 dígitos. |
    | 1234567891023     | A senha deve ter no máximo 12 dígitos. |
    | 12345678910123468 | A senha deve ter no máximo 12 dígitos. |

#  Cenário: Não deve ser possível cadastrar um usuário com senhas diferentes
#    Quando preencher um nome válido, um email válido, uma senha válida e confirmar a senha incorretamente
#    Então o cadastro não deve ser realizado e devo ver a mensagem de erro

#  Cenário: Não deve ser possível cadastrar um usuário com email já cadastrado
#   Dado que o email "jey@gmail.com" já está cadastrado
#    Quando preencher um nome válido, o email "jey@gmail.com", uma senha válida e confirmar a senha corretamente
#    Então o cadastro não deve ser realizado e devo ver a mensagem de erro

