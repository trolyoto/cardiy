export default function Home(){

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

const subBtn = {
background:"#ffffff",
color:"#0a3d91",
padding:"10px 20px",
borderRadius:"6px",
border:"2px solid #0a3d91",
fontSize:"15px",
cursor:"pointer",
marginRight:"10px",
marginTop:"10px"
}

return(

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


{/* MENU CHÍNH */}

<div style={{marginTop:"40px"}}>

<button style={btnStyle}>
🚗 Kiểm Tra Xe
</button>

<a href="/phieu_cap_bao_duong.html">
<button style={btnStyle}>
📋 Đặt Lịch Bảo Dưỡng
</button>
</a>

<button style={btnStyle}>
📘 Blog Kiến Thức
</button>

</div>


{/* MODULE KIỂM TRA XE */}

<div style={{marginTop:"30px"}}>

<h3 style={{color:"#0a3d91"}}>
Module Kiểm Tra Xe
</h3>

<a href="/kiemtra_lop.html">
<button style={subBtn}>🛞 Kiểm Tra Lốp</button>
</a>

<a href="/kiemtra_gam.html">
<button style={subBtn}>🔧 Kiểm Tra Gầm</button>
</a>

<a href="/phieu_nhan_xe.html">
<button style={subBtn}>📄 Phiếu Nhận Xe</button>
</a>

<a href="/phieu_sua_chua.html">
<button style={subBtn}>🛠 Phiếu Sửa Chữa</button>
</a>

<a href="/lich_su_xe.html">
<button style={subBtn}>📊 Lịch Sử Xe</button>
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
