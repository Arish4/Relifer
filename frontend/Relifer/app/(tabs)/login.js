import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from './config';
 const BASE_URL = Config.BASE_URL;
export default function Login() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passworde, setPassworde] = useState(false);
  const [emaile, setEmaile] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [registerError, setRegisterError] = useState('');

  const logindata = async () => {
    if (!email) setEmaile(true);
    else setEmaile(false);

    if (!password) setPassworde(true);
    else setPassworde(false);

    if (!email || !password) return;

    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

if (res.ok) {
  await AsyncStorage.setItem('token', data.token);
  navigation.navigate('homepage'); 
} else if (data.message === "Incorrect password") {
  setRegisterError("Wrong password");
  setModalVisible(true);
} else if (data.email === 'user not found') {
  setRegisterError("Wrong username");
  setModalVisible(true);
} else {
  setRegisterError(data.message || "Can't login. Please try again.");
  setModalVisible(true);
}
    } catch (error) {
      setRegisterError("Something went wrong. Please try again.");
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.textinput}
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      {emaile ? <Text style={styles.errorText}>Enter the email</Text> : null}

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter your password"
          placeholderTextColor="#aaa"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? 'eye' : 'eye-off'} size={24} color="#aaa" />
        </TouchableOpacity>
      </View>
      {passworde ? <Text style={styles.errorText}>Enter the password</Text> : null}

      <TouchableOpacity style={styles.button} onPress={logindata}>
        <Text style={styles.buttontext}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.linkText} onPress={() => navigation.navigate('register')}>
        Don't have an account? Register
      </Text>

      <Modal
        transparent={true}
        animationType='fade'
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{registerError}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: '#bbb',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#eee',
  },
  textinput: {
    backgroundColor: '#222',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#fff',
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 40,
    paddingHorizontal: 50,
    paddingVertical: 12,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttontext: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  linkText: {
    color: '#1E90FF',
    marginTop: 15,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginBottom: 10,
    marginLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});