"use client";

import React, { useEffect, useMemo, useState } from "react";

type ServiceItem = {
  id: string;
  name: string;
  icon: string;
  color: string;
  desc: string;
  mobile?: boolean;
};

type Booking = {
  id: string;
  createdAt: string;
  customerName: string;
  plate: string;
  phone: string;
  km: number;
  services: string[];
  advice: string;
  level: string;
  mode: "Tại cửa hàng" | "Lưu động";
  eta: string;
  note: string;
};

const STORAGE_KEY = "cardiy_pro_booking_v1";

const SERVICES: ServiceItem[] = [
  {
    id: "bao-duong-nhanh",
    name: "Bảo dưỡng nhanh",
    icon: "🛠️",
    color: "#FFD54F",
    desc: "Thay nhớt, lọc, kiểm tra nhanh theo định kỳ",
  },
  {
    id: "bao-duong-gam",
    name: "Bảo dưỡng hệ thống gầm",
    icon: "🚙",
    color: "#FFB300",
    desc: "Kiểm tra gầm, phanh, treo, lái",
  },
  {
    id: "thay-dau",
    name: "Thay dầu nhớt động cơ",
    icon: "🛢️",
    color: "#8E7CFF",
    desc: "Dầu máy, lọc nhớt, kiểm tra rò rỉ",
  },
  {
    id: "can-chinh-3d",
    name: "Cân chỉnh thước lái 3D",
    icon: "⚙️",
    color: "#B0BEC5",
    desc: "Cân chỉnh góc lái, giảm mòn lốp lệch",
  },
  {
    id: "loc-gio",
    name: "Lọc gió điều hòa",
    icon: "❄️",
    color: "#80DEEA",
    desc: "Vệ sinh, thay lọc gió, khử mùi",
  },
  {
    id: "thay-lop",
    name: "Thay lốp xe",
    icon: "🛞",
    color: "#90A4AE",
    desc: "Lốp, áp suất, đảo lốp, cân bằng",
  },
  {
    id: "ac-quy",
    name: "Thay ắc quy",
    icon: "🔋",
    color: "#B0BEC5",
    desc: "Kiểm tra điện áp, sạc, thay mới",
  },
  {
    id: "an-toan",
    name: "Kiểm tra an toàn xe",
    icon: "✅",
    color: "#64B5F6",
    desc: "Kiểm tra phanh, lốp, ắc quy, đèn, dầu",
  },
  {
    id: "luu-dong",
    name: "Dịch vụ lưu động 24/7",
    icon: "🚚",
    color: "#81C784",
    desc: "Hỗ trợ tận nơi, xử lý nhanh",
    mobile: true,
  },
  {
    id: "khac",
    name: "Dịch vụ khác",
    icon: "🚘",
    color: "#90CAF9",
    desc: "Tư vấn theo nhu cầu thực tế",
  },
];

function formatMoney(value: number) {
  return new Intl.NumberFormat("vi-VN").format(value) + "đ";
}

function getMaintenanceLevel(km: number) {
  if (!km || Number.isNaN(km)) {
    return {
      level: "Cấp 4",
      advice:
        "Chưa có KM rõ ràng. Khuyến nghị kiểm tra an toàn miễn phí và tư vấn cấp bảo dưỡng lớn để tránh sót hạng mục.",
      note: "Ưu tiên kiểm tra tổng thể trước báo giá.",
    };
  }

  const remainder40 = km % 40000;
  const remainder20 = km % 20000;
  const remainder10 = km % 10000;

  if (remainder40 === 0) {
    return {
      level: "Cấp 4",
      advice:
        "Đến mốc bảo dưỡng lớn. Ưu tiên kiểm tra tổng thể, dầu hộp số, bugi, gầm, phanh và các hạng mục an toàn.",
      note: "Nên thực hiện kiểm tra an toàn miễn phí trước khi chốt báo giá.",
    };
  }

  if (remainder20 === 0) {
    return {
      level: "Cấp 3",
      advice:
        "Đến mốc bảo dưỡng trung bình lớn. Nên kiểm tra gầm, phanh, lọc gió, cân chỉnh thước lái và các hao mòn liên quan.",
      note: "Phù hợp kết hợp kiểm tra an toàn xe.",
    };
  }

  if (remainder10 === 0) {
    return {
      level: "Cấp 2",
      advice:
        "Đến mốc bảo dưỡng trung bình. Nên thay dầu nhớt, kiểm tra lọc gió, ắc quy, lốp và các hạng mục định kỳ.",
      note: "Ưu tiên các hạng mục định kỳ cơ bản.",
    };
  }

  if (km < 5000) {
    return {
      level: "Kiểm tra đầu kỳ",
      advice:
        "Xe còn mới. Ưu tiên kiểm tra an toàn cơ bản, áp suất lốp, nước làm mát, nước rửa kính và tình trạng vận hành.",
      note: "Tư vấn nhẹ, không upsell quá mạnh.",
    };
  }

  if (km < 10000) {
    return {
      level: "Cấp 1",
      advice:
        "Khuyến nghị thay dầu nhớt, kiểm tra lọc gió, gạt mưa, lốp và các hạng mục an toàn cơ bản.",
      note: "Phù hợp bảo dưỡng nhanh.",
    };
  }

  if (km < 30000) {
    return {
      level: "Cấp 2",
      advice:
        "Khuyến nghị bảo dưỡng định kỳ, kiểm tra lốp, lọc gió, cân chỉnh thước lái 3D nếu xe có dấu hiệu lệch lái.",
      note: "Nên kết hợp kiểm tra an toàn xe.",
    };
  }

  if (km < 60000) {
    return {
      level: "Cấp 3",
      advice:
        "Khuyến nghị kiểm tra tổng thể hơn, ưu tiên gầm, treo, phanh, ắc quy và các hao mòn theo thời gian sử dụng.",
      note: "Phù hợp bảo dưỡng hệ thống gầm.",
    };
  }

  return {
    level: "Cấp 4",
    advice:
      "Khuyến nghị bảo dưỡng lớn, kiểm tra tổng thể gầm, lái, phanh, dầu, lọc, ắc quy và an toàn vận hành.",
    note: "Nên kiểm tra an toàn miễn phí trước khi chốt hạng mục.",
  };
}

function estimateEta(selected: string[]) {
  if (selected.includes("Dịch vụ lưu động 24/7")) {
    return "KTV lưu động dự kiến tới trong 20–30 phút";
  }
  if (selected.includes("Bảo dưỡng hệ thống gầm")) {
    return "Thời gian dự kiến 90–150 phút";
  }
  if (selected.includes("Bảo dưỡng nhanh")) {
    return "Thời gian dự kiến 45–60 phút";
  }
  if (selected.includes("Thay dầu nhớt động cơ")) {
    return "Thời gian dự kiến 30–45 phút";
  }
  return "Thời gian dự kiến 45–90 phút";
}

function getSafetyChecklist(km: number, services: string[]) {
  const level = getMaintenanceLevel(km);

  const rows = [
    "Áp suất lốp / độ mòn lốp",
    "Má phanh / đĩa phanh",
    "Dầu phanh",
    "Ắc quy",
    "Lọc gió động cơ / điều hòa",
    "Nước làm mát",
    "Gạt mưa / nước rửa kính",
    "Đèn ngoại thất",
    "Phuộc / giảm xóc",
    "Góc đặt bánh xe",
  ];

  const recommended =
    services.includes("Bảo dưỡng hệ thống gầm")
      ? ["Má phanh / đĩa phanh", "Phuộc / giảm xóc", "Góc đặt bánh xe"]
      : services.includes("Thay dầu nhớt động cơ")
      ? ["Dầu phanh", "Nước làm mát", "Lọc gió động cơ / điều hòa"]
      : services.includes("Dịch vụ lưu động 24/7")
      ? ["Ắc quy", "Áp suất lốp / độ mòn lốp", "Đèn ngoại thất"]
      : ["Áp suất lốp / độ mòn lốp", "Má phanh / đĩa phanh", "Ắc quy"];

  return { rows, level: level.level, recommended };
}

export default function Page() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [plate, setPlate] = useState("");
  const [phone, setPhone] = useState("");
  const [km, setKm] = useState("");
  const [savedBookings, setSavedBookings] = useState<Booking[]>([]);
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    const raw =
      typeof window !== "undefined"
        ? window.localStorage.getItem(STORAGE_KEY)
        : null;
    if (raw) {
      try {
        setSavedBookings(JSON.parse(raw));
      } catch {
        setSavedBookings([]);
      }
    }
  }, []);

  const kmNumber = Number(km || 0);
  const maintenance = useMemo(() => getMaintenanceLevel(kmNumber), [kmNumber]);
  const selectedObjects = SERVICES.filter((s) => selectedServices.includes(s.name));
  const eta = estimateEta(selectedServices);
  const mode: "Tại cửa hàng" | "Lưu động" = selectedServices.includes(
    "Dịch vụ lưu động 24/7"
  )
    ? "Lưu động"
    : "Tại cửa hàng";

  const safetyChecklist = useMemo(
    () => getSafetyChecklist(kmNumber, selectedServices),
    [kmNumber, selectedServices]
  );

  const aiMessage = useMemo(() => {
    if (!selectedServices.length) {
      return "👋 Xin chào! Tôi là AI Cố vấn Service. Anh/chị chọn dịch vụ hoặc nhập KM để tôi tư vấn cấp bảo dưỡng phù hợp.";
    }

    const serviceText = selectedServices.join(", ");
    const base = `Anh/chị đang chọn: ${serviceText}. ${maintenance.advice}`;

    if (mode === "Lưu động") {
      return `${base} Với lưu động 24/7, hệ thống ưu tiên tiếp nhận nhanh và điều phối kỹ thuật gần nhất. ${eta}.`;
    }

    return `${base} ${eta}. Khuyến nghị luôn kiểm tra an toàn xe trước khi chốt hạng mục.`;
  }, [selectedServices, maintenance, mode, eta]);

  function toggleService(name: string) {
    setSelectedServices((prev) =>
      prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]
    );
  }

  function createRipple(e: React.MouseEvent<HTMLButtonElement>) {
    const button = e.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    const rect = button.getBoundingClientRect();

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;
    circle.className = "ripple";

    const oldRipple = button.getElementsByClassName("ripple")[0];
    if (oldRipple) oldRipple.remove();

    button.appendChild(circle);
  }

  function saveLocalBooking(booking: Booking) {
    const next = [booking, ...savedBookings];
    setSavedBookings(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
  }

  function buildQueryParams() {
    const params = new URLSearchParams();
    params.set("customer_name", customerName || "Khách mới");
    params.set("plate", plate || "");
    params.set("phone", phone || "");
    params.set("km", km || "");
    params.set("services", selectedServices.join(", "));
    params.set("level", maintenance.level);
    params.set("mode", mode);
    params.set("eta", eta);
    return params.toString();
  }

  function handleBooking() {
    if (!plate || !phone) {
      alert("Vui lòng nhập Biển số xe và Số điện thoại.");
      return;
    }

    const booking: Booking = {
      id: `BK-${Date.now()}`,
      createdAt: new Date().toISOString(),
      customerName: customerName || "Khách mới",
      plate,
      phone,
      km: kmNumber || 0,
      services: selectedServices.length ? selectedServices : ["Kiểm tra an toàn xe"],
      advice: maintenance.advice,
      level: maintenance.level,
      mode,
      eta,
      note: maintenance.note,
    };

    saveLocalBooking(booking);

    const url = `https://www.cardiy.vn/?${buildQueryParams()}`;
    window.open(url, "_blank");
  }

  function handleZalo() {
    if (!plate || !phone) {
      alert("Vui lòng nhập Biển số xe và Số điện thoại.");
      return;
    }

    const text = [
      "🚗 BOOKING CARDIY",
      `Khách hàng: ${customerName || "Khách mới"}`,
      `Biển số: ${plate}`,
      `SĐT: ${phone}`,
      `KM: ${km || "Chưa nhập"}`,
      `Dịch vụ: ${selectedServices.join(", ") || "Kiểm tra an toàn xe"}`,
      `Cấp bảo dưỡng gợi ý: ${maintenance.level}`,
      `Hình thức: ${mode}`,
      `Thời gian dự kiến: ${eta}`,
    ].join("\n");

    window.open(
      `https://zalo.me/0975767778?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  }

  return (
    <main className="cardiy-page">
      <div className="hero">
        <div className="hero-badge">CARDIY PRO REAL</div>
        <h1>TRỢ LÝ DỊCH VỤ Ô TÔ 🚗</h1>
        <p>
          Chọn dịch vụ • Nhập KM • AI gợi ý cấp bảo dưỡng • Tạo phiếu kiểm tra an toàn • Đặt lịch ngay
        </p>
      </div>

      <section className="panel">
        <div className="grid">
          {SERVICES.map((service) => {
            const active = selectedServices.includes(service.name);
            return (
              <button
                key={service.id}
                type="button"
                className={`card ${active ? "active" : ""}`}
                style={
                  active
                    ? ({
                        ["--card-active" as string]: service.color,
                      } as React.CSSProperties)
                    : undefined
                }
                onClick={(e) => {
                  createRipple(e);
                  toggleService(service.name);
                }}
              >
                <span className="card-check">{active ? "✓" : ""}</span>
                <div className="card-icon">{service.icon}</div>
                <div className="card-title">{service.name}</div>
                <div className="card-desc">{service.desc}</div>
              </button>
            );
          })}
        </div>

        <div className="advisor-box">
          <div className="advisor-title">👉 AI Cố vấn Service</div>
          <div className="advisor-message">{aiMessage}</div>
        </div>

        <div className="form-grid">
          <input
            className="input"
            placeholder="Tên khách hàng"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <input
            className="input"
            placeholder="Biển số xe"
            value={plate}
            onChange={(e) => setPlate(e.target.value.toUpperCase())}
          />
          <input
            className="input"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            className="input"
            placeholder="Nhập KM xe"
            value={km}
            onChange={(e) => setKm(e.target.value.replace(/\D/g, ""))}
          />
        </div>

        <div className="summary">
          <div className="summary-item">
            <span className="label">Cấp bảo dưỡng gợi ý</span>
            <strong>{maintenance.level}</strong>
          </div>
          <div className="summary-item">
            <span className="label">Hình thức</span>
            <strong>{mode}</strong>
          </div>
          <div className="summary-item">
            <span className="label">Thời gian dự kiến</span>
            <strong>{eta}</strong>
          </div>
        </div>

        <div className="cta-row">
          <button className="btn btn-zalo" onClick={handleZalo}>
            Booking qua Zalo 0975767778
          </button>
          <button className="btn btn-main" onClick={handleBooking}>
            ĐẶT LỊCH NGAY
          </button>
        </div>
      </section>

      <section className="panel">
        <div className="section-head">
          <h2>Phiếu kiểm tra an toàn</h2>
          <span className="tag">{safetyChecklist.level}</span>
        </div>

        <div className="sheet-head">
          <div><b>Khách hàng:</b> {customerName || "................................"}</div>
          <div><b>Biển số:</b> {plate || "................................"}</div>
          <div><b>SĐT:</b> {phone || "................................"}</div>
          <div><b>KM hiện tại:</b> {km || "................................"}</div>
        </div>

        <div className="check-grid">
          {safetyChecklist.rows.map((item) => {
            const hot = safetyChecklist.recommended.includes(item);
            return (
              <div key={item} className={`check-row ${hot ? "hot" : ""}`}>
                <div className="check-name">{item}</div>
                <div className="check-statuses">
                  <span>Tốt</span>
                  <span>Lưu ý</span>
                  <span>Thay</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="sheet-note">
          <b>AI ghi chú:</b> {maintenance.note}
        </div>
      </section>

      <section className="panel">
        <div className="section-head">
          <h2>Chat live tư vấn nhanh</h2>
          <span className="tag secondary">Hỗ trợ chốt lịch</span>
        </div>

        <div className="chat-box">
          <div className="chat-bubble bot">{aiMessage}</div>
          {chatInput.trim() ? (
            <div className="chat-bubble user">{chatInput}</div>
          ) : null}
        </div>

        <input
          className="input"
          placeholder="Nhập câu hỏi của khách: ví dụ xe 45.000km nên làm gì?"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
        />
      </section>

      <section className="panel">
        <div className="section-head">
          <h2>Lịch sử booking local</h2>
          <span className="tag secondary">{savedBookings.length} booking</span>
        </div>

        <div className="booking-list">
          {savedBookings.length === 0 ? (
            <div className="empty">Chưa có booking nào được lưu.</div>
          ) : (
            savedBookings.map((b) => (
              <div key={b.id} className="booking-item">
                <div>
                  <div className="booking-title">
                    {b.plate} • {b.customerName}
                  </div>
                  <div className="booking-sub">
                    {b.services.join(", ")} • {b.mode}
                  </div>
                </div>
                <div className="booking-right">
                  <div>{b.level}</div>
                  <small>{b.eta}</small>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <style jsx>{`
        .cardiy-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(255, 214, 10, 0.18), transparent 28%),
            linear-gradient(180deg, #fffdf6 0%, #f7f9fc 100%);
          padding: 24px;
          color: #0f172a;
        }

        .hero {
          max-width: 1200px;
          margin: 0 auto 20px;
          text-align: center;
        }

        .hero-badge {
          display: inline-block;
          padding: 8px 14px;
          border-radius: 999px;
          background: #0b4dbb;
          color: #fff;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.08em;
          margin-bottom: 14px;
        }

        .hero h1 {
          margin: 0;
          font-size: clamp(28px, 5vw, 52px);
          line-height: 1.05;
          font-weight: 900;
          color: #0a2f5a;
        }

        .hero p {
          margin: 10px auto 0;
          max-width: 760px;
          color: #475569;
          font-size: 15px;
        }

        .panel {
          max-width: 1200px;
          margin: 0 auto 20px;
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(148, 163, 184, 0.18);
          border-radius: 28px;
          padding: 22px;
          box-shadow: 0 18px 60px rgba(15, 23, 42, 0.08);
          backdrop-filter: blur(10px);
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .card {
          position: relative;
          overflow: hidden;
          text-align: left;
          border-radius: 24px;
          border: 1px solid #e2e8f0;
          background: #fff;
          padding: 18px;
          min-height: 148px;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .card:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 28px rgba(15, 23, 42, 0.08);
          border-color: #f2c94c;
        }

        .card.active {
          border: 2px solid #f0b90b;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.95), color-mix(in srgb, var(--card-active) 68%, white 32%));
          box-shadow:
            0 14px 34px rgba(240, 185, 11, 0.22),
            inset 0 1px 0 rgba(255,255,255,0.9);
          transform: translateY(-2px) scale(1.01);
        }

        .card-check {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 28px;
          height: 28px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          font-weight: 900;
          background: rgba(255,255,255,0.92);
          color: #0b4dbb;
          border: 1px solid rgba(255,255,255,0.9);
          box-shadow: 0 4px 12px rgba(15,23,42,0.08);
        }

        .card-icon {
          font-size: 40px;
          line-height: 1;
          margin-bottom: 14px;
          transform: translateZ(0);
        }

        .card.active .card-icon {
          animation: pulse 0.55s ease;
        }

        .card-title {
          font-size: 18px;
          font-weight: 900;
          color: #111827;
          margin-bottom: 8px;
        }

        .card-desc {
          font-size: 13px;
          line-height: 1.45;
          color: #475569;
        }

        .advisor-box {
          margin-top: 18px;
          background: linear-gradient(90deg, #fff8cc, #fff1a6);
          border: 1px solid #f4d03f;
          border-radius: 20px;
          padding: 16px 18px;
        }

        .advisor-title {
          font-size: 13px;
          font-weight: 900;
          color: #8a5b00;
          margin-bottom: 8px;
        }

        .advisor-message {
          font-size: 15px;
          line-height: 1.6;
          color: #3f3a16;
          font-weight: 600;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
          margin-top: 18px;
        }

        .input {
          width: 100%;
          border-radius: 16px;
          border: 1px solid #dbe2ea;
          background: #fff;
          padding: 14px 16px;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .input:focus {
          border-color: #0b4dbb;
          box-shadow: 0 0 0 4px rgba(11, 77, 187, 0.08);
        }

        .summary {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          margin-top: 16px;
        }

        .summary-item {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 14px 16px;
        }

        .label {
          display: block;
          font-size: 12px;
          color: #64748b;
          margin-bottom: 6px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .summary-item strong {
          font-size: 15px;
          color: #0f172a;
        }

        .cta-row {
          margin-top: 18px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .btn {
          border: 0;
          border-radius: 18px;
          padding: 16px 18px;
          font-size: 16px;
          font-weight: 900;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
        }

        .btn:hover {
          transform: translateY(-1px);
        }

        .btn-zalo {
          background: #ffffff;
          color: #0b4dbb;
          border: 1px solid #cfe0ff;
          box-shadow: 0 8px 22px rgba(11, 77, 187, 0.08);
        }

        .btn-main {
          color: #0b2b4d;
          background: linear-gradient(90deg, #ffd400, #ffb800);
          box-shadow: 0 14px 28px rgba(255, 196, 0, 0.24);
        }

        .section-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 16px;
        }

        .section-head h2 {
          margin: 0;
          font-size: 24px;
          color: #0a2f5a;
        }

        .tag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          padding: 8px 12px;
          background: #fff3bf;
          color: #7c5d00;
          font-weight: 900;
          font-size: 12px;
          border: 1px solid #f4d03f;
        }

        .tag.secondary {
          background: #eff6ff;
          color: #0b4dbb;
          border-color: #bfdbfe;
        }

        .sheet-head {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 14px 16px;
          margin-bottom: 14px;
          font-size: 14px;
        }

        .check-grid {
          display: grid;
          gap: 10px;
        }

        .check-row {
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          gap: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 12px 14px;
          background: #fff;
        }

        .check-row.hot {
          border-color: #f0b90b;
          background: linear-gradient(90deg, #fffdf5, #fff9df);
        }

        .check-name {
          font-weight: 800;
          color: #1e293b;
        }

        .check-statuses {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          text-align: center;
        }

        .check-statuses span {
          border-radius: 10px;
          background: #f8fafc;
          border: 1px dashed #cbd5e1;
          padding: 8px 6px;
          font-size: 12px;
          font-weight: 700;
          color: #475569;
        }

        .sheet-note {
          margin-top: 14px;
          background: #fff7d6;
          border: 1px solid #f2d77a;
          border-radius: 16px;
          padding: 14px 16px;
          font-size: 14px;
          line-height: 1.5;
          color: #5f4b00;
        }

        .chat-box {
          display: grid;
          gap: 10px;
          margin-bottom: 12px;
        }

        .chat-bubble {
          max-width: 85%;
          border-radius: 18px;
          padding: 14px 16px;
          font-size: 14px;
          line-height: 1.5;
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);
        }

        .chat-bubble.bot {
          background: #fff8cc;
          border: 1px solid #f4d03f;
          color: #45370a;
        }

        .chat-bubble.user {
          margin-left: auto;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          color: #0f172a;
        }

        .booking-list {
          display: grid;
          gap: 10px;
        }

        .booking-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 14px 16px;
        }

        .booking-title {
          font-weight: 900;
          color: #0f172a;
          margin-bottom: 4px;
        }

        .booking-sub {
          font-size: 13px;
          color: #64748b;
        }

        .booking-right {
          text-align: right;
          font-weight: 800;
          color: #0b4dbb;
        }

        .booking-right small {
          display: block;
          color: #64748b;
          margin-top: 4px;
          font-weight: 700;
        }

        .empty {
          border-radius: 16px;
          background: #f8fafc;
          border: 1px dashed #cbd5e1;
          padding: 18px;
          text-align: center;
          color: #64748b;
          font-weight: 700;
        }

        :global(.ripple) {
          position: absolute;
          border-radius: 999px;
          transform: scale(0);
          animation: ripple 600ms linear;
          background-color: rgba(255, 214, 10, 0.35);
          pointer-events: none;
        }

        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(0.92);
          }
          50% {
            transform: scale(1.08);
          }
          100% {
            transform: scale(1);
          }
        }

        @media (max-width: 1024px) {
          .form-grid,
          .summary {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 767px) {
          .cardiy-page {
            padding: 14px;
          }

          .panel {
            padding: 16px;
            border-radius: 22px;
          }

          .grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
          }

          .card {
            min-height: 136px;
            padding: 16px;
            border-radius: 20px;
          }

          .card-title {
            font-size: 15px;
          }

          .card-desc {
            font-size: 12px;
          }

          .form-grid,
          .summary,
          .sheet-head,
          .cta-row {
            grid-template-columns: 1fr;
          }

          .check-row {
            grid-template-columns: 1fr;
          }

          .section-head h2 {
            font-size: 20px;
          }
        }
      `}</style>
    </main>
  );
}
