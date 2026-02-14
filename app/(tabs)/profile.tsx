
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { User, Mail, Phone, LogOut, Edit3, Check, Camera, ChevronRight } from 'lucide-react-native';
import { updateUserProfile, logoutUser } from '@/src/service/AuthService';
import { useAuth } from '@/src/context/AuthContext'; 

const ProfileScreen = () => {
  const router = useRouter();
  const { user, userProfile, loading: authLoading, refreshProfile } = useAuth(); 
  
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  
  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name || "");
      setPhone(userProfile.phone || "");
    }
  }, [userProfile]);

  const handleSave = async () => {
    if (user && name.trim()) {
      try {
        setLoading(true);
        await updateUserProfile(user.uid, name, phone);
        
        await refreshProfile(); 
        
        setIsEditing(false);
        Alert.alert("Success", "Your profile has been updated!");
      } catch (error) {
        Alert.alert("Error", "Update failed.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogout = () => {
    Alert.alert("Sign Out", "Are you sure you want to log out?", [
      { text: "Cancel" },
      { text: "Log Out", style: "destructive", onPress: async () => {
          await logoutUser();
          router.replace("/login");
      }}
    ]);
  };

  if (authLoading) return <ActivityIndicator className="flex-1" />;

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <View className="bg-blue-600 pt-16 pb-24 items-center rounded-b-[50px] shadow-xl">
          <View className="w-32 h-32 bg-white rounded-full items-center justify-center border-4 border-blue-400">
            <User size={60} color="#2563eb" />
          </View>
          <Text className="text-white text-2xl font-bold mt-4">{userProfile?.name}</Text>
        </View>

        <View className="px-6 -mt-12">
          <View className="bg-white p-6 rounded-[35px] shadow-sm border border-slate-100">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-lg font-bold text-slate-800">Profile Details</Text>
              <TouchableOpacity 
                onPress={() => isEditing ? handleSave() : setIsEditing(true)}
                className={`${isEditing ? 'bg-emerald-500' : 'bg-blue-600'} px-4 py-2 rounded-xl flex-row items-center`}
              >
                {isEditing ? <Check size={18} color="white" /> : <Edit3 size={18} color="white" />}
                <Text className="text-white font-bold ml-2">{isEditing ? "Save" : "Edit"}</Text>
              </TouchableOpacity>
            </View>

            <View className="space-y-4">
              <CustomInput label="Full Name" value={name} onChange={setName} isEditing={isEditing} icon={<User size={20} color="#64748b" />} />
              <CustomInput label="Email Address" value={userProfile?.email} isEditing={false} icon={<Mail size={20} color="#64748b" />} />
              <CustomInput label="Phone Number" value={phone} onChange={setPhone} isEditing={isEditing} icon={<Phone size={20} color="#64748b" />} keyboardType="phone-pad" />
            </View>
          </View>
          
          <TouchableOpacity onPress={handleLogout} className="bg-red-50 mt-6 p-5 rounded-[25px] flex-row items-center justify-center mb-10 border border-red-100">
            <LogOut size={20} color="#ef4444" />
            <Text className="ml-3 text-red-600 font-bold text-lg">Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const CustomInput = ({ label, value, onChange, isEditing, icon, keyboardType }: any) => (
  <View className="mb-4">
    <Text className="text-slate-400 text-[10px] font-bold uppercase mb-2 ml-1">{label}</Text>
    <View className={`flex-row items-center p-4 rounded-2xl border ${isEditing && onChange ? 'bg-white border-blue-200' : 'bg-slate-50 border-slate-50'}`}>
      {icon}
      {isEditing && onChange ? (
        <TextInput className="ml-4 flex-1 text-slate-800 font-bold text-base p-0" value={value} onChangeText={onChange} keyboardType={keyboardType} />
      ) : (
        <Text className="ml-4 text-slate-700 font-bold text-base">{value || "Not Set"}</Text>
      )}
    </View>
  </View>
);

export default ProfileScreen;