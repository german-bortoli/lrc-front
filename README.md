# Find your service challenge

## Installation

 - Clone the repo `git clone https://github.com/Germanaz0/lrc-front.git`
 - Install deps `cd lrc-front && npm install`
 - Copy `.env.example` to `.env` and modify if needed.
 - You may need a Google maps api key, it was provided in the email, or you can generate one by [clicking here](https://developers.google.com/maps/documentation/javascript/get-api-key)
 - Run `npm start` and go to `http://127.0.0.1:3000`

User credentials: `tester@lrc.example.com/password` 
## Backend Application

The repository can be found [clicking here](https://github.com/Germanaz0/lrc-api)


## Screenshots

**Homepage**: Guest user
![Home : LoggedIn](./docs/screenshots/screenshot-home-guest.png)

**Login Page**: Login page
![Home : LoggedIn](./docs/screenshots/screenshot-login-form.png)

**Homepage**: User is authenticated
![Home : LoggedIn](./docs/screenshots/screenshot-home-loggedin.png)

**Delete Dialog**: When authenticated user deletes a service
![Home : LoggedIn](./docs/screenshots/screenshot-delete-service.png)


**Edit Service**: When authenticated edit a service (with google autocomplete)
![Home : LoggedIn](./docs/screenshots/screenshot-edit-service-ac.png)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
