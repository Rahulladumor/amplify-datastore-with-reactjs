This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

Datastore with AWS Amplify & React

Amplify DataStore provides a programming model for leveraging shared and distributed data without writing additional code for offline and online scenarios, which makes working with distributed, cross-user data just as simple as working with local-only data.
AWS Amplify is a JavaScript library for frontend and mobile developers building cloud-enabled applications

AWS Amplify provides a declarative and easy-to-use interface across different categories of cloud operations. AWS Amplify goes well with any JavaScript based frontend workflow, and React Native for mobile developers.
Our default implementation works with Amazon Web Services (AWS), but AWS Amplify is designed to be open and pluggable for any custom backend or service.

Real-Time Message Board With AWS Amplify & React

Start with create-react-app

    $npx create-react-app amplify-datastore - use-npm

    cd amplify-datastore

    npx amplify-app@latest

Once the basic setup completes open the GraphQL schema located in amplify/backend/api/<datasourcename>/schema.graphql.

Change graphql schema:

        type Message @model {
        id: ID!
        title: String!
        color: String
        createdAt: String
        }

Next jump back to command line so we can install the dependencies that will be needing the dependencies that will be adding or ant designed for some UI components react color for a color picker and amplify core and amplify data store

        yarn add antd react-color @aws-amplify/core @aws-amplify/datastore

amplified datastore uses data models based on your graph QL schema to interact with the datastore API we can generate these models by running

    $ npm run amplify-modelgen

this command will introspect your graphQL schema and generate the necessary model for our app we can now look in the source directory and see that we have a new models directory next to initialize the amplify project in the cloud we can run amplify annette here will give our environment name choose our default text editor and then choose our AWS profile.

we're now ready to deploy our app to do so we can run

    $ amplify push

since we will be working with the datastore API we can choose no when
asked to generate graphQL code locally

Now that the backend has been deployed.

Now open `src/index.js`

In this file we'll import the ant design styling amplify from amplify core the configuration that was generated for us by the CEO located at AWS exports and then we'll call amplify dot configure passing in the config
next we can open up `app.js`.

Now just deleting all of the code in `app.js` file and put below code in `app.js` file

`App.js`

    import React, { useState, useEffect } from 'react';

    import { SketchPicker } from 'react-color';
    import { Input, Button } from 'antd';
    import { DataStore } from '@aws-amplify/datastore';
    import { Message } from './models';

    const initialState = { color: '#000000', title: '' };

    function App() {
    const [formState, updateFormState] = useState(initialState);
    const [messages, updateMessages] = useState([]);
    const [showPicker, updateShowPicker] = useState(false);

    useEffect(() => {
    fetchMessages();
    const subscription = DataStore.observe(Message).subscribe(() =>
    fetchMessages()
    );
    return () => subscription.unsubscribe();
    });

    function onChange(e) {
    if (e.hex) {
    updateFormState({ ...formState, color: e.hex });
    } else {
    updateFormState({ ...formState, title: e.target.value });
    }
    }

    async function fetchMessages() {
    const messages = await DataStore.query(Message);
    updateMessages(messages);
    }
    async function createMessage() {
    if (!formState.title) return;
    await DataStore.save(new Message({ ...formState }));
    updateFormState(initialState);
    }

    return (
    <div style={container}>
    <h1 style={heading}>Real Time Message Board</h1>
    <Input
        onChange={onChange}
        name="title"
        placeholder="Message title"
        value={formState.title}
        style={input}
        />
    <div>
    <Button onClick={() => updateShowPicker(!showPicker)} style={button}>
    Toggle Color Picker
    </Button>
    <p>
    Color:{' '}
    <span style={{ fontWeight: 'bold', color: formState.color }}>
    {formState.color}
    </span>
    </p>
    </div>
    {showPicker && (
    <SketchPicker color={formState.color} onChange={onChange} />
    )}
    <Button type="primary" onClick={createMessage}>
    Create Message
    </Button>
    {messages.map((message) => (
    <div
    key={message.id}
    style={{ ...messageStyle, backgroundColor: message.color }} >
    <div style={messageBg}>
    <p style={messageTitle}>{message.title}</p>
    </div>
    </div>
    ))}
    </div>
    );
    }

    const container = { width: '100%', padding: 40, maxWidth: 900 };
    const input = { marginBottom: 10 };
    const button = { marginBottom: 10 };
    const heading = { fontWeight: 'normal', fontSize: 40 };
    const messageBg = { backgroundColor: 'white' };
    const messageStyle = { padding: '10px', marginTop: 7, borderRadius: 2 };
    const messageTitle = { margin: 0, padding: 9, fontSize: 20 };

    export default App;

Now we are ready to test everything out to do so we can run

    $ npm start

Now successfully running ..!
Well it Works !!
