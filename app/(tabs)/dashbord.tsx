// import React from 'react';
// import { View, Text, FlatList, TouchableOpacity } from 'react-native';
// import { Trash2, ChevronRight } from 'lucide-react-native';

// const MOCK_DATA = [
//   { id: '1', service: 'Full Service', car: 'Toyota Vitz', date: '2023-11-20', status: 'Completed' },
//   { id: '2', service: 'Oil Change', car: 'Toyota Vitz', date: '2024-01-05', status: 'Pending' },
// ];

// const DashboardScreen = ({ navigation }: any) => {
//   return (
//     <View className="flex-1 bg-slate-50 p-6">
//       <Text className="text-2xl font-bold text-slate-900 mb-6">Service History</Text>

//       <FlatList 
//         data={MOCK_DATA}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity 
//             onPress={() => navigation.navigate('BookingView', { id: item.id })}
//             className="bg-white p-5 rounded-3xl mb-4 shadow-sm flex-row items-center justify-between border border-gray-100"
//           >
//             <View>
//               <Text className="text-lg font-bold text-slate-800">{item.service}</Text>
//               <Text className="text-gray-500">{item.car} • {item.date}</Text>
//               <Text className={`mt-1 font-bold ${item.status === 'Completed' ? 'text-emerald-500' : 'text-orange-500'}`}>
//                 {item.status}
//               </Text>
//             </View>
//             <View className="flex-row gap-x-2">
//                 <TouchableOpacity className="bg-red-50 p-2 rounded-xl">
//                     <Trash2 size={20} color="#ef4444" />
//                 </TouchableOpacity>
//                 <ChevronRight size={20} color="#cbd5e1" />
//             </View>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };

// export default DashboardScreen;