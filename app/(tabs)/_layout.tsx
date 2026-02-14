
import { Tabs } from 'expo-router';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TabLayout() {
  const tabs = [
    { name: "home", label: "Home", icon: "storefront" }, 
    { name: "bookingPage", label: "Booking", icon: "event-note" }, 
    { name: "profile", label: "Profile", icon: "person" },
    { name: "history", label: "History", icon: "history" }, 
  ] as const;

  return (
    <Tabs 
      screenOptions={{ 
        headerShown: false, 
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 5,
        }
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.label,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name={tab.icon as any} color={color} size={28} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}