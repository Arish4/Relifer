import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Config from './config';
 const BASE_URL = Config.BASE_URL;
export default function UpdatePost() {
  const [posts, setPosts] = useState([]);
  const [editText, setEditText] = useState('');
  const [selectedId, setSelectedId] = useState(null);

 
  const getPosts = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/api/post/getpost`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      const userId = JSON.parse(atob(token.split('.')[1])).id;
      const userPosts = data.filter(p => p.user === userId).reverse();
      setPosts(userPosts);
    } catch (err) {
      console.log('❌ Error fetching posts:', err);
    }
  };

  
  useFocusEffect(
    useCallback(() => {
      getPosts();
    }, [])
  );

  const handleEdit = (id, currentContent) => {
    setSelectedId(id);
    setEditText(currentContent);
  };

  const handleSave = async () => {
    const newContent = editText.trim();
  
    if (!newContent) return;
  
   
    const isDuplicate = posts.some(
      post => post.content.trim() === newContent && post._id !== selectedId
    );
  
    if (isDuplicate) {
      Alert.alert(' Duplicate Content', 'This content already exists in another post.');
      return;
    }
  
    const updatedPosts = posts.map(post =>
      post._id === selectedId ? { ...post, content: newContent } : post
    );
    setPosts(updatedPosts); 
    setSelectedId(null);
    setEditText('');
  
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/api/post/${selectedId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newContent }),
      });
  
      const data = await res.json();
      if (data.post) {
        getPosts(); 
      } else {
        Alert.alert('❌ Update Failed!');
      }
    } catch (err) {
      console.log('❌ Error updating post:', err);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Update Your Posts</Text>

      {posts.map(post => (
        <View key={post._id} style={styles.card}>
          {selectedId === post._id ? (
            <>
              <TextInput
                style={styles.input}
                value={editText}
                onChangeText={setEditText}
                placeholder="Edit your post"
                placeholderTextColor="#aaa"
                multiline
              />
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.text}>{post.content}</Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEdit(post._id, post.content)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  title: { fontSize: 24, color: '#fff', textAlign: 'center', marginBottom: 20 },
  card: { backgroundColor: '#1a1a1a', padding: 15, borderRadius: 10, marginBottom: 15 },
  text: { color: '#fff', fontSize: 16 },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  editButton: { backgroundColor: '#555', marginTop: 10, padding: 10, borderRadius: 6 },
  saveButton: { backgroundColor: '#28a745', marginTop: 10, padding: 10, borderRadius: 6 },
  buttonText: { color: '#fff', textAlign: 'center' },
});