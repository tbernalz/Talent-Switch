# Deployment Steps

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

## 3. Build the Docker Image
Navigate to the directory containing your Dockerfile and run the following command in your terminal:

```bash
docker build -t <my-app> .
```

Replace ```<my-app>``` with the name you want to give to your Docker image.

This command tells Docker to build an image using the Dockerfile in the current directory (denoted by the .). The -t flag lets you tag your image so it’s easier to find later. Here, my-app is the tag for your image.


## 4. Run the Docker Container
After your image is built, you can run it as a container with this command:

```bash
docker run -p 8082:8082 my-app
```

This tells Docker to run a container from your my-app image and map port 8082 of your machine to port 8082 in the Docker container. This means your application will be accessible at localhost:8082 on your machine. The ports are examples, replace it.


---
# Possible Problems:

## Build again the docker image after a change in the code:

1. **Stop the running container:** You can stop the running Docker container by using the command:

    ```bash
    docker stop <container_id>
    ```

    You can get the ```<container_id>``` by running  ```docker ps```, which lists all running containers.


1. **Remove the container:** You can also remove the container.

    Here’s how you can remove a Docker container:

    ```bash
    docker rm <container_id>
    ```

    You can get the ```<container_id>``` by running  ```docker ps -a```, which lists all containers, including the ones that are stopped.


1. **Remove the old Docker image:** Before you rebuild the Docker image, you might want to remove the old one to avoid confusion. You can do this with the command:

    ```bash
    docker rmi <image_id>
    ```

    You can get the ```<image_id>``` by running  ```docker images```, which lists all Docker images.


1. **Build the Docker image:** Build it as you made it in [Build the Docker Image](#3-build-the-docker-image)

1. **Run the Docker container:** Run it as you made it in [Run the Docker Container](#4-run-the-docker-container)