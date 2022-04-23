# Decentralised DigiLocker

A decentralised storage of digital documents.

## File Structure

-   `frontend`: Frontend
-   `api`: API
-   `.vscode`: Visual Studio Code Settings
-   `docker-compose.yml`: Docker Compose for running BigChainDB

## Start the servers

### To start the next app

```bash
cd frontend
yarn dev
```

### To start the API

```bash
cd api
yarn dev
```

### To start the BigChainDB

```bash
cd bigchaindb
make run
```

> **Note**: Use `make stop` to stop the BigChainDB.

> **Note**: Use `npm run dev` to start the servers if `yarn` is not installed on your device
