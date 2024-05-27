# Deplyoment Steps

## 1. Create .env that contains with the important info such as the URL where the App should run
Example:

```bash
REACT_APP_BASE_URL=http://localhost:8082
```

Use your own URL


## 2. Dockerize the App
a. Create de Dockerfile with the app info to make the App Image

```bash
# Dockerfile
```

b. Add a .gitignore with the files you don't want to use to create the Image. Example: node_modules, .env, .git, etc.

```bash
# .dockerignore
```


## 3. Create the docker-compose.yml
Start defining your services

Run Docker Compose. Once you’ve defined your services in the docker-compose.yml file, you can start all of them with a single command: ```docker-compose up```

Each service in the docker-compose.yml file runs in its own container. Containers are like lightweight, standalone virtual machines. They allow you to run your application and its dependencies in an environment that’s isolated from the rest of your system.


## 4. Build the Docker Image
Navigate to the directory containing your docker-compose.yaml and run the following command in your terminal:

```bash
docker-compose build
```

This command builds images for all services defined in your ```docker-compose.yml file```


## 5. Start the Docker Containers
Run the following command to start your Docker containers:

```bash
docker-compose up
```

This command starts all your Docker containers. 


---
# Possible Problems:

## Build again the docker image after a change in the code:

1. **Stop the Running Containers:** You can stop and remove the running containers with the following command:

    ```bash
    docker-compose down
    ```

    This command stops and removes the containers, networks, and volumes defined in your ```docker-compose.yml``` file.


1. **Remove the old Docker image:** Before you rebuild the Docker image, you might want to remove the old one to avoid confusion. You can do this with the command:

    ```bash
    docker rmi <image_id>
    ```

    You can get the ```<image_id>``` by running  ```docker images```, which lists all Docker images.


1. **Rebuild the Docker Images:** After making changes to your Dockerfile or docker-compose.yml file, you can rebuild the Docker images as you made it in [Build the Docker Image](#4-build-the-docker-image)

1. **Start the Docker Containers:** Start your Docker containers again as you made it in [Start the Docker Containers](#5-start-the-docker-containers)