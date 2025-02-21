## Description
- [Design Doc](https://ripe-starflower-75f.notion.site/Bounce-Technical-Challenge-Checkout-Flow-Design-Document-19d630c37df880a79ac2f4e231b5f55c)
- This repo houses a backend bookings services and frontend web app to book luggage storage.

# Local developer setup
Steps: 
1. Install dependencies: docker, typescript, nvm, node
2. Run `nvm use`
3. To run the backend locally on localhost:4000, run `docker compose up --build`
4. To run the frontend locally on localhost:3000, run `npm run dev` 

Docker will spin up a local postgres database running on port 5432.  
You may use an app like pgAdmin4 or the like to connect.

To test, navigate to localhost:3000/checkout.
