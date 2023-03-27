

Steps to follow to run App:
1.Run `npm install`
Install dependencies and packages


2.Run `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


IN CASE:
if you facing any 401 or Unauthorised issues while running the app,You can generate a classic token in Github under setting->developer settings->Personal access tokens->Token(classic)->create new token

Place this token in Octokit instance in src/constants/index.js 
and then try to run the app.

BONUS:
### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
Your app is ready to be deployed!