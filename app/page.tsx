<!DOCTYPE html>
<html lang="vi">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Phiếu Kiểm Tra Gầm</title>

<script src="https://cdn.tailwindcss.com"></script>

<style>

body{
background:#f3f4f6;
font-family:Segoe UI;
padding:20px;
}

textarea{
width:100%;
border:1px solid #ccc;
border-radius:4px;
padding:4px;
}

table{
width:100%;
border-collapse:collapse;
margin-top:15px;
}

th,td{
border:1px solid #444;
padding:6px;
}

th{
background:#fde68a;
}

.section-title{
font-weight:bold;
margin-top:20px;
margin-bottom:8px;
font-size:18px;
}

</style>

</head>

<body>

<div class="max-w-6xl mx-auto bg-white p-6 shadow rounded">

<header class="flex items-center justify-between mb-6">

<img src="https://trolyoto.github.io/phieukiemtra/logophilong.jpg"
style="height:70px">

<h1 class="text-2xl font-bold">
PHIẾU KIỂM TRA GẦM XE
</h1>

</header>


<form id="inspectionForm"
action="https://script.google.com/macros/s/AKfycbzE44UQR_Mu1M9vAxnY6SmrHq-2hTPIr1I-0rpTztwPoN-PoEL0psVLvXb8HY746mRz/exec"
method="POST">

<input type="hidden" name="formType" value="PhieuKiemTraGam">


<div class="section-title">I. THÔNG TIN XE</div>

<div class="grid grid-cols-4 gap-3">

<input name="licensePlate" placeholder="Biển số">

<input name="hangXe" placeholder="Hãng xe">

<input name="namSX" placeholder="Năm sản xuất">

<input name="km" placeholder="Km hiện tại">

<input type="date" name="receiveDate">

<input name="ktv" placeholder="Kỹ thuật viên">

</div>


<div class="section-title">II. KIỂM TRA HỆ THỐNG</div>


<table>

<tr>

<th>Hạng mục</th>
<th>Bình thường</th>
<th>Theo dõi</th>
<th>Cần sửa</th>
<th>Ghi chú</th>

</tr>

<tr>
<td>Giảm xóc trước</td>
<td><input type="checkbox" name="shock_front_ok"></td>
<td><input type="checkbox" name="shock_front_watch"></td>
<td><input type="checkbox" name="shock_front_fix"></td>
<td><textarea name="shock_front_note"></textarea></td>
</tr>

<tr>
<td>Giảm xóc sau</td>
<td><input type="checkbox" name="shock_rear_ok"></td>
<td><input type="checkbox" name="shock_rear_watch"></td>
<td><input type="checkbox" name="shock_rear_fix"></td>
<td><textarea name="shock_rear_note"></textarea></td>
</tr>

<tr>
<td>Bát bèo giảm xóc</td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><textarea></textarea></td>
</tr>

<tr>
<td>Lò xo / thanh xoắn</td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><textarea></textarea></td>
</tr>

<tr>
<td>Rotuyn lái trong</td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><textarea></textarea></td>
</tr>

<tr>
<td>Rotuyn lái ngoài</td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><textarea></textarea></td>
</tr>

<tr>
<td>Rotuyn trụ đứng</td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><textarea></textarea></td>
</tr>

<tr>
<td>Rotuyn càng A</td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><textarea></textarea></td>
</tr>

<tr>
<td>Càng A trên</td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><textarea></textarea></td>
</tr>

<tr>
<td>Càng A dưới</td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><textarea></textarea></td>
</tr>

<tr>
<td>Cao su càng A</td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><textarea></textarea></td>
</tr>

<tr>
<td>Rotuyn cân bằng</td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><textarea></textarea></td>
</tr>

<tr>
<td>Cao su thanh cân bằng</td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><textarea></textarea></td>
</tr>

<tr>
<td>Thanh cân bằng</td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><textarea></textarea></td>
</tr>

<tr>
<td>Thước lái</td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><textarea></textarea></td>
</tr>

<tr>
<td>Khớp trục lái</td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><textarea></textarea></td>
</tr>

<tr>
<td>Đầu láp trong</td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><textarea></textarea></td>
</tr>

<tr>
<td>Đầu láp ngoài</td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><textarea></textarea></td>
</tr>

<tr>
<td>Chụp bụi láp</td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><textarea></textarea></td>
</tr>

<tr>
<td>Chốt trượt phanh</td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><textarea></textarea></td>
</tr>

<tr>
<td>Đĩa phanh</td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><textarea></textarea></td>
</tr>

<tr>
<td>Bu lông – ốc gầm</td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><input type="checkbox"></td>
<td><textarea></textarea></td>
</tr>

</table>


<div class="mt-6 flex gap-4">

<button type="button"
onclick="window.print()"
class="bg-blue-500 text-white px-4 py-2 rounded">
In phiếu
</button>

<button type="submit"
class="bg-green-600 text-white px-4 py-2 rounded">
Gửi Google Sheet
</button>

</div>

</form>

</div>

</body><!-- HEADER -->
<div class="bg-white shadow mb-6 rounded p-4 flex items-center justify-between">

    <div class="flex items-center gap-3">
        <img src="https://cdn-icons-png.flaticon.com/512/743/743922.png" style="height:40px;">
        <div>
            <div class="font-bold text-lg">CARDIY</div>
            <div class="text-sm text-gray-500">Trợ lý ô tô thông minh</div>
        </div>
    </div>

    <button class="bg-yellow-400 px-4 py-2 rounded font-semibold">
        Đặt lịch bảo dưỡng
    </button>

</div>


<!-- HERO SECTION -->
<div class="bg-gradient-to-r from-yellow-100 to-yellow-50 p-6 rounded mb-6 shadow">

    <h2 class="text-xl font-bold mb-2">
        Kiểm tra gầm xe chuyên sâu
    </h2>

    <p class="text-gray-600 mb-4">
        Đảm bảo an toàn – phát hiện sớm hư hỏng – tối ưu chi phí sửa chữa
    </p>

    <div class="flex gap-3">
        <div class="bg-white p-3 rounded shadow text-center flex-1">
            🚗 <br>
            <span class="text-sm">Kiểm tra 20+ hạng mục</span>
        </div>

        <div class="bg-white p-3 rounded shadow text-center flex-1">
            ⚡ <br>
            <span class="text-sm">Nhanh & chính xác</span>
        </div>

        <div class="bg-white p-3 rounded shadow text-center flex-1">
            🛠️ <br>
            <span class="text-sm">Chuẩn kỹ thuật</span>
        </div>
    </div>

</div>


<!-- QUICK ACTION -->
<div class="grid grid-cols-3 gap-4 mb-6">

    <div class="bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer">
        <div class="font-semibold">Quản lý xe</div>
        <div class="text-sm text-gray-500">Thêm xe, lịch sử</div>
    </div>

    <div class="bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer">
        <div class="font-semibold">Đặt lịch</div>
        <div class="text-sm text-gray-500">Đặt nhanh</div>
    </div>

    <div class="bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer">
        <div class="font-semibold">Nhắc bảo dưỡng</div>
        <div class="text-sm text-gray-500">Tự động</div>
    </div>

</div>
</html>
