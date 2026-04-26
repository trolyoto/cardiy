import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { db } from '../../lib/firebase'; // chú ý path

export default function CarListScreen() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'Cardiy CRM'),
      (snapshot) => {
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(list);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        📋 Lịch sử khách hàng
      </Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              🚗 {item.licensePlate}
            </Text>

            <Text>👤 {item.name}</Text>
            <Text>📞 {item.phone}</Text>
            <Text>🔧 {item.carModel}</Text>
            <Text>🛣️ {item.km} km</Text>
          </View>
        )}
      />
    </View>
  );
}