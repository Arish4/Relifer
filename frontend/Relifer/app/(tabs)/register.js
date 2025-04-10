import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Config from './config';
 const BASE_URL = Config.BASE_URL;
export default function Register() {
  const navigation = useNavigation();

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [namee, setNamee] = useState(false);
  const [passworde, setPassworde] = useState(false);
  const [emaile, setEmaile] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [registerError, setRegisterError] = useState(''); 

  const Registerdata = async () => {
    if (!name) {
      setNamee(true);
    } else {
      setNamee(false);
    }

    if (!email) {
      setEmaile(true);
    } else {
      setEmaile(false);
    }

    if (!password) {
      setPassworde(true);
    } else {
      setPassworde(false);
    }

    if (!name || !email || !password) {
      return false;
    }

    try {
      const url = `${BASE_URL}/api/auth/register`;
      let response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      result = await response.json();
      console.log("Register response:", result); 
      if (result.message === "User already exists") {
        setRegisterError("User already exists");
        setModalVisible(true);
        setName('');
        setEmail('');
        setPassword('');
      
  
        setTimeout(() => {
          setModalVisible(false);
          navigation.navigate('login');
        }, 1000);
      } else if(result.message === 'User registered successfully'){
           setRegisterError("user registered successfully");
           setModalVisible(true);
           setName('');
      setEmail('');
      setPassword('');
    

      setTimeout(() => {
        setModalVisible(false);
        navigation.navigate('login');
      }, 2000);
      }else {
        setRegisterError("Can't register. Please try again.");
        setModalVisible(true);
      }
      
    } catch (error) {
      setRegisterError("Something went wrong. Please try again.");
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Register to continue</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.textinput}
        placeholder="Enter your name"
        placeholderTextColor="#aaa"
        autoCapitalize="words"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      {namee ? <Text style={styles.errorText}>enter the name</Text> : null}

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
      {emaile ? <Text style={styles.errorText}>enter the email</Text> : null}

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
          <Icon
            name={showPassword ? 'eye' : 'eye-off'}
            size={24}
            color="#aaa"
          />
        </TouchableOpacity>
      </View>
      {passworde ? <Text style={styles.errorText}>enter the password</Text> : null}

      <TouchableOpacity style={styles.button} onPress={Registerdata}>
        <Text style={styles.buttontext}>Register</Text>
      </TouchableOpacity>

      <Text
        style={styles.linkText}
        onPress={() => navigation.navigate('login')}
      >
        Already have account? Login
      </Text>

      {/* Modal for errors */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{registerError}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
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