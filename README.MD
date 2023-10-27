### Documentation:

- TODO: 
  - implementar um worker para o consumo da fila (ficar sempre olhando independente do service principal)
  - implementar o envio de email
  - criar uma rota de cadastro de evento (Nao sei ainda se vou fazer);
## Routes:

- Auth route
  -- /api/auth
  -- post
  -- payload :
    {
        "clientId": "MSInitialService"
    }

- Event Purchase route
  -- /event-purchase
  -- post
  -- payload :
    {
		"eventId": "01",
        "ownerName": "Amanda",
        "contact": {
        "email": "amanda@email.com",
        "phoneNumber": "85967876787"
        },
        "eventDetails": {
        "area": "vip",
        "quantity": 10  
        }
    }
