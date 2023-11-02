# Ticket - Service 💻

## Explicando o projeto: 🎯
MicroServiço de validação de compras de ingressos para eventos, o projeto consiste em um sistema simples de verificação basicamente funciona como um MS que deve ser integrado a outros serviços já que sua resposabilidade por ora é validar se todos os dados do comprador e do evento estão de acordo com o esperado e com isso realizar o envio de um email para o endereço fornecido pelo possível comprador.

### Funcionalidades já implementadas: 🤓
* Token válido: Hoje a aplicação conta com uma validação de token, ou seja, a rota para confirmar compra precisa de um token válido.
* Envio de email: O projeto utiliza de um serviço para que possa ser feito o disparo de email para o endereço informado no payload recebido.


### Techs usadas: ✅ 
* Node JS.
* TypeScript.
* Express -> usado como web application framework para a criação do projeto.
* RabbitMQ -> Para a realização de comunicação assíncrona, simulando o consumo de outro MS das mensagens em fila para que houvesse o disparo de email.
* Nodemailer -> Usado para auxilixar no envio de email.
* Yup -> Validação dos parâmetros recebidos em rota, usado como uma camada a mais.
* Docker -> Para a criação do banco usado na aplicação e também de toda a infra do rabbitmq.


### Rotas da aplicação: 🗺️
Post -> `api/event-purchase` 
    </br>
payload: 
       ```json
       {
		"eventId": "01",
        "ownerName": "Name",
        "contact": {
        "email": "email@email.com",
        "phoneNumber": "123456789"
        },
        "eventDetails": {
        "area": "vip",
        "quantity": 10  
        }
    }```
    
Post -> `/api/auth`
</br>
payload: client-token


### O que pude aprender com esse projeto: 📚
* Aprendi durante o desenvolvimento desse projeto sobre formas melhores de estruturar uma aplicação node js, tentei aplicar uma arquitetura limpa usando conhecimentos que estou estudando e implementando da forma que julguei necessário e que consegui entender a real motivação. 
* Um pouco sobre o partner factory, conseguindo desacoplar algumas implementações que julguei necessário tornando partes do código um pouco mais independentes entre si. Optei por desenvolver a principal funcionalidade do projeto antes da implementação desse padrão para que eu pudesse ver os problemas que surgiram e entender a razão do factory.
* Configuração e implementação da comunicação por messageria com rabbitmq. 

### Como rodar o projeto? ⚙️
1 -Rode `Yarn ou npm i` dentro do terminal do projeto.
 </br>
 2 - Rode `docker-compose up` para que os containers sejam criados.
 </br>
 3 - `yarn debug:watch`
