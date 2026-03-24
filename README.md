## ECOMMERCE
Developed an ecommerce application simply using the nodejs it performs the server side rendering .The Main focus is to develop it using the redis,babel 
### Mongodb Creation
Open command prompt and go to Mongo shell and type:

```bash
use dbname
```

This will create a database.

Then create a collection named products using:

```bash
db.createCollection("products")
```

Then add products using this command in the empty list add the list of products generate it by using chatgpt
```bash
db.products.insertMany([])
```
