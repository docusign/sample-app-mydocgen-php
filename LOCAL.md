## How to Run Locally

1. Put all the necessary variables into the `./backend/.env` file.

2. Copy the `docusign_private.key` file to the `./backend/storage/` directory.

3. Build the images using the following command:
   
   ```
   docker compose -f docker-compose-local.yml build
   ```

4. Start the containers using the following command. Add the `-d` flag to run the process in the background:

   ```
   docker compose -f docker-compose-local.yml up
   ```

5. Install php packages:

   ```
   docker exec -it mydocgen_php composer install
   ```

6. Open a new terminal and set the application key by running the command:

   ```
   docker exec -it mydocgen_php php artisan key:generate
   ```

7. Install the database structure using these two commands:

   ```
   docker exec -it mydocgen_php php artisan migrate --seed
   docker exec -it mydocgen_php php artisan passport:install
   ```

9. Clear the cache:

   ```
   docker exec -it mydocgen_php php artisan cache:clear
   ```

8. Open a browser to [localhost](http://localhost).

By following these steps, you should be able to run the application locally.

Please note that these instructions assume you have Docker and Docker Compose installed and configured on your machine.
