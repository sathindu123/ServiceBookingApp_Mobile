import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { registation } from '@/src/service/AuthService';

const RegisterScreen = () => {
  const router = useRouter();
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    
    const cleanEmail = email.trim();
    const cleanFullName = fullName.trim();

    
    if (!cleanFullName || !cleanEmail || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password should be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      
      
       await registation(cleanFullName, cleanEmail, password);
      
      Alert.alert("Success", "Account created successfully!");
      router.replace("/login"); 
    } catch (error: any) {
      
      let errorMessage = "Registration Failed";
      if (error.code === 'auth/invalid-email') errorMessage = "The email address is badly formatted.";
      if (error.code === 'auth/email-already-in-use') errorMessage = "This email is already registered.";
      
      Alert.alert("Error", errorMessage);
      console.log("Firebase Error:", error.code, error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }} 
          className="bg-white"
        >
          
          <View className="mb-8">
            <Text className="text-4xl font-extrabold text-slate-900 mb-2">Create Account 🛠️</Text>
            <Text className="text-gray-500 text-lg">Join us to manage your vehicle services efficiently.</Text>
          </View>

          <View>
           
            <View className="mb-4">
              <Text className="text-slate-700 font-semibold mb-2 ml-1">Full Name</Text>
              <TextInput 
                placeholder="Ex: Sahan Perera" 
                value={fullName}
                onChangeText={setFullName}
                className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-slate-800"
              />
            </View>

            
            <View className="mb-4">
              <Text className="text-slate-700 font-semibold mb-2 ml-1">Email Address</Text>
              <TextInput 
                placeholder="Ex: sahan@example.com" 
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-slate-800"
              />
            </View>

            
            <View className="mb-4">
              <Text className="text-slate-700 font-semibold mb-2 ml-1">Password</Text>
              <TextInput 
                placeholder="••••••••" 
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-slate-800"
              />
            </View>

            
            <View className="mb-6">
              <Text className="text-slate-700 font-semibold mb-2 ml-1">Confirm Password</Text>
              <TextInput 
                placeholder="••••••••" 
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-slate-800"
              />
            </View>

            
            <TouchableOpacity 
              onPress={handleRegister}
              disabled={loading}
              className={`p-5 rounded-2xl shadow-lg shadow-blue-400 ${loading ? 'bg-blue-400' : 'bg-blue-600'}`}
            >
              <Text className="text-white text-center font-bold text-lg">
                {loading ? "Processing..." : "Register Now"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => router.replace("/login")}
              className="mt-6"
            >
              <Text className="text-center text-gray-500 text-base">
                Already have an account? <Text className="text-blue-600 font-bold">Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;