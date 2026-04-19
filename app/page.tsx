"use client";

import React, { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type BookingStatus = "pending" | "doing" | "done";

type Booking = {
  id: string;
  customer_name: string;
  phone: string;
  plate: string;
  km: number;
  service: string;
  status: BookingStatus;
  note: string;
  created_at: string;
};

const env =
  typeof process !== "undefined" && process.env
    ? process.env
    : ({} as Record<string, string | undefined>);

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

const STORAGE_KEY = "cardiy_crm_bookings_v2";

const SERVICE_OPTIONS = [
  "Bảo dưỡng nhanh",
  "Bảo dưỡng hệ thống gầm",
  "Thay dầu nhớt",
  "Cân chỉnh thước lái 3D",
  "Lọc gió điều hòa",
  "Thay lốp xe",
  "Thay ắc quy",
  "Kiểm tra an toàn xe",
  "Dịch vụ lưu động 24/7",
];

const seedBookings: Booking[] = [
  {
    id: "1",
    customer_name: "Nguyễn Văn A",
    phone: "0901234567",
    plate: "51H-12345",
    km: 12000,
    service: "Thay dầu nhớt",
    status: "pending",
    note: "Khách chờ báo giá nhanh",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    customer_name: "Trần Văn B",
    phone: "0912345678",
    plate: "61A-88888",
    km: 42000,
    service: "Bảo dưỡng hệ thống gầm",
    status: "doing",
    note: "Xe đi đường dài nhiều",
    created_at: new Date().toISOString(),
  },
];

function makeId() {
  return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function getAiSuggestion(km: number, service: string) {
  const tips: string[] = [];

  if (!km) {
    tips.push("Nhập KM để AI gợi ý chính xác hơn.");
  } else if (km < 5000) {
    tips.push("Xe còn mới, ưu tiên kiểm tra cơ bản và an toàn tổng quát.");
  } else if (km < 10000) {
    tips.push("Nên thay dầu nhớt và kiểm tra lọc gió.");
  } else if (km < 30000) {
    tips.push("Nên bảo dưỡng định kỳ và kiểm tra cân chỉnh nếu xe lệch lái.");
  } else if (km < 60000) {
    tips.push("Ưu tiên kiểm tra gầm, phanh, hệ thống treo và lốp.");
  } else {
    tips.push("Khuyến nghị bảo dưỡng lớn và kiểm tra tổng thể các hạng mục an toàn.");
  }

  const s = service.toLowerCase();

  if (s.includes("dầu")) {
    tips.push("Đề xuất kèm lọc nhớt và kiểm tra rò rỉ quanh máy.");
  }
  if (s.includes("gầm")) {
    tips.push("Nên kiểm tra giảm xóc, rotuyn, cao su càng và góc lái.");
  }
  if (s.includes("lốp")) {
    tips.push("Kiểm tra luôn độ mòn gai, áp suất hơi và đảo lốp nếu cần.");
  }
  if (s.includes("ắc quy")) {
    tips.push("Đo điện áp, kiểm tra cọc bình và hệ thống sạc.");
  }
  if (s.includes("lưu động")) {
    tips.push("Nên xác nhận vị trí khách và thời gian kỹ thuật đến dự kiến.");
  }
  if (s.includes("an toàn")) {
    tips.push("Có thể upsell kiểm tra phanh, lốp, gạt mưa, ắc quy và nước làm mát.");
  }

  return tips.join(" ");
}

export default function Page() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string>("");
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    plate: "",
    km: "",
    service: "Bảo dưỡng nhanh",
    note: "",
  });

  async function loadBookings() {
    setLoading(true);
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from("bookings")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        const rows = (data || []) as Booking[];
        setBookings(rows);
        if (rows[0]) setSelectedId((prev) => prev || rows[0].id);
      } else {
        const local = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
        const rows: Booking[] = local || seedBookings;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
        setBookings(rows);
        if (rows[0]) setSelectedId((prev) => prev || rows[0].id);
      }
    } catch (error) {
      console.error(error);
      setBookings(seedBookings);
      setSelectedId(seedBookings[0]?.id || "");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function persistLocal(rows: Booking[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
    setBookings(rows);
  }

  async function createBooking() {
    if (!form.customer_name || !form.phone || !form.plate) {
      alert("Vui lòng nhập đủ Tên khách, SĐT, Biển số.");
      return;
    }

    const row: Booking = {
      id: makeId(),
      customer_name: form.customer_name,
      phone: form.phone,
      plate: form.plate.toUpperCase(),
      km: Number(form.km || 0),
      service: form.service,
      status: "pending",
      note: form.note,
      created_at: new Date().toISOString(),
    };

    if (supabase) {
      const { error } = await supabase.from("bookings").insert(row);
      if (error) {
        alert("Lỗi tạo booking DB.");
        return;
      }
      await loadBookings();
    } else {
      const rows = [row, ...bookings];
      await persistLocal(rows);
    }

    setSelectedId(row.id);
    setForm({
      customer_name: "",
      phone: "",
      plate: "",
      km: "",
      service: "Bảo dưỡng nhanh",
      note: "",
    });
  }

  async function updateStatus(id: string, status: BookingStatus) {
    if (supabase) {
      const { error } = await supabase
        .from("bookings")
        .update({ status })
        .eq("id", id);
      if (!error) await loadBookings();
    } else {
      const rows = bookings.map((b) => (b.id === id ? { ...b, status } : b));
      await persistLocal(rows);
    }
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return bookings;
    return bookings.filter((b) =>
      `${b.customer_name} ${b.phone} ${b.plate} ${b.service} ${b.note}`
        .toLowerCase()
        .includes(q)
    );
  }, [bookings, search]);

  const selected =
    filtered.find((b) => b.id === selectedId) ||
    bookings.find((b) => b.id === selectedId) ||
    null;

  const aiText = useMemo(() => {
    if (!selected) return getAiSuggestion(Number(form.km || 0), form.service);
    return getAiSuggestion(selected.km, selected.service);
  }, [selected, form.km, form.service]);

  const columns: { key: BookingStatus; title: string }[] = [
    { key: "pending", title: "Mới" },
    { key: "doing", title: "Đang làm" },
    { key: "done", title: "Hoàn thành" },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.wrap}>
        <div style={styles.header}>
          <div>
            <div style={styles.kicker}>CARDIY PRO</div>
            <h1 style={styles.title}>Kanban + CRM + AI gợi ý dịch vụ</h1>
          </div>
          <a
            href="https://www.cardiy.vn/garages"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.topButton}
          >
            Booking xưởng dịch vụ
          </a>
        </div>

        <div style={styles.topGrid}>
          <div style={styles.panel}>
            <div style={styles.panelTitle}>Tạo booking / CRM</div>

            <input
              style={styles.input}
              placeholder="Tên khách hàng"
              value={form.customer_name}
              onChange={(e) =>
                setForm({ ...form, customer_name: e.target.value })
              }
            />

            <input
              style={styles.input}
              placeholder="Số điện thoại"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <input
              style={styles.input}
              placeholder="Biển số xe"
              value={form.plate}
              onChange={(e) => setForm({ ...form, plate: e.target.value })}
            />

            <input
              style={styles.input}
              placeholder="KM hiện tại"
              value={form.km}
              onChange={(e) =>
                setForm({ ...form, km: e.target.value.replace(/\D/g, "") })
              }
            />

            <select
              style={styles.input}
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
            >
              {SERVICE_OPTIONS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>

            <textarea
              style={{ ...styles.input, minHeight: 84, resize: "vertical" as const }}
              placeholder="Ghi chú"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
            />

            <button style={styles.primaryButton} onClick={createBooking}>
              Tạo booking
            </button>
          </div>

          <div style={styles.panel}>
            <div style={styles.panelTitle}>AI gợi ý dịch vụ</div>
            <div style={styles.aiBox}>{aiText}</div>

            <div style={{ marginTop: 14, fontSize: 13, color: "#666" }}>
              AI đang dựa vào:
              <div>- KM xe</div>
              <div>- Dịch vụ đang chọn</div>
              <div>- Trạng thái CRM hiện tại</div>
            </div>
          </div>

          <div style={styles.panel}>
            <div style={styles.panelTitle}>CRM khách hàng</div>

            {selected ? (
              <div style={{ lineHeight: 1.8 }}>
                <div>
                  <b>Khách:</b> {selected.customer_name}
                </div>
                <div>
                  <b>SĐT:</b> {selected.phone}
                </div>
                <div>
                  <b>Biển số:</b> {selected.plate}
                </div>
                <div>
                  <b>KM:</b> {selected.km.toLocaleString()} km
                </div>
                <div>
                  <b>Dịch vụ:</b> {selected.service}
                </div>
                <div>
                  <b>Ghi chú:</b> {selected.note || "-"}
                </div>
                <div>
                  <b>Ngày tạo:</b>{" "}
                  {new Date(selected.created_at).toLocaleString("vi-VN")}
                </div>

                <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
                  <a
                    href={`https://zalo.me/0975767778?text=${encodeURIComponent(
                      `🚗 CARDIY BOOKING
Khách: ${selected.customer_name}
SĐT: ${selected.phone}
Biển số: ${selected.plate}
KM: ${selected.km}
Dịch vụ: ${selected.service}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.secondaryButton}
                  >
                    Chat Zalo
                  </a>

                  <a href={`tel:${selected.phone}`} style={styles.secondaryButton}>
                    Gọi khách
                  </a>
                </div>
              </div>
            ) : (
              <div style={{ color: "#777" }}>Chọn 1 booking để xem CRM.</div>
            )}
          </div>
        </div>

        <div style={styles.searchBarWrap}>
          <input
            style={styles.searchInput}
            placeholder="Tìm theo tên khách, SĐT, biển số, dịch vụ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div style={styles.loading}>Đang tải dữ liệu...</div>
        ) : (
          <div style={styles.kanban}>
            {columns.map((col) => (
              <div key={col.key} style={styles.column}>
                <div style={styles.columnHeader}>
                  <span>{col.title}</span>
                  <span style={styles.badge}>
                    {filtered.filter((b) => b.status === col.key).length}
                  </span>
                </div>

                <div style={styles.cardList}>
                  {filtered
                    .filter((b) => b.status === col.key)
                    .map((b) => (
                      <div
                        key={b.id}
                        style={{
                          ...styles.card,
                          border:
                            selectedId === b.id
                              ? "2px solid #1d4ed8"
                              : "1px solid #e5e7eb",
                        }}
                        onClick={() => setSelectedId(b.id)}
                      >
                        <div style={styles.cardTitle}>{b.customer_name}</div>
                        <div style={styles.cardLine}>🚘 {b.plate}</div>
                        <div style={styles.cardLine}>🔧 {b.service}</div>
                        <div style={styles.cardLine}>📏 {b.km.toLocaleString()} km</div>
                        <div style={styles.cardLine}>📞 {b.phone}</div>

                        <div style={styles.cardActions}>
                          {col.key !== "pending" && (
                            <button
                              style={styles.smallButton}
                              onClick={(e) => {
                                e.stopPropagation();
                                updateStatus(b.id, "pending");
                              }}
                            >
                              ← Mới
                            </button>
                          )}

                          {col.key === "pending" && (
                            <button
                              style={styles.smallButton}
                              onClick={(e) => {
                                e.stopPropagation();
                                updateStatus(b.id, "doing");
                              }}
                            >
                              → Đang làm
                            </button>
                          )}

                          {col.key === "doing" && (
                            <button
                              style={styles.smallButton}
                              onClick={(e) => {
                                e.stopPropagation();
                                updateStatus(b.id, "done");
                              }}
                            >
                              → Hoàn thành
                            </button>
                          )}

                          {col.key === "done" && (
                            <button
                              style={styles.smallButton}
                              onClick={(e) => {
                                e.stopPropagation();
                                updateStatus(b.id, "doing");
                              }}
                            >
                              ← Trả về
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#fffbea",
    padding: 20,
    fontFamily: "Arial, sans-serif",
  },
  wrap: {
    maxWidth: 1400,
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    marginBottom: 20,
    flexWrap: "wrap",
  },
  kicker: {
    fontSize: 12,
    fontWeight: 700,
    color: "#a16207",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  title: {
    margin: "6px 0 0",
    fontSize: 32,
    fontWeight: 800,
    color: "#111827",
  },
  topButton: {
    background: "#facc15",
    color: "#111827",
    padding: "12px 16px",
    borderRadius: 12,
    textDecoration: "none",
    fontWeight: 700,
  },
  topGrid: {
    display: "grid",
    gridTemplateColumns: "1.1fr 1fr 1fr",
    gap: 16,
    marginBottom: 20,
  },
  panel: {
    background: "#fff",
    border: "1px solid #f3f4f6",
    borderRadius: 18,
    padding: 16,
    boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: 800,
    marginBottom: 12,
    color: "#111827",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    marginBottom: 10,
    borderRadius: 12,
    border: "1px solid #d1d5db",
    fontSize: 14,
    boxSizing: "border-box",
  },
  primaryButton: {
    width: "100%",
    padding: "13px 16px",
    borderRadius: 12,
    border: "none",
    background: "#facc15",
    color: "#111827",
    fontWeight: 800,
    cursor: "pointer",
  },
  secondaryButton: {
    display: "inline-block",
    padding: "10px 12px",
    borderRadius: 10,
    background: "#f3f4f6",
    color: "#111827",
    textDecoration: "none",
    fontWeight: 700,
  },
  aiBox: {
    background: "#fef3c7",
    color: "#78350f",
    borderRadius: 14,
    padding: 14,
    lineHeight: 1.7,
    minHeight: 150,
    fontWeight: 600,
  },
  searchBarWrap: {
    marginBottom: 16,
  },
  searchInput: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 14,
    border: "1px solid #d1d5db",
    fontSize: 15,
    boxSizing: "border-box",
  },
  loading: {
    padding: 30,
    textAlign: "center",
    color: "#666",
  },
  kanban: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 16,
    alignItems: "start",
  },
  column: {
    background: "#fff",
    borderRadius: 18,
    padding: 14,
    border: "1px solid #f3f4f6",
    boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
    minHeight: 500,
  },
  columnHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: 800,
    marginBottom: 12,
    fontSize: 18,
  },
  badge: {
    background: "#fef3c7",
    color: "#92400e",
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 800,
  },
  cardList: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  card: {
    background: "#fffdf5",
    borderRadius: 16,
    padding: 14,
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 800,
    marginBottom: 8,
    color: "#111827",
  },
  cardLine: {
    fontSize: 13,
    color: "#4b5563",
    marginBottom: 4,
  },
  cardActions: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    marginTop: 10,
  },
  smallButton: {
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px solid #d1d5db",
    background: "#fff",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 700,
  },
};
