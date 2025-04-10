import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Config from './config';
 const BASE_URL = Config.BASE_URL;
export default function DeletePost() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/api/post/getpost`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      const userId = JSON.parse(atob(token.split('.')[1])).id;
      const userPosts = data.filter(p => p.user === userId).reverse(); // latest first
      setPosts(userPosts);
    } catch (err) {
      console.error(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );
  const deletePost = async (postId) => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(`${BASE_URL}/api/post/${postId}`, {
        method: 'DELETE',
        headers: {
          
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.message) {
        setPosts(prevPosts => prevPosts.filter(post => post._id !== postId)); // Instant UI update
        Alert.alert('✅ Post deleted!');
        setTimeout(fetchPosts, 500); // Background refresh after 0.5 sec
      } else {
        Alert.alert('❌ Delete failed!');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Delete Your Posts</Text>
      {posts.map(post => (
        <View key={post._id} style={styles.card}>
          <Text style={styles.text}>{post.content}</Text>
          <TouchableOpacity style={styles.deleteButton} onPress={() => deletePost(post._id)}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  title: { fontSize: 24, color: '#fff', marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
  card: { backgroundColor: '#1a1a1a', padding: 15, borderRadius: 10, marginBottom: 15 },
  text: { color: '#fff', fontSize: 16 },
  deleteButton: { backgroundColor: '#ff4444', marginTop: 10, padding: 10, borderRadius: 6 },
  buttonText: { color: '#fff', textAlign: 'center' }
});