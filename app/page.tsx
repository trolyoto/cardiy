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

</body>
</html>
