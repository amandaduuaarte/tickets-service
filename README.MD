### Documentation:

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
