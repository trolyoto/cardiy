export default function Home() {
  return (
    <div style={{display:"flex",fontFamily:"Arial",background:"#f4f6fb"}}>

      {/* SIDEBAR */}

      <div style={{
        width:"260px",
        background:"#123a7a",
        color:"white",
        height:"100vh",
        padding:"20px",
        boxShadow:"3px 0 10px rgba(0,0,0,0.1)"
      }}>

        <h2 style={{marginBottom:"5px"}}>CARDIY</h2>
        <p style={{fontSize:"12px",opacity:"0.8"}}>Trợ Lý Ô Tô</p>

        <hr style={{margin:"20px 0"}}/>

        <h4>SERVICE</h4>

        <a href="https://trolyoto.github.io/phieukiemtra/baoduong.html" target="_blank" style={menu}>
          🚗 Kiểm tra xe
        </a>

        <a href="https://trolyoto.github.io/phieukiemtra/Phieukiemlop2.html" target="_blank" style={menu}>
          🛞 Kiểm tra lốp
        </a>

        <a href="https://trolyoto.github.io/phieukiemtra/kiemtragam.html" target="_blank" style={menu}>
          🔧 Kiểm tra gầm
        </a>

        <hr style={{margin:"20px 0"}}/>

        <h4>WORKSHOP</h4>

        <div style={menu}>📄 Phiếu nhận xe</div>
        <div style={menu}>🛠 Phiếu sửa chữa</div>

        <hr style={{margin:"20px 0"}}/>

        <h4>CUSTOMER</h4>

        <div style={menu}>👥 CRM khách hàng</div>
        <div style={menu}>📊 Lịch sử xe</div>

        <hr style={{margin:"20px 0"}}/>

        <h4>BOOKING</h4>

        <div style={menu}>📅 Đặt lịch bảo dưỡng</div>

        <hr style={{margin:"20px 0"}}/>

        <h4>BLOG</h4>

        <div style={menu}>✍️ Viết bài chia sẻ</div>

      </div>


      {/* MAIN */}

      <div style={{flex:1,padding:"40px"}}>

        <h1 style={{marginBottom:"5px"}}>TRẠM DỊCH VỤ CARDIY</h1>
        <p style={{color:"#777",marginBottom:"30px"}}>
          Nền tảng quản lý dịch vụ ô tô
        </p>

        {/* DASHBOARD CARD */}

        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(3,1fr)",
          gap:"20px",
          marginBottom:"30px"
        }}>

          <a href="https://trolyoto.github.io/phieukiemtra/baoduong.html" target="_blank" style={card}>
            🚗 Kiểm tra xe
          </a>

          <a href="https://trolyoto.github.io/phieukiemtra/Phieukiemlop2.html" target="_blank" style={card}>
            🛞 Kiểm tra lốp
          </a>

          <a href="https://trolyoto.github.io/phieukiemtra/kiemtragam.html" target="_blank" style={card}>
            🔧 Kiểm tra gầm
          </a>

        </div>

        {/* FORM */}

        <iframe
          src="https://trolyoto.github.io/phieukiemtra/baoduong.html"
          style={{
            width:"100%",
            height:"850px",
            border:"none",
            borderRadius:"10px",
            background:"white",
            boxShadow:"0 5px 20px rgba(0,0,0,0.15)"
          }}
        />

      </div>

    </div>
  )
}


/* STYLE */

const menu = {
  background:"white",
  color:"#333",
  padding:"10px",
  borderRadius:"8px",
  marginTop:"10px",
  display:"block",
  textDecoration:"none",
  cursor:"pointer"
}

const card = {
  background:"white",
  padding:"30px",
  borderRadius:"12px",
  textAlign:"center",
  fontWeight:"bold",
  textDecoration:"none",
  color:"#123a7a",
  boxShadow:"0 5px 15px rgba(0,0,0,0.1)"
}
