export default function Home() {
  return (
    <main style={{fontFamily:"Arial",background:"#f1f5f9",minHeight:"100vh"}}>

      {/* HEADER */}

      <div style={header}>

        <h1 style={logo}>CARDIY</h1>

        <div style={menu}>
          <a href="/maintenance">Bảo dưỡng</a>
          <a href="/inspection">Kiểm tra xe</a>
          <a href="/garage">Garage</a>
          <a href="/blog">Blog</a>
        </div>

      </div>


      {/* HERO */}

      <div style={hero}>

        <h2>🚗 Trợ Lý Ô Tô Thông Minh</h2>

        <p>
          Kết nối Chủ xe – Garage – Phụ tùng.
        </p>

        <div style={{marginTop:30}}>

          <a href="/maintenance">
            <button style={btn}>Đặt lịch bảo dưỡng</button>
          </a>

          <a href="/inspection">
            <button style={btn2}>Phiếu kiểm tra xe</button>
          </a>

        </div>

      </div>


      {/* SERVICES */}

      <div style={section}>

        <h2>Dịch vụ CARDIY</h2>

        <div style={grid}>

          <div style={card}>
            <h3>🔧 Bảo dưỡng</h3>
            <p>Quản lý bảo dưỡng xe định kỳ</p>
          </div>

          <div style={card}>
            <h3>🧾 Phiếu kiểm tra</h3>
            <p>Kiểm tra an toàn xe</p>
          </div>

          <div style={card}>
            <h3>📅 Đặt lịch</h3>
            <p>Đặt lịch garage nhanh</p>
          </div>

          <div style={card}>
            <h3>🧠 Blog</h3>
            <p>Kiến thức chăm sóc xe</p>
          </div>

        </div>

      </div>


      {/* PROMOTION */}

      <div style={promo}>

        <h2>🎁 Ưu đãi hôm nay</h2>

        <ul>
          <li>Giảm 20% thay dầu</li>
          <li>Miễn phí kiểm tra lốp</li>
          <li>Tặng cân bằng động</li>
        </ul>

      </div>

    </main>
  )
}


const header={
display:"flex",
justifyContent:"space-between",
padding:"20px 40px",
background:"#0054A6",
color:"white"
}

const logo={
color:"#FFD500"
}

const menu={
display:"flex",
gap:"20px"
}

const hero={
textAlign:"center",
padding:"80px"
}

const btn={
padding:"14px 24px",
background:"#FFD500",
border:"none",
marginRight:"20px",
borderRadius:"8px",
cursor:"pointer"
}

const btn2={
padding:"14px 24px",
background:"#0054A6",
color:"white",
border:"none",
borderRadius:"8px",
cursor:"pointer"
}

const section={
padding:"60px"
}

const grid={
display:"grid",
gridTemplateColumns:"repeat(4,1fr)",
gap:"20px"
}

const card={
background:"white",
padding:"20px",
borderRadius:"10px",
boxShadow:"0 2px 8px rgba(0,0,0,0.1)"
}

const promo={
background:"#FFD500",
padding:"40px"
}
