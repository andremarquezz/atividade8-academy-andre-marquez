# language: pt
Funcionalidade: Cadastro de usuário

 Contexto: O usuário deve ter acesso à página de cadastro
  Dado que acessei a página de cadastro

 Cenário: Deve cadastrar um usuário com sucesso
   Quando preencher um nome válido
   E preencher um email válido
   E preencher uma senha válida "123456"
   E confirmar a senha corretamente "123456"
   E clicar no botão de Cadastrar
   Então o cadastro deve ser realizado com sucesso
   E devo ver a mensagem de sucesso

 Esquema do Cenário: Deve exibir mensagem de erro para email inválido
   Quando preencher um nome válido
   E preencher um email inválido "<email>"
   E preencher uma senha válida "123456"
   E confirmar a senha corretamente "123456"
   E clicar no botão de Cadastrar
   Então devo ver a mensagem de erro informando que não foi possível cadastrar o usuário
    
   Exemplos:
    | email      |
    | jey@       |
    | jey@gmail  |
    | @gmail.com |
    | jey@.com   |

 Esquema do Cenário: Deve exibir mensagem de erro para senha inválida
   Quando preencher um nome válido
   E preencher um email válido
   E preencher a senha com uma senha inválida "<senha>"
   E confirmar a senha corretamente "<senha>"
   E clicar no botão de Cadastrar
   Então o cadastro não deve ser realizado
   E devo ver a "<mensagemDeErro>" no campo de senha
    
   Exemplos:
    | senha             | mensagemDeErro                         |
    | 12345             | A senha deve ter pelo menos 6 dígitos. |
    | 1                 | A senha deve ter pelo menos 6 dígitos. |
    | 1234567891023     | A senha deve ter no máximo 12 dígitos. |
    | 12345678910123468 | A senha deve ter no máximo 12 dígitos. |

 Cenário: Deve exibir mensagem de erro para senha não preenchida
   Quando preencher um nome válido
   E preencher um email válido
   E não preencher a senha
   E confirmar a senha corretamente "123456"
   E clicar no botão de Cadastrar
   Então o cadastro não deve ser realizado
   E devo ver a mensagem de erro informando que a senha é obrigatória

 Cenário: Deve exibir mensagem de erro para confirmação de senha não preenchida
   Quando preencher um nome válido
   E preencher um email válido
   E preencher uma senha válida "123456"
   E não preencher a confirmação de senha
   E clicar no botão de Cadastrar
   Então o cadastro não deve ser realizado
   E devo ver a mensagem de erro informando que a confirmação de senha é obrigatória

 Cenário: Deve exibir mensagem de erro para confirmação de senha incorreta
   Quando preencher um nome válido
   E preencher um email válido
   E preencher uma senha válida "123456"
   E confirmar a senha incorretamente
   E clicar no botão de Cadastrar
   Então o cadastro não deve ser realizado
   E devo ver a mensagem de erro informando que as senhas devem ser iguais

 Cenário: Deve exibir mensagem de erro para email já cadastrado
   Quando preencher um nome válido
   E preencher um email já cadastrado
   E preencher uma senha válida "123456"
   E confirmar a senha corretamente "123456"
   E clicar no botão de Cadastrar
   Então devo ver a mensagem de erro informando que o e-mail já está cadastrado.
