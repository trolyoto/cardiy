"use client";
import { useState } from "react";

/* ================== SERVICE DATA ================== */
const SERVICES = [
  { name: "Bảo dưỡng nhanh", icon: "🛠️", color: "#FFC107" },
  { name: "Bảo dưỡng hệ thống gầm", icon: "🚙", color: "#FF9800" },
  { name: "Thay dầu nhớt", icon: "🛢️", color: "#2196F3" },
  { name: "Cân chỉnh thước lái 3D", icon: "⚙️", color: "#9E9E9E" },
  { name: "Lọc gió điều hòa", icon: "❄️", color: "#26C6DA" },
  { name: "Thay lốp xe", icon: "🛞", color: "#607D8B" },
  { name: "Thay ắc quy", icon: "🔋", color: "#3949AB" },
  { name: "Kiểm tra an toàn xe", icon: "✅", color: "#43A047" },
  { name: "Dịch vụ lưu động 24/7", icon: "🚗", color: "#66BB6A", eta: "20–30 phút" },
];

/* ================== MAIN ================== */
export default function CardiyPro() {
  const [selected, setSelected] = useState<string[]>([]);
  const [km, setKm] = useState("");
  const [plate, setPlate] = useState("");
  const [phone, setPhone] = useState("");
  const [advice, setAdvice] = useState("");

  /* ================== CLICK SERVICE ================== */
  const toggle = (name: string) => {
    setSelected((prev) =>
      prev.includes(name)
        ? prev.filter((s) => s !== name)
        : [...prev, name]
    );

    setTimeout(() => {
      document.getElementById("form")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 200);
  };

  /* ================== AI KM ================== */
  const suggest = (km: string) => {
    const k = Number(km);

    if (!k) return "👉 Nhập KM để AI tư vấn bảo dưỡng";

    if (k < 5000)
      return "Xe mới → kiểm tra cơ bản, dầu, lốp";
    if (k < 10000)
      return "Nên thay dầu + lọc gió";
    if (k < 30000)
      return "Bảo dưỡng định kỳ + cân chỉnh 3D";
    if (k < 60000)
      return "Kiểm tra gầm + hệ thống treo";
    return "Nên bảo dưỡng tổng thể toàn xe";
  };

  const handleKM = (value: string) => {
    setKm(value);
    setAdvice(suggest(value));
  };

  /* ================== BOOKING ================== */
  const booking = () => {
    if (!plate || !phone) {
      alert("Vui lòng nhập đủ thông tin");
      return;
    }

    const msg =
      "🚗 BOOKING PHI LONG AUTO%0A" +
      "Biển số: " + plate + "%0A" +
      "SĐT: " + phone + "%0A" +
      "KM: " + km + "%0A" +
      "Dịch vụ: " + selected.join(", ");

    window.open("https://zalo.me/0975767778?text=" + msg, "_blank");
  };

  /* ================== UI ================== */
  return (
    <div style={{ padding: 20, maxWidth: 1100, margin: "auto" }}>
      <h2 style={{ textAlign: "center", color: "#0A2F5A" }}>
        🚗 TRỢ LÝ DỊCH VỤ Ô TÔ
      </h2>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
          gap: 12,
          marginTop: 20,
        }}
      >
        {SERVICES.map((s) => {
          const active = selected.includes(s.name);

          return (
            <div
              key={s.name}
              onClick={() => toggle(s.name)}
              style={{
                padding: 18,
                borderRadius: 16,
                cursor: "pointer",
                textAlign: "center",
                border: active ? "2px solid #FFC107" : "1px solid #ddd",
                background: active
                  ? `linear-gradient(180deg, ${s.color}, #FFC107)`
                  : "#fff",
                color: active ? "#000" : "#333",
                transition: "0.35s cubic-bezier(0.4,0,0.2,1)",
                boxShadow: active
                  ? "0 10px 25px rgba(255,193,7,0.4)"
                  : "none",
              }}
            >
              <div style={{ fontSize: 34 }}>{s.icon}</div>
              <div style={{ marginTop: 6 }}>{s.name}</div>

              {active && s.eta && (
                <div style={{ fontSize: 12 }}>
                  ⏱ {s.eta}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* AI BOX */}
      <div
        style={{
          marginTop: 20,
          padding: 14,
          background: "#fff3c4",
          borderRadius: 10,
          fontWeight: "bold",
        }}
      >
        💡 {advice || "Chọn dịch vụ hoặc nhập KM để AI tư vấn"}
      </div>

      {/* FORM */}
      <div id="form" style={{ marginTop: 20 }}>
        <input
          placeholder="Nhập KM xe"
          value={km}
          onChange={(e) => handleKM(e.target.value)}
          style={input}
        />

        <input
          placeholder="Biển số xe"
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
          style={input}
        />

        <input
          placeholder="Số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={input}
        />

        <button onClick={booking} style={btn}>
          ĐẶT LỊCH NGAY
        </button>
      </div>

      {/* LINK HỆ SINH THÁI */}
      <div style={{ marginTop: 30 }}>
        <h3>🚀 HỆ SINH THÁI CARDIY</h3>

        <a href="https://www.cardiy.vn/garages" target="_blank">
          👉 Booking xưởng dịch vụ
        </a>
        <br />

        <a href="https://www.cardiy.vn/" target="_blank">
          👉 Đăng ký tài khoản xe
        </a>
        <br />

        <a href="https://www.cardiy.vn/" target="_blank">
          👉 Tham gia hệ sinh thái ô tô toàn quốc
        </a>
      </div>
    </div>
  );
}

/* ================== STYLE ================== */
const input = {
  width: "100%",
  padding: 12,
  marginTop: 10,
  borderRadius: 8,
  border: "1px solid #ddd",
};

const btn = {
  width: "100%",
  marginTop: 15,
  padding: 15,
  background: "#FFC107",
  border: "none",
  borderRadius: 10,
  fontWeight: "bold",
};
