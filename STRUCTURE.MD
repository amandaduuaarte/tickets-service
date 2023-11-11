# Techguide:

## Estrutura de pastas: 🗂️
Hoje o projeto está estruturado seguindo como base alguns padrões de arquitetura limpa, tentando ao máximo dividir resposábilidades e separando
os arquivos em camadas. 
___

### Camadas: 📚
* Main
* Domain
* Infra
* Application


- Main: 🎯
    -  A pasta main é responsável por armazenar toda a parte imprescindível para que o projeto consiga rodar, nela está o arquivo `Server.ts` o qual é armazena a lógica para criar um servidor, também temos a pasta de `routes` a qual conta com todas as rotas que a aplicação possui.
    -  Outra particularidade da pasta `main` é que ela contém toda a implementação dos patterns `factory` e `adpter`. 
    - Em um futuro vale a análise durante a implementação de outros padrões se esses cabem nessa pasta ou ela deve ser refatorada.
    - main 
        - `./routes`
        - `./middlewares`
        - `./factories`
        - `./adpters`
    </br>

- Domain: 🤓
    -  A domain é responsável por armazenar toda a parte de regra de négocio da aplicação, nela está a pasta `services` a qual tem como responsabilidade lógica para criar lidar com os params e realizar todo o processo necessário de determinadas solicitações, também temos a pasta de `schemas` que realiza uma validação inicial de parametros e informações passadas por meio dos controllers.
    -  Além disso, ela conta com uma pasta de `interfaces` nessa pasta adicionei as tipagens que julguei serem mais relacionadas com as regras de négocio da minha aplicação.
    - domain 
        - `./services`
        - `./interfaces`
        - `./models`
        - `./schemas`
    </br>

- Application: 💻
    -  Na application optei por concentrar todas as partes relacionadas a aplicação em si, como tratamentos de erros na `errors`, também adicionei os controllers dentro dessa camada nessa pasta de interface concentrei a parte de middlewares, controllers e outros tipos que uso no decorrer do código.
    - Pretendo analisar melhor quais tipagens tenho na folder `interfaces` para que possa adicionar outras ou remover algumas. 
    - application 
        - `./controllers`
        - `./interfaces`
        - `./errors`
        - `./utils`
        - `./constants`
    </br>

- Infra: 👷‍♀️
    -  A pasta de infra fica responsável por lidar com a parte de infraestrutura do projeto😅 então nela que está a parte de 'filas' com o `rabbit`, `knex` e toda a configuração do banco de dados também, além de tudo isso existe a parte de envio de email com o `Resend`.
    -  Essa camada sempre entendi como algo mais externo do core da aplicação então dependências fora do projeto estão ai, também tentei isolar um pouco mais essa parte visando uma maior facilidade caso seja necessário trocar alguma das libs usadas. Ps: Nisso o factory também é de grande ajuda.
    - infra 
        - `./knex`
        - `./rabbit`
        - `./Resend`
    </br>
