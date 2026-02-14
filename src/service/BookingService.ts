// import { db, auth } from '../config/firebaseConfig';
// import { collection, addDoc, serverTimestamp , query, where, getDocs, deleteDoc, doc, orderBy} from 'firebase/firestore';

// export const saveBooking = async (vehicleNo: string, serviceType: string, date: string) => {
//   try {
//     const user = auth.currentUser; 
//     if (!user) throw new Error("User not logged in");

//     const bookingData = {
//       userId: user.uid,
//       userEmail: user.email,
//       vehicleNo: vehicleNo.trim(),
//       serviceType: serviceType,
//       date: date,
//       status: "Pending", 
//       createdAt: serverTimestamp(), 
//     };

//     const docRef = await addDoc(collection(db, "bookings"), bookingData);
//     return docRef.id;
//   } catch (error) {
//     throw error;
//   }
// };


// export const getMyBookings = async () => {
//   try {
//     const user = auth.currentUser;
//     if (!user) throw new Error("User not logged in");

    
//     const q = query(
//       collection(db, "bookings"), 
//       where("userId", "==", user.uid)
//     );

//     const querySnapshot = await getDocs(q);
    
   
//     const results = querySnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     })) as any[];

    
//     return results.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
    
//   } catch (error) {
//     console.error("Error fetching bookings: ", error);
//     throw error;
//   }
// };

// export const deleteBooking = async (bookingId: string) => {
//   try {
//     const bookingDoc = doc(db, "bookings", bookingId);
//     await deleteDoc(bookingDoc);
//     return true;
//   } catch (error) {
//     console.error("Error deleting booking: ", error);
//     throw error;
//   }
// };




import { db, auth } from '../config/firebaseConfig';
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  where, 
  getDocs, 
  deleteDoc, 
  doc, 
  updateDoc 
} from 'firebase/firestore';

// 1. CREATE - අලුත් Booking එකක් දත්ත ගබඩා කිරීම
// (vehicleType එක අලුතින් ඇතුළත් කර ඇත)
export const saveBooking = async (
  vehicleNo: string, 
  serviceType: string, 
  date: string, 
  vehicleType: string 
) => {
  try {
    const user = auth.currentUser; 
    if (!user) throw new Error("User not logged in");

    const bookingData = {
      userId: user.uid,
      userEmail: user.email,
      vehicleNo: vehicleNo.trim(),
      serviceType: serviceType,
      vehicleType: vehicleType, // වාහන වර්ගය (Car, Bike, etc.)
      date: date,
      status: "Pending", 
      createdAt: serverTimestamp(), 
    };

    const docRef = await addDoc(collection(db, "bookings"), bookingData);
    return docRef.id;
  } catch (error) {
    console.error("Error saving booking: ", error);
    throw error;
  }
};

// 2. READ - දැනට ලොග් වී සිටින User ගේ Bookings පමණක් ලබා ගැනීම
export const getMyBookings = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in");

    const q = query(
      collection(db, "bookings"), 
      where("userId", "==", user.uid)
    );

    const querySnapshot = await getDocs(q);
    
    const results = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as any[];

    // අලුත්ම දත්ත මුලට එන ලෙස Sort කිරීම
    return results.sort((a, b) => {
      const timeA = a.createdAt?.seconds || 0;
      const timeB = b.createdAt?.seconds || 0;
      return timeB - timeA;
    });
    
  } catch (error) {
    console.error("Error fetching bookings: ", error);
    throw error;
  }
};

// 3. UPDATE - Booking එකක තොරතුරු වෙනස් කිරීම (උදා: Change Date)
export const updateBooking = async (bookingId: string, newDate: string) => {
  try {
    const bookingRef = doc(db, "bookings", bookingId);
    
    // මෙතනදී අපි වෙනස් කරන්නේ date එක විතරයි. 
    // ඕනේ නම් තව fields (serviceType වගේ) මෙතනට එකතු කරන්න පුළුවන්.
    await updateDoc(bookingRef, {
      date: newDate,
      updatedAt: serverTimestamp() // වෙනස් කළ වෙලාවත් දාමු
    });
    
    return true;
  } catch (error) {
    console.error("Error updating booking: ", error);
    throw error;
  }
};

// 4. DELETE - Booking එකක් මැකීම
export const deleteBooking = async (bookingId: string) => {
  try {
    const bookingDoc = doc(db, "bookings", bookingId);
    await deleteDoc(bookingDoc);
    return true;
  } catch (error) {
    console.error("Error deleting booking: ", error);
    throw error;
  }
};