import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UnAuthHomeScreen from './src/Screens/homeScreen';

import SigninScreen from './src/Screens/SigninScreen';
import SignupScreen from './src/Screens/SignupScreen';

import { Provider } from 'react-redux';
import configureStore from './src/redux/store';


const store = configureStore();



export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={UnAuthHomeScreen} options={{ title: 'Sign in Page' }} />
          <Stack.Screen name="Signin" component={SigninScreen} options={{ title: 'Sign in Screen' }} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Sign up Screen' }} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

