# Civil Aviation app Backend

## Introduction

This project was bootstrapped with [`FastAPI`](https://fastapi.tiangolo.com), [`Prisma`](https://www.prisma.io), [`Prisma For Python`](https://prisma-client-py.readthedocs.io/en/stable/), [`PostgreSQL`](https://www.postgresql.org) and [`Docker`](https://www.docker.com).

## Get Started

### Setting up `Docker` and `PostgreSQL`

- Install [`Docker`](https://docs.docker.com/engine/install/) and [`docker-compose`](https://docs.docker.com/compose/install/)
- For using `PostgreSQL` with `Docker` instance, simply run the following command:

  ```sh
  docker run --name <Your instance name> -e POSTGRES_PASSWORD=<your-passowrd> -d postgres
  ```

- For using `PostgreSQL` with `docker-compose`, simply running the following command:

  ```sh
  # Change the directory to the server folder
  cd server
  # Run the pre-configured docker-compose.yml
  docker-compose -d up -f docker-compose.yml
  ```

- However, you can configure your own `docker-compose` with the following template:

  ```yml
  # docker-compose template for PostgreSQL
  # See: https://hub.docker.com/_/postgres

  # Depreacated, remove it to avoid conflictions !
  version: "3.8"

  services:
    postgres:
      image: postgres
      restart: always
      # Optional, could be your own name
      container_name: <Your Container Name>
      shm_size: 128mb # Could be your optional size
      ports:
        - 5432:5432
      environment:
        POSTGRES_DB: <Your database>
        POSTGRES_USER: <Your username>
        POSTGRES_PASSWORD: <Your password>

      volumes:
        - postgresql_db:<Your own volume directory>

      networks:
        - postgresql_networks

  volumes:
    postgresql_db:

  networks:
    postgresql_networks:
  ```

### Setting up `Prisma` and `Prisma for Python`

- Install `Prisma` using `pip`:

  ```sh
  pip install -U prisma
  # Or using the requirements.txt
  pip install -r requirements.txt -U
  ```

- Add a `.env` file with the following configuration:

  ```env
  DATABASE_URL=postgresql://username:password@localhost:5432/database?schema=public
  ```

- To **migrate** the database:

  ```sh
  prisma migrate dev --name "init"
  ```

- To **push** the database for synchronization:

  ```sh
  prisma db push
  ```

- To **generate** the `Prisma client for Python`:

  ```sh
  prisma generate
  ```

- Usage:

  ```py
  # Example from Prisma Client Python
  # See: https://prisma-client-py.readthedocs.io/en/stable/

  import asyncio
  from prisma import Prisma

  async def main() -> None:
      prisma = Prisma()
      await prisma.connect()

      post = await prisma.post.find_many()

      await prisma.disconnect()
      print(post)

  if __name__ == '__main__':
      asyncio.run(main())
  ```

### Setting up `FastAPI`

- To get started, make sure that `python` (v3.9+ is preferrable), and `pip` (v22.x+ is prefferable) are fully installed.

- **_(OPTIONAL)_**: If you have **virtual environments**, such as `Anaconda` or `pipenv`, you can basically copy and paste the commands to set up the environment.

- For `Anaconda`:

  ```bash
  conda create -n <Name> python="<Version>"
  conda activate <Name>
  ```

- **First of all**: Clone this project and install requirements package (In case you don't have the **virtual environments**).

  ```bash
  cd server
  pip install -r requirements.txt
  ```

- **Finally**: Run the following command to bootstrap the server.

  ```bash
  uvicorn main:app --reload
  ```

- Voila, now your server is running and will be served (by default) at: http://localhost:8000.

## Questions and Conclusions

Should you have any further questions, FEAT or bugs, don't hesitate to raise on the `issues` section.

Best regards,

The Void
