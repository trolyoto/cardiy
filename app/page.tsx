export default function Home(){

const card={
background:"white",
padding:"25px",
borderRadius:"12px",
boxShadow:"0 2px 12px rgba(0,0,0,0.08)",
textAlign:"center",
fontWeight:"bold",
color:"#0a3d91",
cursor:"pointer"
}

return(

<div style={{
display:"flex",
fontFamily:"Arial",
background:"#f4f6f8",
minHeight:"100vh"
}}>

{/* SIDEBAR */}

<div style={{
width:"240px",
background:"#0a3d91",
color:"white",
padding:"25px"
}}>

<h2>CARDIY</h2>
<p style={{fontSize:"13px"}}>Trợ Lý Ô Tô</p>

<hr/>

<p>🚗 SERVICE</p>

<a href="/kiemtra_xe.html" style={menu}>Kiểm tra xe</a>
<a href="/phieu_kiem_tra_lop.html" style={menu}>Kiểm tra lốp</a>
<a href="/kiemtragam.html" style={menu}>Kiểm tra gầm</a>

<p style={{marginTop:"20px"}}>🛠 WORKSHOP</p>

<a href="/phieunhandichvu.html" style={menu}>Phiếu nhận xe</a>
<a href="/phieu_sua_chua.html" style={menu}>Phiếu sửa chữa</a>

<p style={{marginTop:"20px"}}>👥 CUSTOMER</p>

<a href="/crm_khach_hang.html" style={menu}>CRM khách hàng</a>
<a href="/lich_su_xe.html" style={menu}>Lịch sử xe</a>

<p style={{marginTop:"20px"}}>📅 BOOKING</p>

<a href="/phieu_cap_bao_duong.html" style={menu}>Đặt lịch bảo dưỡng</a>

<p style={{marginTop:"20px"}}>✍️ BLOG</p>

<a href="/blog.html" style={menu}>Viết bài chia sẻ</a>

</div>


{/* MAIN */}

<div style={{flex:1,padding:"40px"}}>

<h1 style={{color:"#0a3d91"}}>
TRẠM DỊCH VỤ CARDIY
</h1>

<p>Trợ lý thông minh cho gara và chủ xe.</p>


{/* THỐNG KÊ */}

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
gap:"20px",
marginTop:"30px"
}}>

<div style={{...card,background:"#4f46e5",color:"white"}}>
🚗
<br/><br/>
Xe đang sửa
<br/>
<h2>5</h2>
</div>

<div style={{...card,background:"#22c55e",color:"white"}}>
📅
<br/><br/>
Lịch hôm nay
<br/>
<h2>8</h2>
</div>

<div style={{...card,background:"#f59e0b",color:"white"}}>
💰
<br/><br/>
Doanh thu ngày
<br/>
<h2>12M</h2>
</div>

<div style={{...card,background:"#ef4444",color:"white"}}>
⚠️
<br/><br/>
Xe cần bảo dưỡng
<br/>
<h2>6</h2>
</div>

</div>


{/* MODULE CHỨC NĂNG */}

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
gap:"20px",
marginTop:"40px"
}}>

<a href="/kiemtra_xe.html" style={{textDecoration:"none"}}>
<div style={card}>
🚗<br/><br/>Kiểm tra xe
</div>
</a>

<a href="/phieu_kiem_tra_lop.html" style={{textDecoration:"none"}}>
<div style={card}>
🛞<br/><br/>Kiểm tra lốp
</div>
</a>

<a href="/kiemtragam.html" style={{textDecoration:"none"}}>
<div style={card}>
🔧<br/><br/>Kiểm tra gầm
</div>
</a>

<a href="/phieunhandichvu.html" style={{textDecoration:"none"}}>
<div style={card}>
📄<br/><br/>Phiếu nhận xe
</div>
</a>

<a href="/phieu_sua_chua.html" style={{textDecoration:"none"}}>
<div style={card}>
🛠<br/><br/>Phiếu sửa chữa
</div>
</a>

<a href="/crm_khach_hang.html" style={{textDecoration:"none"}}>
<div style={card}>
👥<br/><br/>CRM khách hàng
</div>
</a>

<a href="/lich_su_xe.html" style={{textDecoration:"none"}}>
<div style={card}>
📊<br/><br/>Lịch sử xe
</div>
</a>

<a href="/phieu_cap_bao_duong.html" style={{textDecoration:"none"}}>
<div style={card}>
📅<br/><br/>Đặt lịch bảo dưỡng
</div>
</a>

<a href="/blog.html" style={{textDecoration:"none"}}>
<div style={card}>
✍️<br/><br/>Blog chia sẻ
</div>
</a>

</div>

</div>

</div>

)

}

const menu={
display:"block",
padding:"8px",
color:"white",
textDecoration:"none",
fontSize:"14px"
}
