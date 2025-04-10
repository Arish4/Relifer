import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import Config from './config';
 const BASE_URL = Config.BASE_URL;
export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const fetchPosts = () => {
    fetch(`${BASE_URL}/api/post/getpost`) 
      .then(res => res.json())
      .then(data => setPosts(data.reverse()))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchPosts(); 
  
    const interval = setInterval(() => {
      fetchPosts(); 
    }, 1000);
  
    return () => clearInterval(interval); 
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.toptext}>Posts</Text>
      <View style={styles.subtleLine} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {posts.map((post,index) => (
          <View key = {index} style={styles.card}>
            <Text style={styles.username}>@anonymous</Text>
            <Text style={styles.content}>{post.content}</Text>
            <Text style={styles.timestamp}>{new Date(post.createdAt).toLocaleString()}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  toptext: {
    textAlign: 'right',
    paddingRight: 20,
    color: "white",
    fontWeight: '800',
    fontSize: 30,
    marginTop: 20,
    fontStyle: 'italic',
  },
  subtleLine: {
    height: 1,
    backgroundColor: '#444',
    marginTop: 10,
    opacity: 0.5,
  },
  scrollContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  username: {
    color: '#aaa',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  timestamp: {
    color: '#555',
    fontSize: 12,
    textAlign: 'right',
  },
});