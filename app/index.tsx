import { Redirect } from 'expo-router';

export default function Index() {
  // මේකෙන් වෙන්නේ page එක load වෙද්දීම auto Login එකට යන එක
  return <Redirect href="/login" />;
}