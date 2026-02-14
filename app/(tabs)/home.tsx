
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar, Car, Clock, Bell, ChevronRight, LayoutDashboard } from 'lucide-react-native';
import { useAuth } from '@/src/context/AuthContext'; 

const HomeScreen = () => {
  const router = useRouter();
  const { userProfile, loading } = useAuth(); 

 
  const firstName = userProfile?.name?.split(" ")[0] || "User";
  const initial = firstName[0] || "U";

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        
        <View className="bg-blue-600 px-8 pt-12 pb-16 rounded-b-[50px] shadow-2xl shadow-blue-300">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-blue-100 text-base font-medium uppercase tracking-widest">Good Morning</Text>
              <Text className="text-white text-3xl font-extrabold mt-1">
                {loading ? "..." : `${firstName} 👋`}
              </Text>
            </View>
            <View className="flex-row items-center space-x-3">
              <TouchableOpacity className="bg-white/20 p-2 rounded-full border border-white/30">
                <Bell size={22} color="white" />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => router.push('/profile')} 
                className="w-14 h-14 bg-white rounded-full items-center justify-center border-2 border-blue-400 overflow-hidden shadow-sm"
              >
                <Text className="text-blue-600 font-bold text-lg">{initial}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="px-6 -mt-10">
          <TouchableOpacity 
            onPress={() => router.push('/bookingPage')}
            className="bg-white p-7 rounded-[35px] shadow-sm border border-slate-100 flex-row items-center justify-between"
          >
            <View className="flex-1">
              <View className="bg-blue-100 w-12 h-12 rounded-2xl items-center justify-center mb-3">
                <Car size={26} color="#2563eb" />
              </View>
              <Text className="text-slate-800 text-2xl font-black">Book a Service</Text>
              <Text className="text-slate-400 mt-1 font-medium italic">Keep your vehicle in top condition</Text>
            </View>
            <View className="bg-blue-600 p-3 rounded-full">
              <ChevronRight size={24} color="white" />
            </View>
          </TouchableOpacity>

          <View className="flex-row justify-between mt-6">
            <View className="bg-emerald-50 p-6 rounded-[30px] w-[48%] border border-emerald-100 shadow-sm">
              <View className="bg-emerald-500 w-10 h-10 rounded-xl items-center justify-center mb-3">
                <Clock color="white" size={20} />
              </View>
              <Text className="text-emerald-900 font-black text-xl">01</Text>
              <Text className="text-emerald-600 font-bold text-xs uppercase mt-1">Active Booking</Text>
            </View>

            <View className="bg-orange-50 p-6 rounded-[30px] w-[48%] border border-orange-100 shadow-sm">
              <View className="bg-orange-500 w-10 h-10 rounded-xl items-center justify-center mb-3">
                <Calendar color="white" size={20} />
              </View>
              <Text className="text-orange-900 font-black text-xl">12</Text>
              <Text className="text-orange-600 font-bold text-xs uppercase mt-1">Total History</Text>
            </View>
          </View>

          <Text className="text-xl font-black text-slate-800 mt-10 mb-5">Upcoming Appointment</Text>
          <View className="bg-white p-6 rounded-[35px] border border-slate-100 shadow-sm mb-10 items-center py-10">
             <LayoutDashboard size={40} color="#cbd5e1" />
             <Text className="text-slate-400 font-bold mt-4">No appointments scheduled today.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;