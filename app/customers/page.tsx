"use client";
import { useState, useEffect } from "react";

export default function Customers() {
const [list,setList] = useState<any[]>([]);
const [name,setName] = useState("");
const [phone,setPhone] = useState("");

useEffect(()=>{
const data = localStorage.getItem("customers");
if(data) setList(JSON.parse(data));
},[]);

useEffect(()=>{
localStorage.setItem("customers", JSON.stringify(list));
},[list]);

const add = ()=>{
if(!phone) return;
setList([...list,{name,phone}]);
setName(""); setPhone("");
};

return (
<div style={{padding:20}}>
<h1>👥 Khách hàng</h1>

<input placeholder="Tên" value={name} onChange={e=>setName(e.target.value)} />
<input placeholder="SĐT" value={phone} onChange={e=>setPhone(e.target.value)} />

<button onClick={add}>Thêm</button>

<hr/>

{list.map((c,i)=>(
<div key={i}>{c.name} - {c.phone}</div>
))}
</div>
);
}
