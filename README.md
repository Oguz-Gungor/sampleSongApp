# SongApp 

SongApp fullstack application to manage crud operations wth items form Spotify API

## Compose

**To compose app containers**:

```docker-compose up```

**Which will build and run 3 containers**:

-Database : *-PostgreSQL-*

-Backend with *-Express-*(Typescript)

-Frontend with *-React-*(Typescript)

### Ports

Frontend will run on port : **3001**

Backend will run on port : **3000**

Database will run on port : **5432**

Ports should be changed in backend & frontend config files if docker file is changed