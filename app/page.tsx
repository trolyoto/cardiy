"use client";

import React, { useEffect, useMemo, useState } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

type BookingStatus =
  | "Mới"
  | "Đã nhận"
  | "Đang điều phối"
  | "Đang tới"
  | "Đang làm"
  | "Hoàn thành";

type Technician = {
  id: string;
  name: string;
  specialty: "gầm" | "lốp" | "lưu động" | "chung";
  area: string;
  active_jobs: number;
  is_available: boolean;
};

type Booking = {
  id: string;
  customer_name: string;
  phone: string;
  plate: string;
  km: number;
  service: string;
  status: BookingStatus;
  note: string;
  address: string;
  branch: string;
  revenue: number;
  technician_id: string | null;
  created_at: string;
};

const STORAGE_KEY = "cardiy_v3_bookings";
const HOTLINE_ZALO = "0975767778";

const env =
  typeof process !== "undefined" && process.env
    ? process.env
    : ({} as Record<string, string | undefined>);

let supabase: SupabaseClient | null = null;
try {
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (url && key) supabase = createClient(url, key);
} catch {
  supabase = null;
}

const techniciansSeed: Technician[] = [
  { id: "ktv-gam-01", name: "KTV Nam", specialty: "gầm", area: "Thủ Đức", active_jobs: 1, is_available: true },
  { id: "ktv-lop-01", name: "KTV Hùng", specialty: "lốp", area: "Bình Dương", active_jobs: 2, is_available: true },
  { id: "ktv-mobile-01", name: "KTV Duy", specialty: "lưu động", area: "Lưu động", active_jobs: 1, is_available: true },
  { id: "ktv-general-01", name: "KTV Phúc", specialty: "chung", area: "Quận 7", active_jobs: 0, is_available: true },
];

const services = [
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
    id: "BK-1",
    customer_name: "Nguyễn Văn A",
    phone: "0901234567",
    plate: "51H-12345",
    km: 12000,
    service: "Thay dầu nhớt",
    status: "Mới",
    note: "Khách chờ báo giá nhanh",
    address: "Thủ Đức",
    branch: "CN Thủ Đức",
    revenue: 650000,
    technician_id: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "BK-2",
    customer_name: "Trần Văn B",
    phone: "0912345678",
    plate: "61A-88888",
    km: 42000,
    service: "Bảo dưỡng hệ thống gầm",
    status: "Đang làm",
    note: "Xe đi đường dài nhiều",
    address: "Bình Dương",
    branch: "CN Bình Dương",
    revenue: 1800000,
    technician_id: "ktv-gam-01",
    created_at: new Date().toISOString(),
  },
];

function makeId() {
  return `BK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function getAiSuggestion(km: number, service: string) {
  const tips: string[] = [];
  if (!km) tips.push("Nhập KM để AI gợi ý chính xác hơn.");
  else if (km < 5000) tips.push("Xe còn mới, ưu tiên kiểm tra cơ bản và an toàn tổng quát.");
  else if (km < 10000) tips.push("Nên thay dầu nhớt và kiểm tra lọc gió.");
  else if (km < 30000) tips.push("Nên bảo dưỡng định kỳ và kiểm tra cân chỉnh nếu xe lệch lái.");
  else if (km < 60000) tips.push("Ưu tiên kiểm tra gầm, phanh, hệ thống treo và lốp.");
  else tips.push("Khuyến nghị bảo dưỡng lớn và kiểm tra tổng thể các hạng mục an toàn.");

  const s = service.toLowerCase();
  if (s.includes("dầu")) tips.push("Đề xuất kèm lọc nhớt và kiểm tra rò rỉ quanh máy.");
  if (s.includes("gầm")) tips.push("Nên kiểm tra giảm xóc, rotuyn, cao su càng và góc lái.");
  if (s.includes("lốp")) tips.push("Kiểm tra luôn độ mòn gai, áp suất hơi và đảo lốp nếu cần.");
  if (s.includes("ắc quy")) tips.push("Đo điện áp, kiểm tra cọc bình và hệ thống sạc.");
  if (s.includes("lưu động")) tips.push("Xác nhận vị trí khách và ETA kỹ thuật.");
  if (s.includes("an toàn")) tips.push("Upsell phanh, lốp, gạt mưa, ắc quy và nước làm mát.");
  return tips.join(" ");
}

function autoAssignTechnician(service: string, techs: Technician[]) {
  const s = service.toLowerCase();
  let pool = techs.filter((t) => t.is_available);

  if (s.includes("gầm")) pool = pool.filter((t) => t.specialty === "gầm");
  else if (s.includes("lốp") || s.includes("ắc quy")) pool = pool.filter((t) => t.specialty === "lốp");
  else if (s.includes("lưu động")) pool = pool.filter((t) => t.specialty === "lưu động");
  else pool = pool.filter((t) => t.specialty === "chung" || t.specialty === "gầm");

  if (pool.length === 0) return null;
  pool.sort((a, b) => a.active_jobs - b.active_jobs);
  return pool[0];
}

function formatMoney(v: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(v || 0);
}

function sameDay(iso: string) {
  const d = new Date(iso);
  const n = new Date();
  return (
    d.getFullYear() === n.getFullYear() &&
    d.getMonth() === n.getMonth() &&
    d.getDate() === n.getDate()
  );
}

export default function Page() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [technicians, setTechnicians] = useState<Technician[]>(techniciansSeed);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState("");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    plate: "",
    km: "",
    service: "Bảo dưỡng nhanh",
    note: "",
    address: "",
    branch: "CN Thủ Đức",
    revenue: "",
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
    } catch (e) {
      console.error(e);
      setBookings(seedBookings);
      setSelectedId(seedBookings[0]?.id || "");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    if (!supabase) return;
    const channel = supabase
      .channel("cardiy-v3-bookings")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookings" },
        () => loadBookings()
      )
      .subscribe();

    return () => {
      supabase?.removeChannel(channel);
    };
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

    const assigned = autoAssignTechnician(form.service, technicians);
    const row: Booking = {
      id: makeId(),
      customer_name: form.customer_name,
      phone: form.phone,
      plate: form.plate.toUpperCase(),
      km: Number(form.km || 0),
      service: form.service,
      status: assigned ? "Đã nhận" : "Mới",
      note: form.note,
      address: form.address,
      branch: form.branch,
      revenue: Number(form.revenue || 0),
      technician_id: assigned?.id || null,
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

    if (assigned) {
      setTechnicians((prev) =>
        prev.map((t) =>
          t.id === assigned.id ? { ...t, active_jobs: t.active_jobs + 1 } : t
        )
      );
    }

    setSelectedId(row.id);
    setForm({
      customer_name: "",
      phone: "",
      plate: "",
      km: "",
      service: "Bảo dưỡng nhanh",
      note: "",
      address: "",
      branch: "CN Thủ Đức",
      revenue: "",
    });
  }

  async function updateStatus(id: string, status: BookingStatus) {
    if (supabase) {
      const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
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
      `${b.customer_name} ${b.phone} ${b.plate} ${b.service} ${b.note} ${b.branch} ${b.address}`
        .toLowerCase()
        .includes(q)
    );
  }, [bookings, search]);

  const selected =
    bookings.find((b) => b.id === selectedId) ||
    filtered.find((b) => b.id === selectedId) ||
    null;

  const aiText = useMemo(() => {
    if (!selected) return getAiSuggestion(Number(form.km || 0), form.service);
    return getAiSuggestion(selected.km, selected.service);
  }, [selected, form.km, form.service]);

  const dailyRevenue = useMemo(
    () =>
      bookings
        .filter((b) => b.status === "Hoàn thành" && sameDay(b.created_at))
        .reduce((sum, b) => sum + Number(b.revenue || 0), 0),
    [bookings]
  );

  const stats = useMemo(
    () => ({
      total: bookings.length,
      pending: bookings.filter((b) => b.status !== "Hoàn thành").length,
      done: bookings.filter((b) => b.status === "Hoàn thành").length,
      todayRevenue: dailyRevenue,
    }),
    [bookings, dailyRevenue]
  );

  const columns: BookingStatus[] = [
    "Mới",
    "Đã nhận",
    "Đang làm",
    "Hoàn thành",
  ];

  function zaloLink(b: Booking) {
    const tech = technicians.find((t) => t.id === b.technician_id);
    const msg = `🚗 CARDIY BOOKING
Khách: ${b.customer_name}
SĐT: ${b.phone}
Biển số: ${b.plate}
KM: ${b.km}
Dịch vụ: ${b.service}
Chi nhánh: ${b.branch}
Địa chỉ: ${b.address}
KTV: ${tech?.name || "Chưa gán"}
AI gợi ý: ${getAiSuggestion(b.km, b.service)}`;
    return `https://zalo.me/${HOTLINE_ZALO}?text=${encodeURIComponent(msg)}`;
  }

  return (
    <div style={styles.page}>
      <div style={styles.wrap}>
        <div style={styles.header}>
          <div>
            <div style={styles.kicker}>CARDIY V3</div>
            <h1 style={styles.title}>Auto Assign + Doanh Thu + Zalo + Supabase Realtime</h1>
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

        <div style={styles.statGrid}>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Tổng booking</div>
            <div style={styles.statValue}>{stats.total}</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Đang xử lý</div>
            <div style={styles.statValue}>{stats.pending}</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Hoàn thành</div>
            <div style={styles.statValue}>{stats.done}</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Doanh thu hôm nay</div>
            <div style={styles.statValueMoney}>{formatMoney(stats.todayRevenue)}</div>
          </div>
        </div>

        <div style={styles.topGrid}>
          <div style={styles.panel}>
            <div style={styles.panelTitle}>Tạo booking / CRM</div>

            <input style={styles.input} placeholder="Tên khách hàng" value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} />
            <input style={styles.input} placeholder="Số điện thoại" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <input style={styles.input} placeholder="Biển số xe" value={form.plate} onChange={(e) => setForm({ ...form, plate: e.target.value })} />
            <input style={styles.input} placeholder="KM hiện tại" value={form.km} onChange={(e) => setForm({ ...form, km: e.target.value.replace(/\D/g, "") })} />
            <select style={styles.input} value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
              {services.map((s) => <option key={s}>{s}</option>)}
            </select>
            <input style={styles.input} placeholder="Chi nhánh" value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })} />
            <input style={styles.input} placeholder="Địa chỉ / vị trí khách" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            <input style={styles.input} placeholder="Doanh thu dự kiến" value={form.revenue} onChange={(e) => setForm({ ...form, revenue: e.target.value.replace(/\D/g, "") })} />
            <textarea
              style={{ ...styles.input, minHeight: 84, resize: "vertical" as const }}
              placeholder="Ghi chú"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
            />
            <button style={styles.primaryButton} onClick={createBooking}>
              Tạo booking + auto assign
            </button>
          </div>

          <div style={styles.panel}>
            <div style={styles.panelTitle}>AI gợi ý dịch vụ</div>
            <div style={styles.aiBox}>{aiText}</div>

            <div style={{ marginTop: 14, fontSize: 13, color: "#666" }}>
              Auto assign hiện dựa trên:
              <div>- Gầm → KTV gầm</div>
              <div>- Lốp / ắc quy → KTV lốp</div>
              <div>- Lưu động → KTV lưu động</div>
              <div>- Còn lại → KTV chung</div>
            </div>
          </div>

          <div style={styles.panel}>
            <div style={styles.panelTitle}>CRM / kỹ thuật</div>
            {selected ? (
              <div style={{ lineHeight: 1.8 }}>
                <div><b>Khách:</b> {selected.customer_name}</div>
                <div><b>SĐT:</b> {selected.phone}</div>
                <div><b>Biển số:</b> {selected.plate}</div>
                <div><b>KM:</b> {selected.km.toLocaleString()} km</div>
                <div><b>Dịch vụ:</b> {selected.service}</div>
                <div><b>Chi nhánh:</b> {selected.branch}</div>
                <div><b>Địa chỉ:</b> {selected.address || "-"}</div>
                <div><b>Doanh thu:</b> {formatMoney(selected.revenue)}</div>
                <div>
                  <b>KTV:</b>{" "}
                  {technicians.find((t) => t.id === selected.technician_id)?.name || "Chưa gán"}
                </div>
                <div><b>Ghi chú:</b> {selected.note || "-"}</div>

                <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
                  <a href={zaloLink(selected)} target="_blank" rel="noopener noreferrer" style={styles.secondaryButton}>
                    Chat Zalo thật
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

        <div style={styles.techPanel}>
          <div style={styles.panelTitle}>Tải kỹ thuật viên</div>
          <div style={styles.techGrid}>
            {technicians.map((t) => (
              <div key={t.id} style={styles.techCard}>
                <div style={{ fontWeight: 800 }}>{t.name}</div>
                <div>{t.specialty}</div>
                <div>{t.area}</div>
                <div>Số job: {t.active_jobs}</div>
              </div>
            ))}
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
              <div key={col} style={styles.column}>
                <div style={styles.columnHeader}>
                  <span>{col}</span>
                  <span style={styles.badge}>
                    {filtered.filter((b) => b.status === col).length}
                  </span>
                </div>

                <div style={styles.cardList}>
                  {filtered
                    .filter((b) => b.status === col)
                    .map((b) => (
                      <div
                        key={b.id}
                        style={{
                          ...styles.card,
                          border: selectedId === b.id ? "2px solid #1d4ed8" : "1px solid #e5e7eb",
                        }}
                        onClick={() => setSelectedId(b.id)}
                      >
                        <div style={styles.cardTitle}>{b.customer_name}</div>
                        <div style={styles.cardLine}>🚘 {b.plate}</div>
                        <div style={styles.cardLine}>🔧 {b.service}</div>
                        <div style={styles.cardLine}>📏 {b.km.toLocaleString()} km</div>
                        <div style={styles.cardLine}>📞 {b.phone}</div>
                        <div style={styles.cardLine}>💰 {formatMoney(b.revenue)}</div>

                        <div style={styles.cardActions}>
                          {col === "Mới" && (
                            <button
                              style={styles.smallButton}
                              onClick={(e) => {
                                e.stopPropagation();
                                updateStatus(b.id, "Đã nhận");
                              }}
                            >
                              → Nhận việc
                            </button>
                          )}
                          {col === "Đã nhận" && (
                            <button
                              style={styles.smallButton}
                              onClick={(e) => {
                                e.stopPropagation();
                                updateStatus(b.id, "Đang làm");
                              }}
                            >
                              → Đang làm
                            </button>
                          )}
                          {col === "Đang làm" && (
                            <button
                              style={styles.smallButton}
                              onClick={(e) => {
                                e.stopPropagation();
                                updateStatus(b.id, "Hoàn thành");
                              }}
                            >
                              → Hoàn thành
                            </button>
                          )}
                          {col === "Hoàn thành" && (
                            <button
                              style={styles.smallButton}
                              onClick={(e) => {
                                e.stopPropagation();
                                updateStatus(b.id, "Đang làm");
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
  page: { minHeight: "100vh", background: "#fffbea", padding: 20, fontFamily: "Arial, sans-serif" },
  wrap: { maxWidth: 1500, margin: "0 auto" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, marginBottom: 20, flexWrap: "wrap" },
  kicker: { fontSize: 12, fontWeight: 700, color: "#a16207", letterSpacing: 1, textTransform: "uppercase" },
  title: { margin: "6px 0 0", fontSize: 30, fontWeight: 800, color: "#111827" },
  topButton: { background: "#facc15", color: "#111827", padding: "12px 16px", borderRadius: 12, textDecoration: "none", fontWeight: 700 },
  statGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 16 },
  statCard: { background: "#fff", borderRadius: 18, padding: 16, boxShadow: "0 8px 24px rgba(0,0,0,0.05)" },
  statLabel: { color: "#6b7280", fontSize: 13, marginBottom: 8, fontWeight: 700 },
  statValue: { color: "#111827", fontWeight: 800, fontSize: 28 },
  statValueMoney: { color: "#16a34a", fontWeight: 800, fontSize: 24 },
  topGrid: { display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr", gap: 16, marginBottom: 20 },
  panel: { background: "#fff", border: "1px solid #f3f4f6", borderRadius: 18, padding: 16, boxShadow: "0 8px 24px rgba(0,0,0,0.05)" },
  techPanel: { background: "#fff", border: "1px solid #f3f4f6", borderRadius: 18, padding: 16, boxShadow: "0 8px 24px rgba(0,0,0,0.05)", marginBottom: 20 },
  techGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 },
  techCard: { background: "#fffdf5", borderRadius: 14, padding: 12, border: "1px solid #eee", lineHeight: 1.7 },
  panelTitle: { fontSize: 18, fontWeight: 800, marginBottom: 12, color: "#111827" },
  input: { width: "100%", padding: "12px 14px", marginBottom: 10, borderRadius: 12, border: "1px solid #d1d5db", fontSize: 14, boxSizing: "border-box" },
  primaryButton: { width: "100%", padding: "13px 16px", borderRadius: 12, border: "none", background: "#facc15", color: "#111827", fontWeight: 800, cursor: "pointer" },
  secondaryButton: { display: "inline-block", padding: "10px 12px", borderRadius: 10, background: "#f3f4f6", color: "#111827", textDecoration: "none", fontWeight: 700 },
  aiBox: { background: "#fef3c7", color: "#78350f", borderRadius: 14, padding: 14, lineHeight: 1.7, minHeight: 150, fontWeight: 600 },
  searchBarWrap: { marginBottom: 16 },
  searchInput: { width: "100%", padding: "14px 16px", borderRadius: 14, border: "1px solid #d1d5db", fontSize: 15, boxSizing: "border-box" },
  loading: { padding: 30, textAlign: "center", color: "#666" },
  kanban: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, alignItems: "start" },
  column: { background: "#fff", borderRadius: 18, padding: 14, border: "1px solid #f3f4f6", boxShadow: "0 8px 24px rgba(0,0,0,0.04)", minHeight: 500 },
  columnHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: 800, marginBottom: 12, fontSize: 18 },
  badge: { background: "#fef3c7", color: "#92400e", padding: "4px 10px", borderRadius: 999, fontSize: 12, fontWeight: 800 },
  cardList: { display: "flex", flexDirection: "column", gap: 12 },
  card: { background: "#fffdf5", borderRadius: 16, padding: 14, cursor: "pointer", transition: "all 0.2s ease", boxShadow: "0 4px 12px rgba(0,0,0,0.04)" },
  cardTitle: { fontSize: 16, fontWeight: 800, marginBottom: 8, color: "#111827" },
  cardLine: { fontSize: 13, color: "#4b5563", marginBottom: 4 },
  cardActions: { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 },
  smallButton: { padding: "8px 10px", borderRadius: 10, border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 700 },
};
