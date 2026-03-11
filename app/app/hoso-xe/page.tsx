export default function HoSoXe() {
  return (
    <div style={{ padding: 40 }}>
      <h1>🚗 Hồ sơ xe</h1>

      <div style={{ maxWidth: 400 }}>

        <label>Biển số</label>
        <input style={{ width: "100%", padding: 10 }} />

        <br /><br />

        <label>Hãng xe</label>
        <input style={{ width: "100%", padding: 10 }} />

        <br /><br />

        <label>Dòng xe</label>
        <input style={{ width: "100%", padding: 10 }} />

        <br /><br />

        <label>Size lốp</label>
        <input style={{ width: "100%", padding: 10 }} />

        <br /><br />

        <button
          style={{
            padding: 12,
            background: "#1e40af",
            color: "white",
            borderRadius: 6
          }}
        >
          Lưu hồ sơ xe
        </button>

      </div>
    </div>
  )
}
