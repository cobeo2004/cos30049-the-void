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

### Back-end Setup (FastAPI)

1. **Prerequisite**: Ensure that you have successfully bootstrapped your server and that it is running at `http://localhost:8000`.
2. Change to the `server` directory.
3. Install the required packages:
   ```sh
   pip install -r requirements.txt
   ```
4. Start the FastAPI server:
   ```sh
   python main.py
   ```

### Front-end Setup (Next.js)

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
