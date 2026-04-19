"use client";
import { useMemo, useState } from "react";

type Service = {
  name: string;
  icon: string;
  color: string;
  eta?: string;
};

const services: Service[] = [
  { name: "Bảo dưỡng nhanh", icon: "🔧", color: "#FFC107" },
  { name: "Bảo dưỡng hệ thống gầm", icon: "🚙", color: "#FF9800" },
  { name: "Thay dầu nhớt động cơ", icon: "🛢️", color: "#2196F3" },
  { name: "Cân chỉnh thước lái 3D", icon: "⚙️", color: "#9E9E9E" },
  { name: "Lọc gió điều hòa", icon: "❄️", color: "#26C6DA" },
  { name: "Thay lốp xe", icon: "🛞", color: "#607D8B" },
  { name: "Thay ắc quy", icon: "🔋", color: "#3949AB" },
  { name: "Kiểm tra an toàn xe", icon: "✅", color: "#43A047" },
  { name: "Dịch vụ lưu động 24/7", icon: "🚗", color: "#66BB6A", eta: "20–30 phút" },
  { name: "Dịch vụ khác", icon: "🚘", color: "#90A4AE" },
];

function getMaintenanceAdvice(km: number) {
  if (!km || Number.isNaN(km)) {
    return "Nhập KM xe để được trợ lý gợi ý cấp bảo dưỡng phù hợp.";
  }
  if (km < 5000) {
    return "Xe còn mới. Khuyến nghị kiểm tra cơ bản, dầu và các hạng mục an toàn.";
  }
  if (km < 10000) {
    return "Khuyến nghị: Bảo dưỡng nhanh, thay dầu nhớt động cơ, kiểm tra lọc gió.";
  }
  if (km < 30000) {
    return "Khuyến nghị: Bảo dưỡng định kỳ, thay dầu, kiểm tra lọc gió, cân chỉnh thước lái 3D nếu xe lệch lái.";
  }
  if (km < 60000) {
    return "Khuyến nghị: Bảo dưỡng tổng thể, ưu tiên hệ thống gầm, phanh, rotuyn, giảm xóc.";
  }
  return "Khuyến nghị: Bảo dưỡng lớn, kiểm tra tổng thể gầm, treo, lái, phanh và các hạng mục an toàn.";
}

export default function Page() {
  const [selected, setSelected] = useState<string[]>([]);
  const [km, setKm] = useState("");
  const [plate, setPlate] = useState("");
  const [phone, setPhone] = useState("");

  const kmNumber = Number(km);

  const aiNote = useMemo(() => {
    let text = "👨‍🔧 Trợ lý dịch vụ:\n";

    if (selected.length > 0) {
      text += `• Dịch vụ đã chọn: ${selected.join(", ")}\n`;
    } else {
      text += "• Hãy chọn dịch vụ cần làm\n";
    }

    text += `• ${getMaintenanceAdvice(kmNumber)}\n`;

    if (selected.includes("Dịch vụ lưu động 24/7")) {
      text += "• Đội kỹ thuật lưu động có thể đến trong khoảng 20–30 phút\n";
    }

    return text.trim();
  }, [selected, kmNumber]);

  const toggleService = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]
    );
    setTimeout(() => {
      document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  const goBooking = () => {
    const params = new URLSearchParams({
      plate,
      phone,
      km,
      service: selected.join(", "),
    });
    window.location.href = `https://www.cardiy.vn/?${params.toString()}`;
  };

  return (
    <div style={styles.page}>
      <div style={styles.wrap}>
        <h1 style={styles.title}>TRỢ LÝ DỊCH VỤ Ô TÔ 🚗</h1>
        <p style={styles.subtitle}>AI tư vấn nhanh • Chọn dịch vụ • Gợi ý bảo dưỡng • Điều phối lưu động</p>

        <div style={styles.grid}>
          {services.map((s) => {
            const active = selected.includes(s.name);
            return (
              <button
                key={s.name}
                onClick={() => toggleService(s.name)}
                style={{
                  ...styles.card,
                  background: active
                    ? `linear-gradient(180deg, #fff8d6, ${s.color})`
                    : "#fff",
                  boxShadow: active ? "0 10px 24px rgba(0,0,0,0.14)" : "none",
                  transform: active ? "translateY(-3px)" : "translateY(0)",
                  border: active ? "2px solid #FFC107" : "1px solid #E5E7EB",
                }}
              >
                <div style={{ ...styles.icon, transform: active ? "scale(1.15)" : "scale(1)" }}>{s.icon}</div>
                <div style={{ ...styles.cardText, fontWeight: active ? 800 : 600 }}>{s.name}</div>
              </button>
            );
          })}
        </div>

        <div style={styles.aiBox}>
          <pre style={styles.aiText}>{aiNote}</pre>
        </div>

        <div id="booking-form" style={styles.formRow}>
          <input
            value={km}
            onChange={(e) => setKm(e.target.value.replace(/\D/g, ""))}
            placeholder="Nhập KM xe"
            style={styles.input}
          />
          <input
            value={plate}
            onChange={(e) => setPlate(e.target.value.toUpperCase())}
            placeholder="Biển số xe"
            style={styles.input}
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Số điện thoại"
            style={styles.input}
          />
          <button onClick={goBooking} style={styles.button}>
            ĐẶT LỊCH NGAY
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#F5F7FB",
    padding: 20,
    fontFamily: "Arial, sans-serif",
  },
  wrap: {
    maxWidth: 1120,
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    color: "#0A2F5A",
    marginBottom: 8,
    fontSize: 34,
    fontWeight: 800,
  },
  subtitle: {
    textAlign: "center",
    color: "#667085",
    marginBottom: 20,
    fontSize: 15,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
    gap: 14,
  },
  card: {
    borderRadius: 18,
    padding: 18,
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.25s ease",
  },
  icon: {
    fontSize: 42,
    marginBottom: 10,
    transition: "all 0.25s ease",
  },
  cardText: {
    fontSize: 15,
    lineHeight: 1.35,
    color: "#1F2937",
  },
  aiBox: {
    marginTop: 18,
    background: "#FFF3C4",
    borderRadius: 14,
    padding: 16,
    border: "1px solid #FFE082",
  },
  aiText: {
    margin: 0,
    whiteSpace: "pre-wrap",
    fontFamily: "inherit",
    fontSize: 15,
    lineHeight: 1.6,
    color: "#3B3B3B",
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 12,
    marginTop: 18,
    alignItems: "center",
  },
  input: {
    padding: "14px 14px",
    borderRadius: 12,
    border: "1px solid #D0D5DD",
    fontSize: 15,
    outline: "none",
  },
  button: {
    padding: "15px 16px",
    borderRadius: 14,
    border: "none",
    background: "linear-gradient(90deg,#FFC107,#FFB300)",
    fontWeight: 800,
    fontSize: 16,
    cursor: "pointer",
    color: "#111827",
  },
};
