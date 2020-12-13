# Survey Frontend

Frontend part of survey web application

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.
All instructions are relevant for the Ubuntu version 18.04

### Prerequisites

What things you need to install the software and how to install them

Install common software
```
sudo apt-get install -yqq software-properties-common
sudo apt-get update -yqq
sudo apt-get install -yqq git curl
```

Install nvm
```
cd ~
curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh -o install_nvm.sh
bash install_nvm.sh
source ~/.profile
```

Install node
```
nvm install 6.14.0
```

### Installing

Return to the project directory
```
cd path_to_frontend_directory
```

Switch to required node version. Always use this version for further work with npm
```
nvm use 6.14.0
```

Install libs
```
npm install
```

Create config
```
cp public/assets/config.js.sample public/assets/config.js
```

### Running the Application

Launch frontend dev-server with default host - localhost:8090
```
npm run dev
```

Open http://localhost:8090/frontend on your web browser.
Make sure that you have backend server running on localhost:8000.


## Running coding style tests

Check code makeup according to rules
```
npm run lint
```

Fix code makeup according to rules
```
npm run lint-fix
```


## Deployment

### Creating application build
```
npm run build
````

### Creating build branches for deploy

Create build branch
```
make
````
