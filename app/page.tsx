export default function Home(){

const menuTitle={
fontSize:"14px",
color:"#999",
marginTop:"25px",
marginBottom:"10px",
fontWeight:"bold"
}

const menuItem={
display:"block",
padding:"10px",
borderRadius:"6px",
color:"#0a3d91",
textDecoration:"none",
marginBottom:"6px",
background:"#ffffff"
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
width:"250px",
background:"#0a3d91",
color:"white",
padding:"25px"
}}>

<h2 style={{marginTop:0}}>
CARDIY
</h2>

<p style={{fontSize:"13px"}}>
Trợ Lý Ô Tô
</p>


{/* SERVICE */}

<div style={menuTitle}>SERVICE</div>

<a href="/kiemtra_xe.html" style={menuItem}>🚗 Kiểm tra xe</a>

<a href="/phieu_kiem_tra_lop.html" style={menuItem}>🛞 Kiểm tra lốp</a>

<a href="/kiemtragam.html" style={menuItem}>🔧 Kiểm tra gầm</a>


{/* WORKSHOP */}

<div style={menuTitle}>WORKSHOP</div>

<a href="/phieunhandichvu.html" style={menuItem}>📄 Phiếu nhận xe</a>

<a href="/phieu_sua_chua.html" style={menuItem}>🛠 Phiếu sửa chữa</a>


{/* CUSTOMER */}

<div style={menuTitle}>CUSTOMER</div>

<a href="/crm_khach_hang.html" style={menuItem}>👥 CRM khách hàng</a>

<a href="/lich_su_xe.html" style={menuItem}>📊 Lịch sử xe</a>


{/* BOOKING */}

<div style={menuTitle}>BOOKING</div>

<a href="/phieu_cap_bao_duong.html" style={menuItem}>📅 Đặt lịch bảo dưỡng</a>


{/* BLOG */}

<div style={menuTitle}>BLOG</div>

<a href="/blog.html" style={menuItem}>✍️ Viết bài chia sẻ</a>

</div>


{/* MAIN CONTENT */}

<div style={{
flex:1,
padding:"40px"
}}>

<h1 style={{color:"#0a3d91"}}>
TRẠM DỊCH VỤ CARDIY
</h1>

<p>
Nền tảng quản lý dịch vụ ô tô – kết nối chủ xe và garage.
</p>


{/* DASHBOARD */}

<div style={{
marginTop:"40px",
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
gap:"25px"
}}>

<a href="/kiemtra_xe.html" style={{textDecoration:"none"}}>
<div style={card}>🚗<br/>Kiểm tra xe</div>
</a>

<a href="/phieu_kiem_tra_lop.html" style={{textDecoration:"none"}}>
<div style={card}>🛞<br/>Kiểm tra lốp</div>
</a>

<a href="/kiemtragam.html" style={{textDecoration:"none"}}>
<div style={card}>🔧<br/>Kiểm tra gầm</div>
</a>

<a href="/phieunhandichvu.html" style={{textDecoration:"none"}}>
<div style={card}>📄<br/>Phiếu nhận xe</div>
</a>

<a href="/phieu_sua_chua.html" style={{textDecoration:"none"}}>
<div style={card}>🛠<br/>Phiếu sửa chữa</div>
</a>

<a href="/crm_khach_hang.html" style={{textDecoration:"none"}}>
<div style={card}>👥<br/>CRM khách hàng</div>
</a>

<a href="/lich_su_xe.html" style={{textDecoration:"none"}}>
<div style={card}>📊<br/>Lịch sử xe</div>
</a>

<a href="/phieu_cap_bao_duong.html" style={{textDecoration:"none"}}>
<div style={card}>📅<br/>Đặt lịch bảo dưỡng</div>
</a>

<a href="/blog.html" style={{textDecoration:"none"}}>
<div style={card}>✍️<br/>Blog chia sẻ</div>
</a>

</div>


</div>

</div>

)

}

const card={
background:"white",
padding:"25px",
borderRadius:"12px",
textAlign:"center",
fontWeight:"bold",
boxShadow:"0 2px 10px rgba(0,0,0,0.1)",
color:"#0a3d91"
}
