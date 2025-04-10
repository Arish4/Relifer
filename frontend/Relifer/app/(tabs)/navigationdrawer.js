import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import homepage from './homepage';
import createpost from './createpost';
import AsyncStorage from '@react-native-async-storage/async-storage';
import updatepost from './updatepost';
import deletepost from './deletepost';
import {useNavigation} from '@react-navigation/native';
const Drawer = createDrawerNavigator();
const CustomDrawerContent = (props) => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.replace('login'); 
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#111' }}>
      
      <View style={{ flex: 1 }}>
      {props.state.routes.map((route) => (
  <TouchableOpacity
    key={route.key} 
    onPress={() => props.navigation.navigate(route.name)}
    style={styles.drawerItem}
  >
    <Text style={styles.drawerText}>{route.name}</Text>
  </TouchableOpacity>
))}
      </View>

      
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: 'black' },
        headerTintColor: 'white',
        drawerStyle: { backgroundColor: '#111' },
        drawerLabelStyle: { color: 'white' },
      }}
    >
    
      <Drawer.Screen name="Home" component={homepage} />
      <Drawer.Screen name="Create Post" component={createpost} />
      <Drawer.Screen name="Update Post" component={updatepost} />
      <Drawer.Screen name="Delete Post" component={deletepost} />
    </Drawer.Navigator>
  );
}const styles = StyleSheet.create({
  drawerItem: {
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: '#333',
  },
  drawerText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    padding: 15,
    borderTopWidth: 0.5,
    borderColor: '#333',
    backgroundColor: '#222',
  },
  logoutText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});
