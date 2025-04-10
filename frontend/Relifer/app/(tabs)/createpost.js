import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from './config';
 const BASE_URL = Config.BASE_URL;
export default function CreatePost() {
  const [text, setText] = useState('');

  const handlePost = async () => {
    const token = await AsyncStorage.getItem('token'); // ✅ Get stored token

    try {
      const res = await fetch(`${BASE_URL}/api/post/createpost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // ✅ Use token automatically
        },
        body: JSON.stringify({ content: text }),
      });

      const data = await res.json();
      if (res.ok) {
        Alert.alert(' Post created!');
        setText('');
      } else {
        Alert.alert( data.error || 'Something went wrong.');
      }
    } catch (err) {
      console.log("POST ERROR:", err);
      Alert.alert('❌ Network error');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>What's on your mind?</Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        value={text}
        onChangeText={setText}
        placeholder="Write your thoughts..."
        placeholderTextColor="#aaa"
      />
      <Button title="Post" onPress={handlePost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'black' },
  label: { color: 'white', fontSize: 18, marginBottom: 10 },
  input: {
    borderColor: '#888', borderWidth: 1, borderRadius: 10, padding: 10,
    marginBottom: 20, color: 'white', backgroundColor: '#222'
  },
});