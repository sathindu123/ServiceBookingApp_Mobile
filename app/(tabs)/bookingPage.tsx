
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, SafeAreaView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { saveBooking } from '@/src/service/BookingService'; 
import { useAuth } from '@/src/context/AuthContext'; 
import { Car, Bike, Truck, Anchor, Settings, Droplets, Zap, ChevronLeft, Calendar as CalendarIcon, ClipboardCheck } from 'lucide-react-native';

const VEHICLE_TYPES = [
  { id: 'Car', icon: Car, label: 'Car' },
  { id: 'Bike', icon: Bike, label: 'Bike' },
  { id: 'Van', icon: Anchor, label: 'Van' }, 
  { id: 'Truck', icon: Truck, label: 'Truck' },
];

const SERVICE_CATEGORIES = [
  { id: 'Full Service', label: 'Full Service', icon: Settings, color: 'bg-blue-500' },
  { id: 'Oil Change', label: 'Oil Change', icon: Droplets, color: 'bg-orange-500' },
  { id: 'Brake Check', label: 'Brake Check', icon: Zap, color: 'bg-red-500' },
  { id: 'Engine Scan', label: 'Engine Scan', icon: ClipboardCheck, color: 'bg-emerald-500' },
];

const BookingPage = () => {
  const router = useRouter();
  const { user } = useAuth(); 

  const [selectedVehicle, setSelectedVehicle] = useState('Car');
  const [serviceType, setServiceType] = useState('Full Service');
  const [vehicalNB, setvehicalNB] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    
    if (!vehicalNB || !date) {
      Alert.alert("Missing Info", "Please enter your vehicle number and preferred date.");
      return;
    }

    if (!user) {
      Alert.alert("Error", "You must be logged in to make a booking.");
      return;
    }

    try {
      setLoading(true);
      
      
      await saveBooking(vehicalNB, serviceType, date, selectedVehicle);
      
      Alert.alert("Success 🎉", "Booking placed successfully!", [
        { text: "View History", onPress: () => router.replace("/(tabs)/history") }
      ]);
    } catch (error: any) {
      Alert.alert("Booking Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView 
            showsVerticalScrollIndicator={false} 
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }} 
            className="p-6"
          >
            
            {/* Header */}
            <View className="flex-row items-center mb-8 mt-2">
              <TouchableOpacity onPress={() => router.back()} className="bg-white p-2 rounded-full shadow-sm">
                <ChevronLeft size={24} color="#1e293b" />
              </TouchableOpacity>
              <Text className="text-2xl font-bold text-slate-900 ml-4">Book a Service</Text>
            </View>

            {/* 1. Select Vehicle Type */}
            <Text className="text-slate-500 font-bold mb-4 uppercase text-[10px] tracking-widest">Select Vehicle Type</Text>
            <View className="flex-row justify-between mb-8">
              {VEHICLE_TYPES.map((item) => (
                <TouchableOpacity 
                  key={item.id}
                  onPress={() => setSelectedVehicle(item.id)}
                  className={`items-center justify-center w-[22%] p-4 rounded-3xl border-2 ${
                    selectedVehicle === item.id ? 'bg-blue-600 border-blue-600 shadow-lg shadow-blue-300' : 'bg-white border-transparent shadow-sm'
                  }`}
                >
                  <item.icon size={28} color={selectedVehicle === item.id ? 'white' : '#64748b'} />
                  <Text className={`text-[10px] font-bold mt-2 ${selectedVehicle === item.id ? 'text-white' : 'text-slate-500'}`}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* 2. Vehicle Number */}
            <View className="mb-8">
              <Text className="text-slate-500 font-bold mb-4 uppercase text-[10px] tracking-widest">Vehicle Number</Text>
              <View className="bg-white flex-row items-center px-4 py-1 rounded-2xl shadow-sm border border-slate-100">
                <Car size={20} color="#94a3b8" />
                <TextInput 
                  placeholder="WP CAS-1234" 
                  className="flex-1 p-4 text-slate-800 font-bold"
                  value={vehicalNB}
                  onChangeText={setvehicalNB}
                  autoCapitalize="characters"
                />
              </View>
            </View>

            {/* 3. Service Categories */}
            <Text className="text-slate-500 font-bold mb-4 uppercase text-[10px] tracking-widest">Select Service</Text>
            <View className="flex-row flex-wrap justify-between mb-6">
              {SERVICE_CATEGORIES.map((item) => (
                <TouchableOpacity 
                  key={item.id}
                  onPress={() => setServiceType(item.id)}
                  className={`w-[48%] p-5 rounded-[30px] mb-4 border-2 ${
                    serviceType === item.id ? 'bg-white border-blue-600 shadow-blue-100' : 'bg-white border-transparent'
                  } shadow-sm`}
                >
                  <View className={`${item.color} w-10 h-10 rounded-xl items-center justify-center mb-3 shadow-sm`}>
                    <item.icon size={20} color="white" />
                  </View>
                  <Text className={`font-bold ${serviceType === item.id ? 'text-blue-600' : 'text-slate-700'}`}>
                    {item.label}
                  </Text>
                  <Text className="text-slate-400 text-[10px] mt-1">Professional Care</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* 4. Date Selection */}
            <View className="mb-10">
              <Text className="text-slate-500 font-bold mb-4 uppercase text-[10px] tracking-widest">Preferred Date</Text>
              <View className="bg-white flex-row items-center px-4 py-1 rounded-2xl shadow-sm border border-slate-100">
                <CalendarIcon size={20} color="#94a3b8" />
                <TextInput 
                  placeholder="YYYY-MM-DD" 
                  className="flex-1 p-4 text-slate-800 font-bold"
                  value={date}
                  onChangeText={setDate}
                />
              </View>
            </View>

            {/* Confirm Button */}
            <TouchableOpacity 
              disabled={loading}
              onPress={handleBooking}
              className={`p-5 rounded-[25px] flex-row items-center justify-center mb-12 shadow-xl ${loading ? 'bg-slate-400' : 'bg-slate-900'}`}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <>
                  <Text className="text-white text-center font-bold text-lg mr-2">Confirm Booking</Text>
                  {/* Chevron Right using rotation */}
                  <ChevronLeft size={20} color="white" style={{ transform: [{ rotate: '180deg' }] }} />
                </>
              )}
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BookingPage;






