# MyDocGen Sample Application: PHP and React

## Introduction

MyDocGen is a Docusign sample application written in PHP (server) and React (client).

MyDocGen demonstrates the following:

1. **Authentication** with Docusign via [JSON Web Token (JWT) Grant](https://developers.docusign.com/platform/auth/jwt/).
2. Three document generation use cases:
* A **Personal loan agreement** wherein a loan agent enters the customer's personal information and selects lease terms in the prefill form to generate a fully customized loan agreement. 
* An **HR offer letter** wherein an HR specialist generates offer letters personalized with information for up to three applicants. 
* A **legal form** wherein a legal firm employee generates an equal-pay claims application form that is personalized with a potential client’s information.
Bulk sending envelopes, sending envelopes via SMS, and embedded sending.

## Prerequisites

- Create a Docusign developer [account](https://go.docusign.com/o/sandbox/).
- Create an application on the [Apps and Keys](https://admindemo.docusign.com/authenticate?goTo=appsAndKeys) page and copy credentials to `backend/.env`:
  client ID (integration key), user ID, account ID and copy **RSA private key** to a file `storage/docusign_private.key`.
  This [**video**](https://www.youtube.com/watch?v=GgDqa7-L0yo) demonstrates how to create an integration key (client ID) for a user application like this example.
- Add redirect URI `{ PROTOCOL }://{ DOMAIN }/callback`
- [PHP 8.1](https://www.php.net/downloads.php)
- [Docker](https://www.docker.com/) installed and configured in your machine.
- [Composer](https://getcomposer.org/download/) set up in your PATH environment variable so you can invoke it from any folder.

> For first time use, paste login endpoint URL into your browser and grant consent to the app.

### Variables configuration

Create a copy of the file backend/.env.example, save the copy as backend/.env, and fill in the data:

- MANAGER_LOGIN - email used for getting access token for endpoints
- MANAGER_PASSWORD - password used for getting access token for endpoints
- DOCUSIGN_BASE_URL - `https://demo.docusign.net/restapi` for development environment
- DOCUSIGN_CLIENT_ID - integration key GUID
- DOCUSIGN_USER_ID - impersonated user ID
- DOCUSIGN_ACCOUNT_ID - API account ID

## Local installation instructions

1. Build the images using the following command:
   
   ```
   docker compose -f docker-compose-local.yml build
   ```

2. Start the containers using the following command. Add the `-d` flag to run the process in the background:

   ```
   docker compose -d docker-compose-local.yml up
   ```

3. Open a new terminal and set the application key by running the command:

   ```
   docker exec -it mydocgen_php php artisan key:generate
   ```

4. Install the database structure using these two commands:

   ```
   docker exec -it mydocgen_php php artisan migrate --seed
   docker exec -it mydocgen_php php artisan passport:install
   ```

5. Clear the cache:

   ```
   docker exec -it mydocgen_php php artisan cache:clear
   ```

6. Open a browser to [localhost](http://localhost).
