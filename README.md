# sati-test-skill

Sati-test-skill
Sati-test-skill is a monorepo project that combines a ReactJS frontend with a NestJS backend. It is designed to test your skills and knowledge in various areas, including but not limited to coding, problem-solving, and critical thinking.

Installation
To run the project, you need to install the dependencies using the following command:

npm install

Usage
To start the project in development mode, use the following command:

npm run dev

This will launch both the ReactJS frontend and NestJS backend in development mode, allowing you to make changes and see the results in real-time.



Alternatively, you can build and run the project using Docker Compose:



docker-compose up



Building a Docker Container
To build a Docker container for your Sati-test-skill project, follow these steps:

Navigate to the apps/<client or api> directory using the following command:



cd /apps/api if you want to run api 
cd /apps/client  if you want to run client 


Build the Docker container using the following command:



docker build -t <containername>

  
  
Once the container has been built, you can run it using the following command:

  
  
docker run -p 3000:3000 <containername>  if you want to run client  
docker run -p 8000:8000 <containername>  if you want to run api
