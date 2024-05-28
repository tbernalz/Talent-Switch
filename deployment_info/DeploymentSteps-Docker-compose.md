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

**Push the images to docker hub:** (push all the images you created with the ```docker-compose build```)

Tagging. Run: 

``` bash
docker tag magneto-p07-frontend:latest tbernal121/talent-switch-frontend
```

Replace ```tbernal121``` with your username and ```magneto-p07-frontend:latest``` with the tag of your image. And also replace ```talent-switch-frontend``` with the name you would give to the image.

Push:

``` bash
docker push tbernal121/talent-switch-frontend
```

Replace ```tbernal121``` with your username and ```talent-switch-frontend``` with the name you gave to the image in the past step.



## 5. Start the Docker Containers
Run the following command to start your Docker containers:

```bash
docker-compose up
```

This command starts all your Docker containers. 


## 6. Set Up a GCP Project:
Create a new project in the Google Cloud Console.


## 7. Install and Configure Google Cloud SDK:
* Install the Google Cloud SDK by following the [installation instructions](https://cloud.google.com/sdk/docs/install).

* Initialize the SDK and authenticate with your GCP account:

```bash
gcloud init
```

In the Visual Studio Code this should throw an error because PowerShell prevent unauthorized scripts from running on your system. Look for options to run ```gcloud init```. 

* Make the setup for ```gcloud```


## 8. Enable Required GCP Services:
Enable the necessary APIs for your project:

```bash
gcloud services enable compute.googleapis.com
gcloud services enable container.googleapis.com
```


## 9. Set Up Google Kubernetes Engine (GKE):
Since Docker Compose is not natively supported on GCP, we will use Google Kubernetes Engine (GKE) to deploy your application.

* Create a GKE cluster:

  ```bash
  gcloud container clusters create magneto-cluster --num-nodes=3 --zone=us-central1-a
  ```

* **Install the gke-gcloud-auth-plugin binary:** gcloud components install only works in PowerShell running with Admin Privileges. You can install the ```gke-gcloud-auth-plugin``` using the ```gcloud``` command.

  ```bash
  gcloud components install gke-gcloud-auth-plugin
  ```

  A window should popup and proceed with the installation or update of the components.

* **Verify the gke-gcloud-auth-plugin binary installation:** After installation, you can check whether the plugin is installed correctly by running the following command:

  ```bash
  gke-gcloud-auth-plugin --version
  ```

* Get credentials for the cluster:

  ```bash
  gcloud container clusters get-credentials magneto-cluster --zone=us-central1-a
  ```

  Raplace ```magneto-cluster``` with your clusters name.


## 10. Prepare Your Docker Compose for Kubernetes:
Convert your docker-compose.yml to Kubernetes manifests using kompose, a tool that helps with the conversion:

* Install Kompose: Follow the [installation instructions](https://kompose.io/installation/).

* Convert Docker Compose to Kubernetes Manifests:

```bash
kompose convert -f docker-compose.yml
```

This will generate Kubernetes YAML files for your services.


## 11. Deploy to GKE:
Apply the Kubernetes manifests:

```bash
kubectl apply -f <generated-yaml-files>
```

## 12. Set Up Persistent Storage

* Create a persistent disk:

  ```bash
  gcloud compute disks create --size=10GB --zone=us-central1-a magneto-disk
  ```

* Create a YAML file for the PersistentVolume (PV) named pv.yaml:

  ```bash
  apiVersion: v1
  kind: PersistentVolume
  metadata:
    name: magneto-pv
  spec:
    capacity:
      storage: 10Gi
    accessModes:
      - ReadWriteOnce
    gcePersistentDisk:
      pdName: magneto-disk
      fsType: ext4
  ```

* Create a YAML file for the PersistentVolumeClaim (PVC) named pvc.yaml:

  ```bash
  apiVersion: v1
  kind: PersistentVolumeClaim
  metadata:
    name: magneto-pvc
  spec:
    accessModes:
      - ReadWriteOnce
    resources:
      requests:
        storage: 10Gi
  ```

* Apply the PV and PVC:

  ```bash
  kubectl apply -f pv.yaml
  kubectl apply -f pvc.yaml
  ```




## 12. Set Up Persistent Storage:
Ensure that your MariaDB service uses persistent storage. Modify the generated Kubernetes manifest for the database to include a PersistentVolume (PV) and a PersistentVolumeClaim (PVC).

```bash
# Example PVC for MariaDB
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mariadb-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
```


## 13. Expose Your Application:
Expose your application to the internet using a LoadBalancer service or an Ingress resource. Here's an example of a LoadBalancer service for your application:

```bash
apiVersion: v1
kind: Service
metadata:
  name: app-service
spec:
  selector:
    app: app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8082
  type: LoadBalancer
```


## 14. Secure Your Deployment (optional):
* Use HTTPS by setting up SSL certificates. You can manage this with Kubernetes Ingress and cert-manager.

* Implement IAM roles and permissions to control access to your GCP resources.


# Example of Deploying MariaDB and Application in GKE
Here is a simplified example of what the Kubernetes manifests might look like for your MariaDB and application deployments:

**MariaDB Deployment and Service:**
```bash
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mariadb
spec:
  selector:
    matchLabels:
      app: mariadb
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: mariadb
    spec:
      containers:
      - image: mariadb:10.5
        name: mariadb
        env:
        - name: MYSQL_ROOT_PASSWORD
          value: admin123
        - name: MYSQL_DATABASE
          value: magneto_db
        ports:
        - containerPort: 3306
          name: mariadb
        volumeMounts:
        - name: mariadb-persistent-storage
          mountPath: /var/lib/mysql
      volumes:
      - name: mariadb-persistent-storage
        persistentVolumeClaim:
          claimName: mariadb-pvc

---
apiVersion: v1
kind: Service
metadata:
  name: mariadb
spec:
  ports:
  - port: 3306
  selector:
    app: mariadb
  clusterIP: None

```

**Application Deployment and Service:**
```bash
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app
spec:
  selector:
    matchLabels:
      app: app
  template:
    metadata:
      labels:
        app: app
    spec:
      containers:
      - name: app
        image: your-app-image
        ports:
        - containerPort: 8082

---
apiVersion: v1
kind: Service
metadata:
  name: app
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 8082
  selector:
    app: app
```

Replace ```your-app-image``` with the actual Docker image of your backend application.




---
# Possible Problems:

## With Dockerfile: Build again the docker image after a change in the code:

docker-compose down --rmi all

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


---


# How to stop the computing resources of the Kubernetes Cluster ("stoping" the Cluster)

 ## 1. Scaling Down Nodes to Zero

 * **Identify Node Pool:** Use ```kubectl get nodes``` to list the nodes in your cluster. The output will typically show a single node pool by default.

* **Scale Down the Node Pool:** To scale down the number of nodes in your node pool to zero, run:

  ```bash
  gcloud container clusters resize <cluster-name> --num-nodes 0 --zone <zone>
  ```

  Replace ```<cluster-name>``` with the actual name of your cluster and ```<zone>``` with the zone where your cluster is located (e.g., us-central1-a).

This effectively pauses your cluster as there won't be any compute resources running for your pods. Your deployments and configurations will remain intact, allowing you to easily resume operations by scaling the node pool back up later.


## Scaling Back Up:

When you're ready to resume using your cluster, you can easily scale the node pool back up to the desired number of nodes using:

```bash
gcloud container clusters resize <cluster-name> --num-nodes <desired-number-of-nodes> --zone <zone>
```

Replace ```<cluster-name>``` with the actual name of your cluster, ```<desired-number-of-nodes>``` with the desored number of nodes that you want, and ```<zone>``` with the zone where your cluster is located (e.g., us-central1-a).