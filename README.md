# CosmosDB + React Native
<img src="https://github.com/jay-most/cosmosdb-react-native/blob/master/assets/splash_image.png">
Building a mobile application with Cosmos DB and React Native is simple… let's give it the old college try :$. First, we need to set up our environment. I use a Mac, so adjust accordingly. To setup up our environment, we need a few things React Native, Expso, Yarn, snack (optional), and Cosmo Db keys.

<img src="https://github.com/jay-most/cosmosdb-react-native/blob/master/images/Screen%20Shot%202020-11-18%20at%206.00.48%20AM.png" width="283" height="507">
## Prerequisites

### Step 1: Installing Node and Watchman
The official guide suggests using Homebrew to install Node and Watchman. So first thing first, run this command to install Homebrew
```javascript
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```
Run the following commands to install Node and Watchman.
```javascript
brew install node
brew install watchman
```
[^1]: Make sure you have an 8.3 or newer version of node.

### Step 2: Creating a new Application
Now all the dependencies are installed, and we can create our new Application. Run this command to create a new React Native App

```javascript
npx react-native init cosmosdb-react-native
```

This command will create a new project named AwesomeProject. If you used "gem" to install CocoaPods, you would also need to run the pod command to install all the dependencies.

### Step 3: Running App through Command line
* First, navigate to the project folder. cd AwesomeProject
then execute this command to run the app in simulator next react-native run-ios
* Running App through Xcode
* Go to your App folder, then go to the iOS folder. You'll see a file named AwesomeProject.xcworkspace.
* Open this file, and it will open your app in Xcode. Select the desired simulator and click the ▶️ button to run your app. and Tadaaa!! 🎉 🎊 https://www.npmjs.com/package/react-native-azure-cosmos
  
### Step 4: Install CosmosDB package
https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/cosmosdb/cosmos

NodeJS

Npm comes preinstalled with NodeJS. You should be using Node v10 or above.
```javascript
npm install --save @azure/cosmos@latest
npm install --save isomorphic-webcrypto
npm install --save react-native-crypto
npm install --save react-native-get-random-values
npm install --save randombytes
```
### Get Account Credentials
You will need your Cosmos DB Account Endpoint and Key. You will find these in the Azure Portal or use the Azure CLI snippet below. 

This snippet is formatted for the Bash shell.

```javascript
az cosmosdb show --resource-group <your-resource-group> --name <your-account-name> --query documentEndpoint --output tsv
az cosmosdb list-keys --resource-group <your-resource-group> --name <your-account-name> --query documentEndpoint --output tsv
```

### Create an instance of CosmosClient
Interaction with Cosmos DB starts with an instance of the CosmosClient class
```javascript
const CosmosClient = require('@azure/cosmos').CosmosClient

const endpoint = '[endpoint]'
const key = '[key]'
const databaseId = 'ToDoList'
const containerId = 'Items'

const client = new CosmosClient({ endpoint, key })
```
## Create the query spec
const querySpec = {
  query: 'SELECT * from c'
};

## Create an instance of CosmosClient
      const response = client
        .database(databaseId)
        .container(containerId)
        .items.query(querySpec)
        .fetchAll()
```

### Source
https://github.com/jay-most/cosmosdb-react-native
