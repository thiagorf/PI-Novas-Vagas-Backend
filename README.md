# PI-Novas-Vagas-Backend (WIP)

[frontend repo](https://github.com/thiagorf/PI-Novas-Vagas-Frontend)

## Future features

File storage with Filebase (Decentralized Storage)

> Just to test it

Use files to create resources

> For example, create resources based on rows in excel file probably with a stream

Produce PDF reports.

DevOps

## How to Run

Clone or fork the project if you like to contribuite to it

![How to download the project](clone-image.png)

run the command `git clone (repository url)`

change the `.example.env ` file to `.env` and replace the properties based on your enviroment.

Open the project in Vs Code or in a terminal

```
code path to project
```

If you have docker installed and docker compose, you just need to run `docker composer up --build` in the project terminal (in Vs Code).

Run the migrations with `npx prisma migrate dev`

That it is, you should be able to test the endpoints on localhost:8000.

Every resource route has a version prefix on it like this

> localhost:8000/v1/jobs
