import { Stack } from 'expo-router';

export default function BookingLayout() {
  return (
    <Stack>
      <Stack.Screen name="new-service" options={{ title: 'Schedule Service', presentation: 'modal' }} />
    </Stack>
  );
}