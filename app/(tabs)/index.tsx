import { useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const COLORS = {
  primary: '#00B14F',
  bg: '#F5F7FA',
  white: '#fff'
};

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.bg }}>

      {/* HEADER */}
      <View style={{
        backgroundColor: COLORS.primary,
        paddingTop: 60,
        paddingBottom: 30,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25
      }}>
        <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold' }}>
          🚗 CARDIY
        </Text>
        <Text style={{ color: '#DFF5E7', marginTop: 5 }}>
          Garage Dashboard
        </Text>
      </View>

      {/* DASHBOARD (KPI + ACTION GỘP) */}
      <View style={{ padding: 20 }}>

        <Text style={styles.sectionTitle}>📊 Dashboard</Text>

        {/* KPI */}
        <View style={styles.kpiWrap}>
          <View style={styles.kpiCard}>
            <Text>💰 Doanh thu</Text>
            <Text style={styles.kpiValue}>0đ</Text>
          </View>

          <View style={styles.kpiCard}>
            <Text>🚗 Đang sửa</Text>
            <Text style={[styles.kpiValue, { color: '#FF9800' }]}>0</Text>
          </View>

          <View style={styles.kpiCard}>
            <Text>⏳ Xe chờ</Text>
            <Text style={[styles.kpiValue, { color: '#2196F3' }]}>0</Text>
          </View>

          <View style={styles.kpiCard}>
            <Text>✅ Hoàn thành</Text>
            <Text style={[styles.kpiValue, { color: '#4CAF50' }]}>0</Text>
          </View>
        </View>

        {/* GRID ACTION */}
        <View style={styles.gridWrap}>

          <TouchableOpacity style={styles.gridCard} onPress={() => router.push('/car-list')}>
            <Text style={styles.icon}>🚗</Text>
            <Text>Quản lý xe</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridCard} onPress={() => router.push('/receive-car')}>
            <Text style={styles.icon}>📅</Text>
            <Text>Đặt lịch</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridCard} onPress={() => router.push('/history')}>
            <Text style={styles.icon}>🔔</Text>
            <Text>Nhắc lịch</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridCard} onPress={() => router.push('/inspection')}>
            <Text style={styles.icon}>📋</Text>
            <Text>Kiểm tra xe</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridCard} onPress={() => router.push('/work-order')}>
            <Text style={styles.icon}>🧾</Text>
            <Text>Sửa chữa</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridCard} onPress={() => router.push('/payment')}>
            <Text style={styles.icon}>💰</Text>
            <Text>Thanh toán</Text>
          </TouchableOpacity>

        </View>

      </View>

      {/* CTA */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/receive-car')}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
          🚀 NHẬN XE
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = {
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },

  kpiWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20
  },

  kpiCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 16,
    marginBottom: 12,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },

  kpiValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5
  },

  gridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },

  gridCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },

  icon: {
    fontSize: 24,
    marginBottom: 5
  },

  button: {
    backgroundColor: '#FFC107',
    margin: 20,
    padding: 18,
    borderRadius: 14,
    alignItems: 'center'
  }
};