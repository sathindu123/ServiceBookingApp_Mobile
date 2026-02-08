import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const BookingPage = ({ navigation }: any) => {
  const [serviceType, setServiceType] = useState('Full Service');

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold text-slate-900 mb-6">Schedule Service</Text>

      <Text className="text-slate-600 font-semibold mb-3">Vehicle Details</Text>
      <TextInput 
        placeholder="Registration No (e.g., CAS-1234)" 
        className="bg-gray-100 p-4 rounded-2xl mb-4"
      />

      <Text className="text-slate-600 font-semibold mb-3">Service Category</Text>
      <View className="flex-row flex-wrap gap-2">
        {['Full Service', 'Oil Change', 'Brake Check', 'Engine Scan'].map((item) => (
          <TouchableOpacity 
            key={item}
            onPress={() => setServiceType(item)}
            className={`px-4 py-3 rounded-xl border ${serviceType === item ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-200'}`}
          >
            <Text className={serviceType === item ? 'text-white font-bold' : 'text-gray-600'}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text className="text-slate-600 font-semibold mt-6 mb-3">Date & Time</Text>
      <TextInput 
        placeholder="YYYY-MM-DD" 
        className="bg-gray-100 p-4 rounded-2xl mb-4"
      />

      <TouchableOpacity 
        className="bg-blue-600 p-5 rounded-2xl mt-10"
        onPress={() => navigation.goBack()}
      >
        <Text className="text-white text-center font-bold text-lg">Confirm Booking</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default BookingPage;