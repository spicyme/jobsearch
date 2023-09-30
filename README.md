## Job Search API

## Requirements

* Node 18.80
* Docker
* Docker-compose

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/spicyme/jobsearch.git
cd jobsearch/src
```

```bash
npm install
```

## Steps for read and write access (recommended)

To start the express server with docker, run the following

```bash
npm run docker:dev
```

Open [http://localhost:4005](http://localhost:4005) and take a look around.

## Set up new environment variables
Open `.env` and inject your credentials so it looks like this

```
PORT=4005
MONGODB_URL=mongodb://job-search-mongodb:27017/job-search
JWT_SECRET=thisisasamplesecret
JWT_ACCESS_EXPIRATION_MINUTES=30
JWT_REFRESH_EXPIRATION_DAYS=30
JWT_RESET_PASSWORD_EXPIRATION_MINUTES=10
JWT_VERIFY_EMAIL_EXPIRATION_MINUTES=10

```