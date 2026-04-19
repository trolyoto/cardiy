"use client";

import React from "react";
import { createClient } from "@supabase/supabase-js";
import {
  Bell,
  Car,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  UserCheck,
  Wrench,
  ArrowRight,
  Gauge,
  Sparkles,
  Route,
  KanbanSquare,
  Plus,
} from "lucide-react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

const STATUSES = ["Mới", "Đã nhận", "Đang điều phối", "Đang tới", "Đang làm", "Hoàn thành"];

const STATUS_COLORS: Record<string, string> = {
  "Mới": "bg-amber-50 text-amber-700 border-amber-200",
  "Đã nhận": "bg-blue-50 text-blue-700 border-blue-200",
  "Đang điều phối": "bg-violet-50 text-violet-700 border-violet-200",
  "Đang tới": "bg-cyan-50 text-cyan-700 border-cyan-200",
  "Đang làm": "bg-orange-50 text-orange-700 border-orange-200",
  "Hoàn thành": "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const TECHNICIANS = [
  { id: "ktv-gam-01", name: "KTV Nam", specialty: "gầm", area: "Thủ Đức", status: "Rảnh", jobs: 2 },
  { id: "ktv-lop-01", name: "KTV Hùng", specialty: "lốp", area: "Bình Dương", status: "Đang làm", jobs: 3 },
  { id: "ktv-mobile-01", name: "KTV Duy", specialty: "lưu động", area: "Lưu động", status: "Đang tới", jobs: 2 },
  { id: "ktv-general-01", name: "KTV Phúc", specialty: "chung", area: "Quận 7", status: "Rảnh", jobs: 1 },
];

function makeId() {
  return `BK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function aiSuggest(service: string, km: number) {
  const parts: string[] = [];
  if (!km) parts.push("Nhập KM để AI tư vấn chính xác hơn.");
  if (km > 0 && km < 10000) parts.push("Khuyến nghị thay dầu, kiểm tra lọc gió và an toàn cơ bản.");
  if (km >= 10000 && km < 30000) parts.push("Khuyến nghị bảo dưỡng định kỳ, cân chỉnh thước lái 3D nếu xe lệch lái.");
  if (km >= 30000 && km < 60000) parts.push("Khuyến nghị kiểm tra gầm, hệ thống treo, phanh và rotuyn.");
  if (km >= 60000) parts.push("Khuyến nghị bảo dưỡng lớn, ưu tiên gầm, lái, phanh và kiểm tra tổng thể.");

  if (service.toLowerCase().includes("gầm")) parts.push("Ưu tiên kỹ thuật viên chuyên gầm và kiểm tra bằng phiếu gầm.");
  if (service.toLowerCase().includes("lốp") || service.toLowerCase().includes("ắc quy")) parts.push("Ưu tiên kỹ thuật nhanh để rút ngắn thời gian xử lý.");
  if (service.toLowerCase().includes("lưu động")) parts.push("Kích hoạt điều phối lưu động và xác nhận ETA cho khách.");

  return parts.join(" ");
}

function autoAssignTech(service: string) {
  const key = service.toLowerCase();
  if (key.includes("gầm")) return TECHNICIANS.find((t) => t.specialty === "gầm")?.id || "";
  if (key.includes("lốp") || key.includes("ắc quy")) return TECHNICIANS.find((t) => t.specialty === "lốp")?.id || "";
  if (key.includes("lưu động")) return TECHNICIANS.find((t) => t.specialty === "lưu động")?.id || "";
  return TECHNICIANS.find((t) => t.specialty === "chung")?.id || "";
}

const seedBookings = [
  {
    id: makeId(),
    created_at: new Date().toISOString(),
    customer_name: "Nguyễn Văn Minh",
    plate: "61A-123.45",
    phone: "0912345678",
    service: "Bảo dưỡng nhanh",
    mode: "Tại cửa hàng",
    address: "Bình Dương",
    km: 12000,
    status: "Mới",
    technician_id: "ktv-general-01",
    revenue: 650000,
    note: "Khách cần làm trong sáng nay",
  },
  {
    id: makeId(),
    created_at: new Date().toISOString(),
    customer_name: "Trần Quốc Hải",
    plate: "51H-889.22",
    phone: "0988000111",
    service: "Dịch vụ lưu động 24/7",
    mode: "Lưu động",
    address: "Vạn Phúc, Thủ Đức",
    km: 45000,
    status: "Đang tới",
    technician_id: "ktv-mobile-01",
    revenue: 250000,
    note: "Hỗ trợ tận nơi, xe không nổ máy",
  },
  {
    id: makeId(),
    created_at: new Date().toISOString(),
    customer_name: "Lê Thị Lan",
    plate: "60K-456.78",
    phone: "0909112233",
    service: "Bảo dưỡng hệ thống gầm",
    mode: "Tại cửa hàng",
    address: "Chi nhánh Quận 7",
    km: 62000,
    status: "Đang làm",
    technician_id: "ktv-gam-01",
    revenue: 1800000,
    note: "Xe kêu gầm, lệch lái",
  },
];

export default function CardiyProV2() {
  const [bookings, setBookings] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [selectedId, setSelectedId] = React.useState("");
  const [chat, setChat] = React.useState<any[]>([
    { from: "bot", text: "Xin chào 👋 Tôi là AI cố vấn dịch vụ. Anh/chị cần báo giá hay đặt lịch?" },
  ]);
  const [chatInput, setChatInput] = React.useState("");
  const [form, setForm] = React.useState({
    customer_name: "",
    plate: "",
    phone: "",
    service: "Bảo dưỡng nhanh",
    mode: "Tại cửa hàng",
    address: "",
    km: "",
    revenue: "",
    note: "",
  });

  React.useEffect(() => {
    loadBookings();
  }, []);

  React.useEffect(() => {
    if (!supabase) return;
    const channel = supabase
      .channel("cardiy-v2-bookings")
      .on("postgres_changes", { event: "*", schema: "public", table: "bookings" }, () => loadBookings())
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function loadBookings() {
    setLoading(true);
    try {
      if (supabase) {
        const { data, error } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
        if (error) throw error;
        const rows = data || [];
        setBookings(rows);
        if (rows[0]) setSelectedId((prev) => prev || rows[0].id);
      } else {
        const local = JSON.parse(localStorage.getItem("cardiy_v2_bookings") || "null");
        const rows = local || seedBookings;
        localStorage.setItem("cardiy_v2_bookings", JSON.stringify(rows));
        setBookings(rows);
        if (rows[0]) setSelectedId((prev) => prev || rows[0].id);
      }
    } catch (error) {
      console.error(error);
      setBookings(seedBookings);
      setSelectedId(seedBookings[0].id);
    } finally {
      setLoading(false);
    }
  }

  async function persistLocal(rows: any[]) {
    localStorage.setItem("cardiy_v2_bookings", JSON.stringify(rows));
    setBookings(rows);
  }

  async function createBooking() {
    if (!form.customer_name || !form.phone || !form.plate) return;
    const service = form.service;
    const techId = autoAssignTech(service);
    const row = {
      id: makeId(),
      created_at: new Date().toISOString(),
      customer_name: form.customer_name,
      plate: form.plate.toUpperCase(),
      phone: form.phone,
      service,
      mode: form.mode,
      address: form.address,
      km: Number(form.km || 0),
      status: techId ? "Đã nhận" : "Mới",
      technician_id: techId,
      revenue: Number(form.revenue || 0),
      note: form.note,
    };

    if (supabase) {
      await supabase.from("bookings").insert(row);
      await loadBookings();
    } else {
      const rows = [row, ...bookings];
      await persistLocal(rows);
    }

    setSelectedId(row.id);
    setForm({
      customer_name: "",
      plate: "",
      phone: "",
      service: "Bảo dưỡng nhanh",
      mode: "Tại cửa hàng",
      address: "",
      km: "",
      revenue: "",
      note: "",
    });
  }

  async function updateBooking(id: string, patch: any) {
    if (supabase) {
      await supabase.from("bookings").update(patch).eq("id", id);
      await loadBookings();
    } else {
      const rows = bookings.map((b) => (b.id === id ? { ...b, ...patch } : b));
      await persistLocal(rows);
    }
  }

  function sendChat() {
    if (!chatInput.trim()) return;
    const current = selectedBooking;
    const ai = current
      ? `${aiSuggest(current.service, Number(current.km || 0))} Trạng thái hiện tại: ${current.status}.`
      : "Bên em đã nhận thông tin. Anh/chị để lại biển số và số điện thoại nhé.";
    setChat((prev) => [...prev, { from: "user", text: chatInput }, { from: "bot", text: ai }]);
    setChatInput("");
  }

  const filtered = bookings.filter((b) => {
    const key = `${b.customer_name} ${b.plate} ${b.phone} ${b.service} ${b.address}`.toLowerCase();
    return key.includes(search.toLowerCase());
  });

  const selectedBooking = bookings.find((b) => b.id === selectedId) || null;

  const stats = React.useMemo(() => ({
    total: bookings.length,
    pending: bookings.filter((b) => ["Mới", "Đã nhận", "Đang điều phối", "Đang tới", "Đang làm"].includes(b.status)).length,
    completed: bookings.filter((b) => b.status === "Hoàn thành").length,
    revenue: bookings.filter((b) => b.status === "Hoàn thành").reduce((sum, b) => sum + Number(b.revenue || 0), 0),
  }), [bookings]);

  const kanban = React.useMemo(() => {
    const map: Record<string, any[]> = {};
    STATUSES.forEach((s) => (map[s] = []));
    bookings.forEach((b) => map[b.status]?.push(b));
    return map;
  }, [bookings]);

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="rounded-[28px] bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 p-6 text-white shadow-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold"><Sparkles className="h-3.5 w-3.5" /> CARDIY PRO V2</div>
              <h1 className="mt-3 text-3xl font-black tracking-tight">UI vàng animate • Ripple • Auto assign • CRM • Dashboard realtime</h1>
              <p className="mt-2 text-sm text-blue-100">Bản nâng cấp giống app điều phối, có thể chạy demo ngay và nối Supabase để lên production.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.cardiy.vn/garages" target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold text-white hover:bg-white/20">Booking xưởng dịch vụ</a>
              <a href="https://www.cardiy.vn/" target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-yellow-400 px-4 py-3 text-sm font-black text-slate-900 hover:brightness-95">Mở cardiy.vn</a>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard icon={<Bell className="h-5 w-5" />} label="Booking tổng" value={stats.total} gradient="from-amber-50 to-white" />
          <StatCard icon={<Clock3 className="h-5 w-5" />} label="Đang xử lý" value={stats.pending} gradient="from-cyan-50 to-white" />
          <StatCard icon={<CheckCircle2 className="h-5 w-5" />} label="Hoàn thành" value={stats.completed} gradient="from-emerald-50 to-white" />
          <StatCard icon={<CircleDollarSign className="h-5 w-5" />} label="Doanh thu" value={money(stats.revenue)} gradient="from-violet-50 to-white" />
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.3fr_0.9fr]">
          <Panel title="Điều phối realtime dạng Kanban" subtitle="Kéo được lên bước tiếp theo: drag & drop, map, SLA, ETA">
            <div className="mb-4 flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm khách, biển số, dịch vụ..." className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 outline-none focus:border-blue-800" />
              </div>
              <button className="rounded-2xl bg-yellow-400 px-4 py-3 font-black text-slate-900 hover:brightness-95"><KanbanSquare className="mr-2 inline h-4 w-4" /> Live board</button>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-6">
              {STATUSES.map((status) => (
                <div key={status} className="rounded-3xl bg-slate-50 p-3 ring-1 ring-slate-200">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="text-sm font-black text-slate-700">{status}</div>
                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-slate-600 ring-1 ring-slate-200">{(kanban[status] || []).length}</span>
                  </div>
                  <div className="space-y-3">
                    {(kanban[status] || [])
                      .filter((b) => {
                        const key = `${b.customer_name} ${b.plate} ${b.service}`.toLowerCase();
                        return key.includes(search.toLowerCase());
                      })
                      .map((b) => (
                        <button key={b.id} onClick={() => setSelectedId(b.id)} className={`w-full rounded-2xl border p-3 text-left transition hover:-translate-y-0.5 hover:shadow-md ${selectedId === b.id ? 'border-blue-800 bg-blue-50 ring-2 ring-blue-100' : 'border-slate-200 bg-white'}`}>
                          <div className="font-bold text-slate-900">{b.customer_name}</div>
                          <div className="mt-1 text-sm text-slate-600">{b.service}</div>
                          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                            <span>{b.plate}</span>
                            <span>{Number(b.km || 0).toLocaleString()} km</span>
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <div className="space-y-6">
            <Panel title="Chi tiết booking & AI cố vấn" subtitle="AI gợi ý bảo dưỡng, Zalo OA, auto assign kỹ thuật">
              {selectedBooking ? (
                <div className="space-y-4">
                  <div className="rounded-3xl bg-gradient-to-br from-yellow-50 to-white p-4 ring-1 ring-yellow-200">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-xl font-black text-slate-900">{selectedBooking.customer_name}</div>
                        <div className="mt-1 text-sm text-slate-500">{selectedBooking.plate} • {selectedBooking.phone}</div>
                      </div>
                      <span className={`rounded-full border px-3 py-1 text-xs font-bold ${STATUS_COLORS[selectedBooking.status]}`}>{selectedBooking.status}</span>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                      <Info icon={<Car className="h-4 w-4" />} label="Dịch vụ" value={selectedBooking.service} />
                      <Info icon={<Gauge className="h-4 w-4" />} label="KM hiện tại" value={`${Number(selectedBooking.km || 0).toLocaleString()} km`} />
                      <Info icon={<MapPin className="h-4 w-4" />} label="Địa chỉ" value={selectedBooking.address || selectedBooking.mode} />
                      <Info icon={<Route className="h-4 w-4" />} label="AI gợi ý" value={aiSuggest(selectedBooking.service, Number(selectedBooking.km || 0))} />
                    </div>
                  </div>

                  <select value={selectedBooking.status} onChange={(e) => updateBooking(selectedBooking.id, { status: e.target.value })} className={inputClass}>
                    {STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>

                  <select value={selectedBooking.technician_id || ""} onChange={(e) => updateBooking(selectedBooking.id, { technician_id: e.target.value })} className={inputClass}>
                    <option value="">Chọn kỹ thuật phụ trách</option>
                    {TECHNICIANS.map((t) => (
                      <option key={t.id} value={t.id}>{t.name} • {t.specialty} • {t.area}</option>
                    ))}
                  </select>

                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => updateBooking(selectedBooking.id, { technician_id: autoAssignTech(selectedBooking.service), status: "Đang điều phối" })} className="rounded-2xl bg-blue-900 px-4 py-3 text-sm font-bold text-white hover:bg-blue-800"><UserCheck className="mr-2 inline h-4 w-4" /> Auto assign</button>
                    <button onClick={() => window.open(`https://zalo.me/0975767778?text=${encodeURIComponent(`🚗 CARDIY BOOKING\nBiển số: ${selectedBooking.plate}\nSĐT: ${selectedBooking.phone}\nDịch vụ: ${selectedBooking.service}\nKM: ${selectedBooking.km}\nAI gợi ý: ${aiSuggest(selectedBooking.service, Number(selectedBooking.km || 0))}`)}`, "_blank")} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold hover:bg-slate-50"><MessageCircle className="mr-2 inline h-4 w-4" /> Chat Zalo thật</button>
                    <button onClick={() => window.open(`tel:${selectedBooking.phone}`)} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold hover:bg-slate-50"><Phone className="mr-2 inline h-4 w-4" /> Gọi khách</button>
                    <button onClick={() => updateBooking(selectedBooking.id, { status: "Hoàn thành" })} className="rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-500"><CheckCircle2 className="mr-2 inline h-4 w-4" /> Chốt hoàn thành</button>
                  </div>
                </div>
              ) : <div className="text-sm text-slate-500">Chọn một booking để xem chi tiết.</div>}
            </Panel>

            <Panel title="Tạo booking / CRM khách hàng" subtitle="Dùng cho hotline, fanpage, web booking và lưu động">
              <div className="space-y-3">
                <Field label="Tên khách hàng"><input value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} className={inputClass} /></Field>
                <Field label="Biển số"><input value={form.plate} onChange={(e) => setForm({ ...form, plate: e.target.value.toUpperCase() })} className={inputClass} /></Field>
                <Field label="Số điện thoại"><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} /></Field>
                <Field label="Dịch vụ"><select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className={inputClass}><option>Bảo dưỡng nhanh</option><option>Bảo dưỡng hệ thống gầm</option><option>Thay dầu nhớt</option><option>Dịch vụ lưu động 24/7</option><option>Thay lốp xe</option><option>Thay ắc quy</option></select></Field>
                <Field label="Hình thức"><select value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })} className={inputClass}><option>Tại cửa hàng</option><option>Lưu động</option></select></Field>
                <Field label="Địa chỉ / chi nhánh"><input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className={inputClass} /></Field>
                <Field label="KM hiện tại"><input value={form.km} onChange={(e) => setForm({ ...form, km: e.target.value.replace(/\D/g, "") })} className={inputClass} /></Field>
                <Field label="Doanh thu dự kiến"><input value={form.revenue} onChange={(e) => setForm({ ...form, revenue: e.target.value.replace(/\D/g, "") })} className={inputClass} /></Field>
                <Field label="Ghi chú"><input value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} className={inputClass} /></Field>
                <div className="rounded-2xl bg-yellow-50 p-3 text-sm font-semibold text-amber-800 ring-1 ring-amber-200">AI đề xuất: {aiSuggest(form.service, Number(form.km || 0))}</div>
                <button onClick={createBooking} className="w-full rounded-2xl bg-yellow-400 px-4 py-3 font-black text-slate-900 hover:brightness-95"><Plus className="mr-2 inline h-4 w-4" /> Tạo booking & auto assign</button>
              </div>
            </Panel>

            <Panel title="Chat live / CRM" subtitle="Trả lời khách ngay trong dashboard">
              <div className="space-y-3 max-h-[220px] overflow-auto rounded-2xl border border-slate-200 bg-slate-50 p-3">
                {chat.map((m, i) => (
                  <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${m.from === 'user' ? 'bg-yellow-100 text-slate-900' : 'bg-white text-slate-700 ring-1 ring-slate-200'}`}>{m.text}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-800" placeholder="Nhập nội dung tư vấn cho khách..." />
                <button onClick={sendChat} className="rounded-2xl bg-blue-900 px-4 py-3 font-bold text-white hover:bg-blue-800">Gửi</button>
              </div>
            </Panel>
          </div>
        </section>
      </div>
    </div>
  );
}

function Panel({ title, subtitle, children }: any) {
  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-lg font-black tracking-tight">{title}</h2>
      {subtitle ? <p className="mt-1 mb-4 text-sm text-slate-500">{subtitle}</p> : <div className="mb-4" />}
      {children}
    </section>
  );
}

function StatCard({ icon, label, value, gradient }: any) {
  return (
    <div className={`rounded-3xl bg-gradient-to-br ${gradient} p-4 shadow-sm ring-1 ring-slate-200`}>
      <div className="inline-flex rounded-2xl bg-white p-3 text-blue-800 shadow-sm">{icon}</div>
      <div className="mt-3 text-sm font-semibold text-slate-500">{label}</div>
      <div className="mt-1 text-2xl font-black">{value}</div>
    </div>
  );
}

function Field({ label, children }: any) {
  return (
    <label className="block">
      <div className="mb-2 text-sm font-semibold text-slate-700">{label}</div>
      {children}
    </label>
  );
}

function Info({ icon, label, value }: any) {
  return (
    <div className="rounded-2xl bg-white p-3 ring-1 ring-slate-200">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{icon} {label}</div>
      <div className="mt-1 text-sm font-bold text-slate-900">{value}</div>
    </div>
  );
}

function money(v: number) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(v || 0);
}

const inputClass = "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-800";
;
