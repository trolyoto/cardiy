<!DOCTYPE html>
<html lang="vi">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">

<title>CARDIY - Trợ Lý Ô Tô</title>

<style>

/* GENERAL */

body{
margin:0;
font-family:Arial;
background:#f4f6f8;
}

/* HEADER */

header{
background:#111;
color:white;
padding:15px 40px;
display:flex;
justify-content:space-between;
align-items:center;
}

.logo{
font-size:22px;
font-weight:bold;
color:#FFD400;
}

nav a{
color:white;
margin-left:25px;
text-decoration:none;
}

nav a:hover{
color:#FFD400;
}

/* HERO */

.hero{
height:420px;
background:linear-gradient(
rgba(0,0,0,0.8),
rgba(0,0,0,0.8)
),
url("https://images.unsplash.com/photo-1503376780353-7e6692767b70");
background-size:cover;
display:flex;
align-items:center;
justify-content:center;
text-align:center;
color:white;
}

.hero h1{
font-size:40px;
}

.hero span{
color:#FFD400;
}

/* CAR ANIMATION */

.road{
width:100%;
height:120px;
background:#222;
overflow:hidden;
position:relative;
}

.car{
width:200px;
position:absolute;
bottom:10px;
animation:drive 10s linear infinite;
}

@keyframes drive{
0%{left:-200px}
100%{left:100%}
}

/* DASHBOARD */

.dashboard{
padding:60px;
display:grid;
grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
gap:25px;
}

.card{
background:white;
border-radius:12px;
padding:30px;
box-shadow:0 10px 20px rgba(0,0,0,0.1);
text-align:center;
font-size:20px;
font-weight:bold;
color:#0a3d91;
cursor:pointer;
transition:0.3s;
}

.card:hover{
transform:translateY(-6px);
}

/* CRM TABLE */

.crm{
padding:60px;
}

table{
width:100%;
border-collapse:collapse;
background:white;
box-shadow:0 5px 10px rgba(0,0,0,0.1);
}

th{
background:#0a3d91;
color:white;
padding:12px;
}

td{
padding:10px;
border-bottom:1px solid #ddd;
}

/* MAINTENANCE */

.maintenance{
padding:60px;
display:grid;
grid-template-columns:repeat(3,1fr);
gap:20px;
}

.reminder{
background:#FFD400;
padding:25px;
border-radius:10px;
text-align:center;
font-weight:bold;
}

/* FOOTER */

footer{
background:#111;
color:white;
padding:30px;
text-align:center;
}

</style>

</head>

<body>

<header>

<div class="logo">
CARDIY
</div>

<nav>

<a href="#">Dashboard</a>
<a href="#">Gara</a>
<a href="#">CRM</a>
<a href="#">Booking</a>
<a href="#">Blog</a>

</nav>

</header>


<div class="hero">

<div>

<h1>Trợ Lý <span>Ô Tô Thông Minh</span></h1>

<p>Hệ sinh thái quản lý xe và gara</p>

</div>

</div>


<div class="road">

<img class="car"
src="https://cdn.pixabay.com/photo/2013/07/13/10/07/car-156106_1280.png">

</div>


<section class="dashboard">

<div class="card">
<a href="/phieu/index.html">
  🚗 Kiểm tra xe
</a>
</div>

<div class="card">
🛞 <a href="/phieu/phieu_kiem_tra_lop.html">
  🛞 Kiểm tra lốp
</a>

<div class="card">
🔧 <a href="/phieu/kiemtragam.html">
  🔧 Kiểm tra gầm
</a>
</div>

<div class="card">
📄 Phiếu nhận xe
</div>

<div class="card">
🛠 Phiếu sửa chữa
</div>

<div class="card">
📅 Đặt lịch bảo dưỡng
</div>

</section>


<section class="crm">

<h2>CRM Khách Hàng</h2>

<table>

<tr>
<th>Tên</th>
<th>SĐT</th>
<th>Xe</th>
<th>Doanh thu</th>
</tr>

<tr>
<td>Nguyễn Văn A</td>
<td>0901234567</td>
<td>Toyota Vios</td>
<td>5.000.000</td>
</tr>

<tr>
<td>Trần Văn B</td>
<td>0912345678</td>
<td>Kia Seltos</td>
<td>8.000.000</td>
</tr>

</table>

</section>


<section class="maintenance">

<div class="reminder">
🔔 Bảo dưỡng 5000 km
</div>

<div class="reminder">
🔔 Bảo dưỡng 10000 km
</div>

<div class="reminder">
🔔 Bảo dưỡng 20000 km
</div>

</section>


<footer>

© 2026 CARDIY - Trợ Lý Ô Tô

</footer>


</body>

</html>
