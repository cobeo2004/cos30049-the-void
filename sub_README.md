# Civil Aviation Prediction Application by The Void

## Brief Introduction

Welcome to our project! In this repository, we will be working on an exciting and innovative solution. Our goal is to create a good-looking website that leverages the power of AI to predict the price and the delay causes of airline carriers and provide a seamless experience for our users. We are a dedicated team of developers who are passionate about creating cutting-edge software. Join us on this journey as we strive to make a positive impact in the world of technology.

## Team Members

- [Xuan Tuan Minh Nguyen](https://github.com/cobeo2004)
- [Trong Dat Hoang](https://github.com/trongdathoang)
- [Ba Viet Anh Nguyen](https://github.com/vtank4)

## Our Tech Stack

### Front-end

- **Programming Languages**: `Typescript`.
- **Libraries & Frameworks**:
  - `NextJS`: Main library for writing scalable and effective **Single Page Application** `React` code in `Typescript`.
  - `TailwindCSS`: For powerful and easy styling.
  - `shadcn/ui`: Empowers the `radix-ui` library by creating instant components.
  - `aceternity-ui`: Empowers the `radix-ui`, `shadcn/ui`, and `framer-motion` libraries to create instant and smooth motion components.
  - `magic-ui`: Inherits the `radix-ui`, `shadcn/ui`, and `framer-motion` libraries to create instant and smooth motion components.
  - `tanstack/react-query-table`: Makes table queries easier than before.
  - `next-safe-action`: For effectively use the power of **Server Action**

### Back-end

- **Programming Language**: `Python`.
- **Libraries & Frameworks**:
  - `FastAPI`: For creating a scalable and RESTful Application Programming Interface (API).
  - `Prisma`: A powerful Object Relational Mapping (ORM) for creating databases without actually interacting with SQL language.
  - `SerpAPI`: For providing real-time data for flight prices from **Google Flights**.
  - `JWT`: For protecting private API routes from illegal access.
- **Machine Learning**:
  - `TensorFlow`: For a full-range framework that supports creating neural networks.
  - `pandas`: For handling faulty data.

### Database

- `PostgreSQL`: Main relational database for the project.

### Version Control

- `GitHub`: For controlling the version and development of the project.

## Setup Instructions

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

- Add a `.env` file with the following configuration (Not required as there are .env provided in the submission):

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
  # Note: This is for reference only !

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

### Back-end Setup (FastAPI)

1. Change to the `server` directory.
2. Install the required packages:
   ```sh
   pip install -r requirements.txt
   ```
3. Start the FastAPI server:
   ```sh
   python main.py
   ```

- Voila, now your server is running and will be served (by default) at: http://localhost:8000.

### Front-end Setup (Next.js)

- **Prerequisite**: Ensure that you have successfully bootstrapped your server and that it is running at `http://localhost:8000`.

1. Change to the `client-next` directory.
2. Install all of the required packages:
   ```sh
   npm install # (Or yarn install, pnpm install, or bun install depending on your package manager)
   ```
3. Start your application using the following command:
   ```sh
   npm run dev # (Or yarn dev, pnpm run dev, or bun run dev depending on your package manager)
   ```
4. Your front-end will be served at: [http://localhost:3000](http://localhost:3000).

## Running Instructions

- Ensure both the back-end and front-end servers are running simultaneously.
- The back-end API will be accessible at `http://localhost:8000`, while the front-end will be available at `http://localhost:3000`.

## Questions and Conclusions

Should you have any further questions, feature requests, or bugs, don't hesitate to raise them in the `issues` section.

Best regards,

The Void
