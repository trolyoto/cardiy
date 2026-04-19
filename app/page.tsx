"use client";
import { useState } from "react";

export default function Page() {

  const [selected, setSelected] = useState([]);
  const [km, setKm] = useState("");
  const [note, setNote] = useState("👉 Chọn dịch vụ để bắt đầu");

  const services = [
    { name: "Thay phanh xe", icon: "🛑", color: "#4A90E2" },
    { name: "Thay dầu nhớt", icon: "🛢️", color: "#007AFF" },
    { name: "Cân chỉnh góc bánh xe", icon: "⚙️", color: "#5C6BC0" },
    { name: "Sửa chữa lốp", icon: "🛠️", color: "#42A5F5" },
    { name: "Lọc gió điều hòa", icon: "❄️", color: "#26C6DA" },
    { name: "Thay lốp xe", icon: "🛞", color: "#78909C" },
    { name: "Thay ắc quy", icon: "🔋", color: "#3949AB" },
    { name: "Kiểm tra an toàn xe", icon: "📋", color: "#43A047" },
    { name: "Gạt mưa", icon: "🌧️", color: "#29B6F6" },
    { name: "Dịch vụ lưu động 24/7", icon: "🚗", color: "#66BB6A" },
    { name: "Khác", icon: "🚙", color: "#90A4AE" }
  ];

  function toggleService(s) {
    let newArr;

    if (selected.includes(s.name)) {
      newArr = selected.filter(i => i !== s.name);
    } else {
      newArr = [...selected, s.name];
    }

    setSelected(newArr);

    let msg = "📋 " + newArr.join(", ");

    // 👉 AI THEO KM
    if (km) {
      if (km < 5000) msg += "\n🔹 Xe mới – kiểm tra cơ bản";
      else if (km < 10000) msg += "\n🔹 Nên thay dầu + lọc gió";
      else if (km < 30000) msg += "\n🔹 Bảo dưỡng định kỳ tổng thể";
      else msg += "\n🔹 Nên kiểm tra gầm + hệ thống";
    }

    // 👉 LƯU ĐỘNG
    if (newArr.includes("Dịch vụ lưu động 24/7")) {
      msg += "\n🚗 Kỹ thuật tới trong 20–30 phút";
    }

    setNote(msg);

    // 👉 AUTO SCROLL
    setTimeout(()=>{
      document.getElementById("form").scrollIntoView({behavior:"smooth"});
    },200);
  }

  return (
    <div style={{
      padding:20,
      maxWidth:1000,
      margin:"auto",
      fontFamily:"sans-serif"
    }}>

      <h2 style={{
        textAlign:"center",
        marginBottom:20,
        color:"#0A2F5A"
      }}>
        🚗 TRỢ LÝ DỊCH VỤ Ô TÔ
      </h2>

      {/* GRID */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(2,1fr)",
        gap:12
      }}>

        {services.map(s => (
          <div
            key={s.name}
            onClick={()=>toggleService(s)}
            style={{
              padding:18,
              borderRadius:14,
              background:selected.includes(s.name)
                ? `linear-gradient(180deg,#fff8d6,${s.color})`
                : "#fff",
              border:"1px solid #ddd",
              textAlign:"center",
              cursor:"pointer",
              transition:"0.3s",
              boxShadow:selected.includes(s.name)
                ? "0 8px 20px rgba(255,193,7,0.3)"
                : "none"
            }}
          >

            <div style={{
              fontSize:40,
              marginBottom:8,
              transform:selected.includes(s.name) ? "scale(1.2)" : "scale(1)"
            }}>
              {s.icon}
            </div>

            <div style={{
              fontWeight:selected.includes(s.name) ? "bold" : "normal"
            }}>
              {s.name}
            </div>

          </div>
        ))}

      </div>

      {/* AI BOX */}
      <div style={{
        marginTop:15,
        padding:15,
        background:"#FFF3C4",
        borderRadius:12,
        whiteSpace:"pre-line"
      }}>
        {note}
      </div>

      {/* FORM */}
      <div id="form" style={{
        display:"grid",
        gridTemplateColumns:"1fr",
        gap:10,
        marginTop:15
      }}>
        <input 
          placeholder="Nhập KM xe"
          onChange={e=>setKm(e.target.value)}
          style={inputStyle}
        />
        <input placeholder="Biển số xe" style={inputStyle}/>
        <input placeholder="Số điện thoại" style={inputStyle}/>
      </div>

      {/* BUTTON */}
      <button
        onClick={()=>window.location.href="https://www.cardiy.vn/"}
        style={{
          marginTop:15,
          width:"100%",
          padding:16,
          background:"linear-gradient(90deg,#FFC107,#ffb300)",
          border:"none",
          borderRadius:12,
          fontWeight:"bold",
          fontSize:16
        }}
      >
        ĐẶT LỊCH NGAY
      </button>

    </div>
  );
}

const inputStyle = {
  padding:12,
  borderRadius:10,
  border:"1px solid #ddd"
};
