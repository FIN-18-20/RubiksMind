# RubiksMind
Best Rubik's cube website to track your pbs

[![Netlify Status](https://api.netlify.com/api/v1/badges/2b990f6c-21eb-4193-8553-8e1d8344c219/deploy-status)](https://app.netlify.com/sites/rubiks-mind/deploys)

---

| :warning: This version is not the one hosted on [rubiksmind.com](https://rubiksmind.com). |
| :------------------------------------------------------ |
| It's a more advanced one with accounts management and leaderboard. <br/><br/> Go to the [local_version branch](https://github.com/FIN-18-20/RubiksMind/tree/local_version) if you want the check other one. |

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

### Test the setup

Try to reach:
* The Vue SPA on [localhost](http://localhost)
* The API on [localhost/api](http://localhost/api)
* The Traefik Dashboard on [dashboard.localhost](http://dashboard.localhost)
* The MariaDB database on your favorite database management tool with the host as **localhost** and the port as **3306**

Feel free to change any environment variable in the *docker-compose.yml* file to fully access your setup. 

### Shutdown the containers
```bash
> cd RubiksMind
> docker-compose down
or
> docker-compose down -v (if you also want to remove the volumes)
```