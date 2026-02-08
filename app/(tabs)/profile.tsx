import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { User, Mail, Phone, LogOut } from 'lucide-react-native';

const ProfileScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="items-center mt-10">
        <View className="w-24 h-24 bg-blue-100 rounded-full items-center justify-center">
          <User size={50} color="#2563eb" />
        </View>
        <Text className="text-2xl font-bold mt-4">Sahan Perera</Text>
        <Text className="text-gray-500 font-medium">Gold Member</Text>
      </View>

      <View className="mt-10 px-6 space-y-4">
        <View className="flex-row items-center bg-gray-50 p-4 rounded-2xl">
          <Mail size={20} color="#64748b" />
          <Text className="ml-4 text-slate-700">sahan@gmail.com</Text>
        </View>
        <View className="flex-row items-center bg-gray-50 p-4 rounded-2xl">
          <Phone size={20} color="#64748b" />
          <Text className="ml-4 text-slate-700">+94 77 123 4567</Text>
        </View>

        <TouchableOpacity className="flex-row items-center bg-red-50 p-4 rounded-2xl mt-10">
          <LogOut size={20} color="#ef4444" />
          <Text className="ml-4 text-red-600 font-bold">Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;