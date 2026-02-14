import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, SafeAreaView, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar, Car, Trash2, ChevronRight, AlertCircle } from 'lucide-react-native';
import { getMyBookings, deleteBooking } from '@/src/service/BookingService';

const ViewBookingPage = () => {
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

 
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await getMyBookings();
      setBookings(data);
    } catch (error: any) {
      Alert.alert("Error", "Could not load bookings.");
      console.log(error)
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };


  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = (id: string) => {
    Alert.alert(
      "Cancel Booking",
      "Are you sure you want to cancel this service appointment?",
      [
        { text: "No", style: "cancel" },
        { 
          text: "Yes, Cancel", 
          style: "destructive",
          onPress: async () => {
            try {
              await deleteBooking(id);
   
              setBookings(prev => prev.filter(b => b.id !== id));
              Alert.alert("Success", "Booking cancelled successfully.");
            } catch (error) {
              Alert.alert("Error", "Failed to cancel booking.");
            }
          }
        }
      ]
    );
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Pending': return { bg: 'bg-orange-100', text: 'text-orange-600' };
      case 'Confirmed': return { bg: 'bg-blue-100', text: 'text-blue-600' };
      case 'Completed': return { bg: 'bg-emerald-100', text: 'text-emerald-600' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-600' };
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="p-6 flex-1">
        <Text className="text-3xl font-bold text-slate-900 mb-2 mt-4">My Bookings</Text>
        <Text className="text-gray-500 mb-6">Track your vehicle service history</Text>

        {loading && !refreshing ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#2563eb" />
            <Text className="mt-4 text-gray-500">Loading your history...</Text>
          </View>
        ) : (
          <FlatList
            data={bookings}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
         
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={() => {
                setRefreshing(true);
                fetchBookings();
              }} />
            }
            ListEmptyComponent={() => (
              <View className="items-center justify-center mt-20">
                <AlertCircle size={60} color="#cbd5e1" />
                <Text className="text-gray-400 text-lg mt-4 font-medium">No bookings found</Text>
                <TouchableOpacity 
                  onPress={() => router.push('/booking/new-service')}
                  className="mt-4 bg-blue-600 px-8 py-4 rounded-2xl"
                >
                  <Text className="text-white font-bold">Book a Service Now</Text>
                </TouchableOpacity>
              </View>
            )}
            renderItem={({ item }) => {
              const statusStyle = getStatusStyle(item.status || 'Pending');
              return (
                <View className="bg-white p-5 rounded-[30px] mb-4 shadow-sm border border-gray-100">
                  <View className="flex-row justify-between items-start mb-4">
                    <View>
                      <Text className="text-xl font-bold text-slate-800">{item.serviceType}</Text>
                      <View className="flex-row items-center mt-1">
                        <Car size={14} color="#64748b" />
                        <Text className="text-gray-500 ml-1 font-medium">{item.vehicleNo}</Text>
                      </View>
                    </View>
                    <View className={`${statusStyle.bg} px-3 py-1 rounded-full`}>
                      <Text className={`${statusStyle.text} text-xs font-bold uppercase`}>
                        {item.status || 'Pending'}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row items-center justify-between border-t border-gray-50 pt-4">
                    <View className="flex-row items-center">
                      <Calendar size={16} color="#2563eb" />
                      <Text className="text-slate-700 ml-2 font-semibold">{item.date}</Text>
                    </View>
                    
                    <View className="flex-row space-x-2">
                      <TouchableOpacity 
                        onPress={() => handleCancelBooking(item.id)}
                        className="bg-red-50 p-3 rounded-2xl"
                      >
                        <Trash2 size={18} color="#ef4444" />
                      </TouchableOpacity>

                      <TouchableOpacity 
                        className="bg-slate-50 p-3 rounded-2xl"
                        onPress={() => {/* Navigate to details */}}
                      >
                        <ChevronRight size={18} color="#64748b" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ViewBookingPage;