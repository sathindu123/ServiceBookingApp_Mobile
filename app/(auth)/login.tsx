import { login1 } from '@/src/service/AuthService';
import { useRouter } from 'expo-router'; 
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';

const LoginScreen = () => {
    const router = useRouter(); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please fill all the fields");
            return;
        }
        try {
            await login1(email, password);
            Alert.alert("Success", "Login successful");
            router.replace("/(tabs)/home"); 
        } catch (error: any) {
            console.log(error);
            Alert.alert("Login failed", error.message || "Please check your credentials.");
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white p-6 justify-center">
            <Text className="text-4xl font-extrabold text-slate-900 mb-2">Welcome! 🚗</Text>
            <Text className="text-gray-500 mb-8 text-lg">Sign in to book your next service.</Text>

            <View className="space-y-4">
                <TextInput 
                    placeholder="Email Address" 
                    value={email} 
                    onChangeText={setEmail} 
                    autoCapitalize="none"
                    className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-slate-800 mb-3"
                />
                <TextInput 
                    placeholder="Password" 
                    value={password} 
                    onChangeText={setPassword} 
                    secureTextEntry
                    className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-slate-800 mb-5"
                />

                <TouchableOpacity 
                    onPress={handleLogin}
                    className="bg-blue-600 p-4 rounded-2xl shadow-lg shadow-blue-400 mt-4"
                >
                    <Text className="text-white text-center font-bold text-lg">Sign In</Text>
                </TouchableOpacity>
        
                <TouchableOpacity onPress={() => router.push('/register')}>
                    <Text className="text-center text-gray-500 mt-4">
                        Don't have an account? <Text className="text-blue-600 font-bold">Register</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;