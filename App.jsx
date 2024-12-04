import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Home from './screens/Home';
import Hive from './screens/Hive';
import Menu from './screens/Menu';
import Boxcode from './screens/Boxcode';
import Welcome from './screens/Welcome';
import User from './screens/User';
import Hivedetails from './screens/Hivedetails';
import Dashboard from './screens/Dashboard';
import Beefarming from './screens/Beefarming';

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
          name="Dashboard" 
          component={Dashboard} 
          options={{
            headerStyle: { backgroundColor: '#ffd54f' }, 
            headerTintColor: 'black', 
          }} 
        
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
          name="Hivedetails" 
          component={Hivedetails} 
           
        />

<Stack.Screen 
          name="Hive" 
          component={Hive}
          options={{
            headerStyle: { backgroundColor: '#ffd54f' }, 
            headerTintColor: 'black', 
          }} 
        
        />

<Stack.Screen 
          name="Bocxode" 
          component={Boxcode} 
          options={{ headerShown: false}} 
        />

        <Stack.Screen 
          name="Welcome" 
          component={Welcome} 
          options={{ headerShown: false }} 
        />

<Stack.Screen
  name="User"
  component={User}
  options={{
    headerStyle: { backgroundColor: '#ffd54f' }, 
    headerTintColor: 'black', 
  }}
/>

<Stack.Screen
  name="Beefarming"
  component={Beefarming}
  options={{
    headerStyle: { backgroundColor: '#ffd54f' }, 
    headerTintColor: 'black', 
  }}
/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
