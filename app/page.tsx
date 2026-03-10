export default function Home(){
export default function Home(){

const card = {
background:"white",
borderRadius:"12px",
padding:"25px",
textAlign:"center",
cursor:"pointer",
boxShadow:"0 2px 8px rgba(0,0,0,0.1)",
transition:"0.2s",
fontSize:"16px",
fontWeight:"bold"
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
gap:"20px",
marginBottom:"40px"
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
margin:0,
color:"#0a3d91"
}}>
CARDIY
</h1>

<p style={{
margin:0,
color:"#666"
}}>
Trợ Lý Ô Tô Thông Minh
</p>

</div>

</div>

const menuTitle={
fontSize:"13px",
color:"#aaa",
marginTop:"20px",
marginBottom:"8px",
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

<h2>CARDIY</h2>
<p style={{fontSize:"13px"}}>Trợ Lý Ô Tô</p>


<div style={menuTitle}>SERVICE</div>

<a href="/kiemtra_xe.html" style={menuItem}>🚗 Kiểm tra xe</a>
<a href="/phieu_kiem_tra_lop.html" style={menuItem}>🛞 Kiểm tra lốp</a>
<a href="/kiemtragam.html" style={menuItem}>🔧 Kiểm tra gầm</a>


<div style={menuTitle}>WORKSHOP</div>

<a href="/phieunhandichvu.html" style={menuItem}>📄 Phiếu nhận xe</a>
<a href="/phieu_sua_chua.html" style={menuItem}>🛠 Phiếu sửa chữa</a>


<div style={menuTitle}>CUSTOMER</div>

<a href="/crm_khach_hang.html" style={menuItem}>👥 CRM khách hàng</a>
<a href="/lich_su_xe.html" style={menuItem}>📊 Lịch sử xe</a>


<div style={menuTitle}>BOOKING</div>

<a href="/phieu_cap_bao_duong.html" style={menuItem}>📅 Đặt lịch bảo dưỡng</a>


<div style={menuTitle}>BLOG</div>

<a href="/blog.html" style={menuItem}>✍️ Viết bài chia sẻ</a>

</div>


{/* MAIN */}

<div style={{flex:1,padding:"40px"}}>

<h1 style={{color:"#0a3d91"}}>
TRẠM DỊCH VỤ CARDIY
</h1>

<p>Nền tảng quản lý dịch vụ ô tô.</p>

</div>

</div>

)

}
