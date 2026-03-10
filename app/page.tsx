export default function Home() {

  return (

    <main style={{
      fontFamily:"Arial",
      background:"#f4f6f8",
      minHeight:"100vh",
      padding:"40px"
    }}>

      <div style={{
        display:"flex",
        alignItems:"center",
        gap:"20px",
        marginBottom:"40px"
      }}>

       <img src="/logo%20phi%20long.png" style={{height:"70px"}} />

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


      <div style={{

        display:"grid",
        gridTemplateColumns:"repeat(auto-fit,200px)",
        gap:"20px"

      }}>

        <button style={btn}>Kiểm Tra Xe</button>

        <button style={btn}>Kiểm Tra Gầm</button>

        <button style={btn}>Đặt Lịch Bảo Dưỡng</button>

        <button style={btn}>Blog Kiến Thức</button>

      </div>

    </main>

  )

}

const btn = {

  background:"#0033A0",
  color:"white",
  border:"none",
  padding:"15px",
  borderRadius:"8px",
  fontSize:"16px",
  cursor:"pointer"

}
