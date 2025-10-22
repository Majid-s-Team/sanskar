// // DownloadRecords.tsx
// import React from "react";
// import { saveAs } from "file-saver";
// import * as XLSX from "xlsx";
// import Papa from "papaparse";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// type RecordItem = any;

// function flattenRecord(item: RecordItem) {
//   const s = item.student || {};
//   const u = s.user || {};
//   return {
//     record_status: item.status,
//     record_date: item.date,
//     participation_points: item.participation_points,
//     homework_points: item.homework_points,
//     student_id: s.id,
//     user_id: s.user_id,
//     student_first_name: s.first_name,
//     student_last_name: s.last_name,
//     student_dob: s.dob,
//     student_email: s.student_email,
//     student_mobile_number: s.student_mobile_number,
//     school_name: s.school_name,
//     is_payment_done_student: s.is_payment_done,
//     student_profile_image: s.profile_image,
//     student_created_at: s.created_at,
//     student_updated_at: s.updated_at,
//     parent_primary_email: u.primary_email,
//     parent_mobile_number: u.mobile_number,
//     parent_father_name: u.father_name,
//     parent_mother_name: u.mother_name,
//     parent_city: u.city,
//     parent_state: u.state,
//     parent_zip_code: u.zip_code,
//     parent_is_active: u.is_active,
//     parent_is_payment_done: u.is_payment_done,
//   };
// }

// /* CSV */
// export function downloadCSV(records: RecordItem[], filename = "records.csv") {
//   const flat = records.map(flattenRecord);
//   const csv = Papa.unparse(flat);
//   const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//   saveAs(blob, filename);
// }

// /* XLSX */
// export function downloadXLSX(records: RecordItem[], filename = "records.xlsx") {
//   const flat = records.map(flattenRecord);
//   const ws = XLSX.utils.json_to_sheet(flat);
//   const wb = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, ws, "Records");
//   const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//   saveAs(new Blob([wbout], { type: "application/octet-stream" }), filename);
// }

// /* PDF */
// export function downloadPDF(records: RecordItem[], filename = "records.pdf") {
//   const flat = records.map(flattenRecord);

//   const doc = new jsPDF({ unit: "pt", format: "a4" });
//   const columns = Object.keys(flat[0] || {}).map((k) => ({
//     header: k,
//     dataKey: k,
//   }));
//   // autoTable will create a multi-page table automatically
//   (doc as any).autoTable({
//     head: [columns.map((c) => c.header)],
//     body: flat.map((row) => columns.map((c) => String(row[c.dataKey] ?? ""))),
//     styles: { fontSize: 8 },
//     startY: 40,
//     margin: { left: 20, right: 20 },
//     headStyles: { fillColor: [40, 100, 200] },
//   });
//   doc.save(filename);
// }

// /* React component: pass 'records' prop */
// export default function DownloadRecords({
//   records,
// }: {
//   records: RecordItem[];
// }) {
//   const hasRecords = Array.isArray(records) && records.length > 0;

//   return (
//     <div className="flex gap-2 items-center">
//       <button
//         className="px-3 py-2 bg-sky-600 text-white rounded shadow-sm text-sm"
//         onClick={() =>
//           hasRecords && downloadCSV(records, `records_${Date.now()}.csv`)
//         }
//         disabled={!hasRecords}
//       >
//         Download CSV
//       </button>

//       <button
//         className="px-3 py-2 bg-green-600 text-white rounded shadow-sm text-sm"
//         onClick={() =>
//           hasRecords && downloadXLSX(records, `records_${Date.now()}.xlsx`)
//         }
//         disabled={!hasRecords}
//       >
//         Download XLSX
//       </button>

//       <button
//         className="px-3 py-2 bg-gray-800 text-white rounded shadow-sm text-sm"
//         onClick={() =>
//           hasRecords && downloadPDF(records, `records_${Date.now()}.pdf`)
//         }
//         disabled={!hasRecords}
//       >
//         Download PDF
//       </button>
//     </div>
//   );
// }
