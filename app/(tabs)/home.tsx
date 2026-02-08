import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Calendar, Car, Clock, Settings } from 'lucide-react-native';

const HomeScreen = ({ navigation }: any) => {
  return (
    <ScrollView className="flex-1 bg-slate-50">
      <View className="bg-blue-600 p-8 pt-16 rounded-b-[40px] shadow-xl">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-blue-100 text-lg font-medium">Good Morning,</Text>
            <Text className="text-white text-3xl font-bold">Sahan Perera</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} className="w-14 h-14 bg-white/20 rounded-full items-center justify-center border border-white/30">
             <Text className="text-white font-bold">SP</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="p-6">
        {/* Quick Booking Card */}
        <TouchableOpacity 
          onPress={() => navigation.navigate('Booking')}
          className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex-row items-center justify-between"
        >
          <View>
            <Text className="text-slate-800 text-xl font-bold">Book a Service</Text>
            <Text className="text-gray-500">Keep your vehicle healthy</Text>
          </View>
          <View className="bg-blue-100 p-3 rounded-2xl">
            <Car size={28} color="#2563eb" />
          </View>
        </TouchableOpacity>

        {/* Stats */}
        <View className="flex-row justify-between mt-6">
          <View className="bg-emerald-50 p-4 rounded-3xl w-[48%] items-center border border-emerald-100">
            <Clock color="#10b981" size={24} />
            <Text className="text-emerald-800 font-bold mt-2">Active</Text>
            <Text className="text-emerald-600 text-sm">1 Booking</Text>
          </View>
          <View className="bg-orange-50 p-4 rounded-3xl w-[48%] items-center border border-orange-100">
            <Calendar color="#f97316" size={24} />
            <Text className="text-orange-800 font-bold mt-2">History</Text>
            <Text className="text-orange-600 text-sm">12 Completed</Text>
          </View>
        </View>

        <Text className="text-xl font-bold text-slate-800 mt-8 mb-4">Upcoming Appointments</Text>
        {/* Short list of upcoming bookings */}
        <View className="bg-white p-4 rounded-2xl border border-gray-100">
           <Text className="text-gray-400 italic">No bookings for today.</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;