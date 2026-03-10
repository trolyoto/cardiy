<!DOCTYPE html>
<html>

<head>

<meta charset="UTF-8">

<title>Trợ Lý Ô Tô</title>

<style>

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
color:#FFD400;
font-weight:bold;
font-size:22px;
}

nav a{
color:white;
margin-left:20px;
text-decoration:none;
}

/* HERO */

.hero{
height:420px;
background:linear-gradient(
rgba(0,0,0,0.7),
rgba(0,0,0,0.7)
),
url("https://images.unsplash.com/photo-1503376780353-7e6692767b70");
background-size:cover;
display:flex;
align-items:center;
justify-content:center;
color:white;
text-align:center;
}

.hero h1{
font-size:42px;
}

.hero span{
color:#FFD400;
}

/* MODULE */

.modules{
display:grid;
grid-template-columns:repeat(4,1fr);
gap:20px;
padding:60px;
}

.card{
height:220px;
border-radius:12px;
padding:25px;
color:white;
font-size:22px;
font-weight:bold;
display:flex;
align-items:flex-end;
transition:0.3s;
cursor:pointer;
}

.card:hover{
transform:translateY(-5px);
}

/* CARD COLORS */

.card1{
background:linear-gradient(135deg,#0a3d91,#1e90ff);
}

.card2{
background:linear-gradient(135deg,#111,#444);
}

.card3{
background:linear-gradient(135deg,#0a3d91,#00aaff);
}

.card4{
background:linear-gradient(135deg,#111,#0a3d91);
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
TRỢ LÝ Ô TÔ
</div>

<nav>

<a href="#">Quản lý xe</a>
<a href="#">Sản phẩm</a>
<a href="#">Ưu đãi</a>
<a href="#">Chia sẻ</a>

</nav>

</header>


<div class="hero">

<div>

<h1>Trợ Lý <span>Ô Tô Thông Minh</span></h1>

<p>Kết nối chủ xe và gara chuyên nghiệp</p>

</div>

</div>


<div class="modules">

<div class="card card1">
Mạng lưới đại lý / gara
</div>

<div class="card card2">
Quản lý hồ sơ xe
</div>

<div class="card card3">
Quản lý chi tiêu xe
</div>

<div class="card card4">
Kiến thức xe chuyên sâu
</div>

</div>


<footer>

© 2026 Trợ Lý Ô Tô

</footer>

</body>

</html>
