export default function Home() {

  return (

    <main style={{
      fontFamily:"Arial",
      background:"#f4f6f8",
      minHeight:"100vh",
      padding:40
    }}>

      {/* HEADER */}

      <div style={{
        display:"flex",
        alignItems:"center",
        gap:20,
        marginBottom:40
      }}>

        <img 
        src="/logo.png"
        style={{height:60}}
        />

        <div>

          <h1 style={{
            color:"#0033A0",
            margin:0
          }}>
            CARDIY
          </h1>

          <p style={{
            color:"#4A4A4A",
            margin:0
          }}>
            Trợ Lý Ô Tô Thông Minh
          </p>

        </div>

      </div>

      {/* MENU */}

      <div style={{

        display:"grid",
        gridTemplateColumns:"repeat(auto-fit,200px)",
        gap:20

      }}>

        <a href="#">
          <button style={buttonStyle}>
            Kiểm Tra Xe
          </button>
        </a>

        <a href="#">
          <button style={buttonStyle}>
            Kiểm Tra Gầm
          </button>
        </a>

        <a href="#">
          <button style={buttonStyle}>
            Đặt Lịch Bảo Dưỡng
          </button>
        </a>

        <a href="#">
          <button style={buttonStyle}>
            Blog Ô Tô
          </button>
        </a>

        <a href="#">
          <button style={buttonStyle}>
            Ưu Đãi Garage
          </button>
        </a>

      </div>

    </main>

  )

}

const buttonStyle = {

  background:"#0033A0",
  color:"white",
  border:"none",
  padding:"15px",
  borderRadius:"8px",
  fontSize:"16px",
  cursor:"pointer",
  width:"200px"

}
