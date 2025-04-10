
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './navigationdrawer';
import login from './login';
import register from './register';

const Stack = createNativeStackNavigator();

export default function Main(){
  return(
    <Stack.Navigator initalRouteName ="login">
      <Stack.Screen options={{headerShown:false}} name="login" component={login}/>
      <Stack.Screen options={{headerShown:false}} name="register" component={register}/>
      <Stack.Screen options={{headerShown:false}} name="homepage" component={DrawerNavigator}/>
      

    </Stack.Navigator>
    
  
)}