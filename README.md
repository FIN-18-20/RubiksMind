# RubiksMind
Best Rubik's cube website to track your pbs

[![Netlify Status](https://api.netlify.com/api/v1/badges/d12a34be-f0bc-49dd-8172-70e736f62bea/deploy-status)](https://app.netlify.com/sites/rubiksmind/deploys)

---

## Getting started

### Tools needed on your machine

* Docker Engine Community
* Docker Compose
* Git

### Initial configuration



```bash
> git clone https://github.com/FIN-18-20/RubiksMind.git
> cd RubiksMind
> docker-compose up
```
If you're on Windows, check that the wait-for.sh script in the server's folder is formatted in **LF**.

### Test the setup

Try to reach:
* The Vue SPA on [localhost:8080](http://localhost:8080)
* The API and the MySQL server connection on [localhost:3333/test](http://localhost:3333/test)

### Shutdown the containers
```bash
> cd RubiksMind
> docker-compose down
or
> docker-compose down -v (if you also want to remove the volumes)
```