export default function Home() {

const btnStyle = {
  background:"#0a3d91",
  color:"white",
  padding:"14px 28px",
  borderRadius:"8px",
  border:"none",
  fontSize:"16px",
  cursor:"pointer",
  marginRight:"15px",
  marginTop:"15px",
  minWidth:"200px"
}

return (

<div style={{
fontFamily:"Arial",
background:"#f4f6f8",
minHeight:"100vh",
padding:"40px"
}}>

{/* HEADER */}

<div style={{
display:"flex",
alignItems:"center",
gap:"20px"
}}>

<img
src="/logo phi long.png"
style={{
width:"120px",
background:"#ffd400",
padding:"10px"
}}
/>

<div>

<h1 style={{
margin:"0",
color:"#0a3d91"
}}>
CARDIY
</h1>

<p style={{
margin:"0",
color:"#555"
}}>
Trợ Lý Ô Tô Thông Minh
</p>

</div>

</div>


{/* DASHBOARD BUTTONS */}

<div style={{
marginTop:"40px"
}}>

<a href="#">
<button style={btnStyle}>
🚗 Kiểm Tra Xe
</button>
</a>

<a href="#">
<button style={btnStyle}>
🔧 Kiểm Tra Gầm
</button>
</a>

<a href="/phieu_cap_bao_duong.html">
<button style={btnStyle}>
📋 Đặt Lịch Bảo Dưỡng
</button>
</a>

<a href="#">
<button style={btnStyle}>
📘 Blog Kiến Thức
</button>
</a>

<a href="/phieu_cap_bao_duong.html">
<button style={btnStyle}>
🧾 Phiếu Cấp Bảo Dưỡng
</button>
</a>

</div>


{/* FOOTER */}

<div style={{
marginTop:"80px",
color:"#888",
fontSize:"14px"
}}>

CARDIY Automotive Platform  
Phi Long Auto System

</div>

</div>

)

}
