import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Home from './screens/Home';
import Hive from './screens/Hive';
import Menu from './screens/Menu';
import Boxcode from './screens/Boxcode';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ headerShown: false }} // Hides the header if not needed
        />
        <Stack.Screen 
          name="Menu" 
          component={Menu} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} 
        />
       
        <Stack.Screen 
          name="Boxcode" 
          component={Boxcode} 
          options={{ headerShown: false }} 
        />

<Stack.Screen 
          name="Hive" 
          component={Hive} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
