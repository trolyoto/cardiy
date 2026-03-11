"use client";

import { useState } from "react";

export default function Home() {

const [page,setPage] = useState(
"https://trolyoto.github.io/phieukiemtra/baoduong.html"
)

return (

<div style={{display:"flex",fontFamily:"Arial"}}>

{/* SIDEBAR */}

<div style={{
width:"250px",
background:"#1e4a8d",
color:"white",
height:"100vh",
padding:"20px"
}}>

<h2>CARDIY</h2>
<p style={{fontSize:"12px"}}>Trợ Lý Ô Tô</p>

<hr/>

<h4>SERVICE</h4>

<div style={menu} onClick={()=>setPage("https://trolyoto.github.io/phieukiemtra/baoduong.html")}>
🚗 Kiểm tra xe
</div>

<div style={menu} onClick={()=>setPage("https://trolyoto.github.io/phieukiemtra/Phieukiemlop2.html")}>
🛞 Kiểm tra lốp
</div>

<div style={menu} onClick={()=>setPage("https://trolyoto.github.io/phieukiemtra/kiemtragam.html")}>
🔧 Kiểm tra gầm
</div>

<hr/>

<h4>WORKSHOP</h4>

<div style={menu} onClick={()=>setPage("https://trolyoto.github.io/phieukiemtra/phieunhandichvu.html")}>
📄 Phiếu nhận xe
</div>

<div style={menu}>
🛠 Phiếu sửa chữa
</div>

<hr/>

<h4>CUSTOMER</h4>

<div style={menu}>👥 CRM khách hàng</div>

<div style={menu}>📊 Lịch sử xe</div>

<hr/>

<h4>BOOKING</h4>

<div style={menu}>📅 Đặt lịch bảo dưỡng</div>

<hr/>

<h4>BLOG</h4>

<div style={menu}>✍️ Viết bài chia sẻ</div>

</div>



{/* MAIN */}

<div style={{
flex:1,
padding:"30px",
background:"#f4f6fb"
}}>

<h2>TRẠM DỊCH VỤ CARDIY</h2>
<p style={{color:"#666"}}>
Nền tảng quản lý dịch vụ ô tô
</p>


{/* FORM */}

<iframe
src={page}
style={{
width:"100%",
height:"900px",
border:"none",
borderRadius:"10px",
background:"white",
boxShadow:"0 10px 30px rgba(0,0,0,0.1)"
}}
/>

</div>

</div>

)

}

const menu = {
background:"white",
color:"#333",
padding:"10px",
borderRadius:"8px",
marginTop:"10px",
cursor:"pointer"
}
