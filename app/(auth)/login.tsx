import React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';

const LoginScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView className="flex-1 bg-white p-6 justify-center">
      <Text className="text-4xl font-extrabold text-slate-900 mb-2">Welcome! 🚗</Text>
      <Text className="text-gray-500 mb-8 text-lg">Sign in to book your next service.</Text>

      <View className="space-y-4">
        <TextInput 
          placeholder="Email Address" 
          className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-slate-800"
        />
        <TextInput 
          placeholder="Password" 
          secureTextEntry
          className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-slate-800"
        />
        
        <TouchableOpacity 
          onPress={() => navigation.navigate('Home')}
          className="bg-blue-600 p-4 rounded-2xl shadow-lg shadow-blue-400 mt-4"
        >
          <Text className="text-white text-center font-bold text-lg">Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text className="text-center text-gray-500 mt-4">
            Don't have an account? <Text className="text-blue-600 font-bold">Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;