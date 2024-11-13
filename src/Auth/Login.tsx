
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import { useLoginMutation } from '../services/appLevel';  
import { useDispatch } from 'react-redux';
import { setAuthToken } from '../redux/authSlice';

const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity);

const LoginScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('rohitrathore@564025@gmail.com');
  const [password, setPassword] = useState('Rohit@321');
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading }] = useLoginMutation();  
  const dispatch = useDispatch();  
  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    try {
      const response = await login({ email: username, password });
    if (response?.data?.token) { 
      const authToken = response.data.token;
      dispatch(setAuthToken(authToken));
      navigation.navigate('CheckStack');
     
      
    } 
    else {
      Alert.alert('Login Error', 'Invalid username or password');
    }
  } catch (error) {
    Alert.alert('Login Error', 'Something went wrong. Please try again.');
  }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../images/logo.png')} style={styles.logo} />
      </View>

      <Animatable.View animation="fadeInUp" duration={1000} style={styles.card}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#777"
          value={username}
          onChangeText={setUsername}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Password"
            placeholderTextColor="#777"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Icon name={showPassword ? 'eye' : 'eye-off'} size={24} color="#777" />
          </TouchableOpacity>
        </View>

      
        <AnimatedBtn
          animation="bounceIn"
          duration={1500}
          style={styles.button}
          onPress={handleLogin} 
        >
          <Text style={styles.buttonText}>{isLoading ? 'Logging in...' : 'Log In'}</Text>
        </AnimatedBtn>

       
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4caf50', 
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    borderRadius: 10, 
  },
  card: {
    backgroundColor: '#ffffff', 
    padding: 30,
    borderRadius: 20, 
    shadowColor: '#000',
    
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    width: '90%', 
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginBottom: 15,
  },
  inputPassword: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    paddingRight: 15,
  },
  button: {
    backgroundColor: '#3b82f6', 
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#3b82f6',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
