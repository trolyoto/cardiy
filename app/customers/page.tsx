"use client";
import { useState, useEffect } from "react";

export default function Customers() {

const [list,setList] = useState<any[]>([]);
const [name,setName] = useState("");
const [phone,setPhone] = useState("");
const [search,setSearch] = useState("");

useEffect(()=>{
const data = localStorage.getItem("customers");
if(data) setList(JSON.parse(data));
},[]);

useEffect(()=>{
localStorage.setItem("customers", JSON.stringify(list));
},[list]);

const add = ()=>{
if(!phone) return alert("Nhập SĐT");

setList([...list,{name,phone}]);

setName("");
setPhone("");
};

const filtered = list.filter(c =>
c.name?.toLowerCase().includes(search.toLowerCase()) ||
c.phone.includes(search)
);

return (
<div style={{padding:20}}>

<h1>👥 Danh sách Khách Hàng</h1>

{/* FORM */}
<div style={{background:"#111",padding:20,borderRadius:10}}>

<input
placeholder="Tên khách"
value={name}
onChange={e=>setName(e.target.value)}
/>

<input
placeholder="SĐT"
value={phone}
onChange={e=>setPhone(e.target.value)}
/>

<button onClick={add}>➕ Thêm khách</button>

</div>

<br/>

{/* SEARCH */}
<input
placeholder="🔍 Tìm khách..."
value={search}
onChange={e=>setSearch(e.target.value)}
/>

<br/><br/>

{/* TABLE */}
<div style={{background:"#111",padding:20,borderRadius:10}}>

<h2>📋 Danh sách</h2>

<table style={{width:"100%"}}>
<thead>
<tr>
<th>Tên</th>
<th>SĐT</th>
</tr>
</thead>

<tbody>
{filtered.map((c,i)=>(
<tr key={i}>
<td>{c.name}</td>
<td>{c.phone}</td>
</tr>
))}
</tbody>
</table>

</div>

</div>
);
}
