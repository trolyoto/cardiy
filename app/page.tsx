export default function Home() {
  return (
    <main style={{fontFamily:"Arial",padding:40}}>

      <h1>CARDIY</h1>
      <h2>Trợ lý ô tô thông minh</h2>

      <p>Nền tảng kết nối chủ xe và garage.</p>

      <h3>Dịch vụ nhanh</h3>

      <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>

        <a href="/service"><button style={btn}>Bảo dưỡng</button></a>

        <a href="/inspection"><button style={btn}>Kiểm tra xe</button></a>

        <a href="/garage"><button style={btn}>Garage gần nhất</button></a>

        <a href="/vehicle"><button style={btn}>Hồ sơ xe</button></a>

      </div>

      <h3 style={{marginTop:40}}>Ưu đãi theo thương hiệu</h3>

      <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>

        <div style={card}>
          <h4>Michelin</h4>
          <p>Giảm giá thay lốp 10%</p>
        </div>

        <div style={card}>
          <h4>Bridgestone</h4>
          <p>Tặng cân chỉnh thước lái</p>
        </div>

        <div style={card}>
          <h4>Kumho</h4>
          <p>Ưu đãi thay 4 lốp</p>
        </div>

      </div>

      <h3 style={{marginTop:40}}>Blog ô tô</h3>

      <div style={{display:"flex",gap:20}}>

        <div style={card}>
          <h4>Khi nào cần thay lốp?</h4>
          <p>Dấu hiệu nhận biết lốp mòn.</p>
        </div>

        <div style={card}>
          <h4>Bảo dưỡng 5000km</h4>
          <p>Những hạng mục cần kiểm tra.</p>
        </div>

      </div>

    </main>
  )
}

const btn = {
padding:"12px 20px",
background:"#2563eb",
color:"white",
border:"none",
borderRadius:"8px"
}

const card = {
background:"#f1f5f9",
padding:"20px",
borderRadius:"10px",
width:"220px"
}
