# MVC_ExitExam_2025

```
git clone https://github.com/NongFeen/MVC_ExitExam_2026
cd MVC_ExitExam_2026
npm install
npm run dev
```

แล้วเข้าไปที่

```
localhost:3000
```

Server.js เป็นส่วนของ page ไปได้ทั้งหมดใน server นี้ โดยมี <br />
/home,/dragon,/phonix,/owl เป็นหน้า page html ใช้ในการแสดงผล<br />
/css สำหรับ ไฟล์ css <br />
/pets เป็น Routes ขอ api ในระบบนี้<br />

ใน Files routes/petRoutes.js <br />
จะมี api ต่างๆในการรับข้อมูลไฟล์ โดยมี <br />
GET API <br />
/allpet เพื่อรับ json ของ pet ทั้งหมดที่มี <br />
/findpet/:type เป็นตัวเลือกให้สามารถเลือกดูเฉพาะ typeๆ นั้นได้ <br />
/findpetbyid/:type/:id มีไว้สำหรับหาโดย id ของ pet <br />
/rejected สำหรับดูไฟล์ Rejected ที่มีข้อมูลสัตว์ที่ถูก Rejected <br />
/rejected/:type เลือกดูเฉพาะ typeๆ นั้น <br />

POST API<br />
/addpet เป็นapi ให้รับ pet ใหม่ๆเข้ามา <br />

โดยเมื่อ API เหล่านี้ถูกใช้จะมาที่ petController.js เป็นตัวกลางรับ request จาก user<br />
Method<br />
getAllPet <br />
getPetsByType มีการแปลง type ที่เข้ามาเป็นตัวเล็กเพื่อให้นำไปหาง่าย<br />
getPetById<br />
getAllRejectedPets<br />
getRejectedPetsByType<br />

addPet จะ check type ของ type ก่อน และ input body เป็น json โครงสร้างดังนี้<br />

```json
{
  "type": "phoenix",
  "healthDate": "15/11/2024",
  "vaccineCount": 3,
  "additionalInfo": true
}
```

แล้ว check แยก case ของสัตว์แต่ละประเภทเพื่อแปลง "additionalInfo": true ให้ตรงกับความต้องการของประเภทสัตว์นั้นๆ <br />
phoenix => newPet.fireproof_certificate = true;<br />
groudon => newPet.smoke_pollution_level = pollutionLevel;<br />
owl => newPet.flight_distance_without_food = flightDistance;<br />
แล้วทำการเข้าไป addpet ต่อไปในส่วนของ model<br />

petModel.js เป็นส่วนที่เข้าถึง database Insert,Update,Delete<br />
โดยมี path ต่างของ database ทั้งหมด<br />
readJSON อ่านไฟล์ผ่าน path<br />
getAllPets รวมไฟล์ทั้งหมดแล้ว return<br />
filePath รวม path ให้เป็น array <br />
getPetsByType เอา filePath มาให้แยก type ได้<br />
getPetById เอา type กับ id มาหาข้อมูล pet ตัวนั้น<br />
getFilePathByPetType method ใช้ type แยก path <br />
generatePetId จะสร้าง uniqueID 8 หลักเสมอโดยเอา Math.random()\* 90000000 จะเอา ค่า Random ระหว่า 0-1 มาคูณให้ เลขไม่เกิน 8 หลัก แล้วมา + 10000000 จะทำให้ได้8 หลักเสมอ<br />
ถ้าหาgenerate มาแล้วจะ check เทียบกับ ID ทั้งหมดก่อน แล้วถ้าซ้ำจะวนวร้างใหม่<br />
addNewPet check ข้อมูลตามเกณฑที่ได้กำหนดถ้าไม่ถึงให้ save เข้า rejected<br />
ถ้าผ่านก็ save เข้า database ของสัตว์นั้นๆ<br />
saveRejectedPet<br />
getRejectedPets<br />
getRejectedPetsByType<br />

corsOptions.js สำหรับ method ที่ allow ในการใช้งาน ปรับให้ใช้ได้ทั้งหมด<br />

test
