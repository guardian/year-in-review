# Year in Review

Google Assistant Action. The [Year in Review](https://assistant.google.com/services/a/uid/0000005b08e20dd7?hl=en_uk) is an interactive Quiz where each round is linked to one of the Guardian's podcasts. This repo contains the firebase function that provides the Action's back end in the [functions](./functions) directory and JSON representation of the Dialogflow [intents](./dialogflowIntentsJson) and [entities](./dialogflowEntitiesJson) and a [zip file](Year-In-Review.zip) for restoring the Dialogflow part of the Action

## Set up

```
cd functions
yarn install
```

## Deploy

```
yarn deploy
```

This deploys the project to PROD. Any changes that need to be made to the Dialogflow parts of the project need to done in the Dialogflow [console](https://console.dialogflow.com).

The deploy steps are outlined in the [firebase.json](./firebase.json) file and the default project ID is defined in [.firebaserc](./.firebaserc).

## Running Locally

You will need to construct some JSON to pass to the function. The shape of this JSON is documented [here](https://developers.google.com/actions/build/json/dialogflow-webhook-json). You can also get an example of some JSON by going to the [simulator](https://console.actions.google.com/project/year-in-review-138f5/simulator) then going to the 'Request' tab.

```
# This assumes a file called data.json where the json is the correct  dialogflow
yarn shell
const data = require('./data.json')
yearInReviewFulfillment.post().form(data)
```

Alternatively

```
yarn serve
```

Will run the firebase function locally at [http://localhost:5000/year-in-review-138f5/us-central1/yearInReviewFulfillment](http://localhost:5000/year-in-review-138f5/us-central1/yearInReviewFulfillment) and the endpoint can be posted to directly.

[Blog post](https://www.theguardian.com/info/2019/jan/31/hey-google-help-me-use-cloud-functions) on firebase functions locally

## Guardian Specific Information

Guardian specific information about the project is available [here](https://github.com/guardian/voicelab-platform)
