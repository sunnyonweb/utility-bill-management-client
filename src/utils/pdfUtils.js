
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 
export const generatePDF = (bills, userName, userEmail, totalAmount) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Paid Bills Report", 14, 22);

  doc.setFontSize(12);
  doc.text(`Name: ${userName}`, 14, 32);
  doc.text(`Email: ${userEmail}`, 14, 40);
  doc.text(`Total Amount: ${totalAmount.toLocaleString()}$`, 14, 48);

  const tableData = bills.map((bill, idx) => [
    idx + 1,
    bill.username,
    bill.email,
    `${bill.amount.toLocaleString()}$`,
    new Date(bill.date).toLocaleDateString(),
  ]);

  
  autoTable(doc, {
    startY: 55,
    head: [["#", "Username", "Email", "Amount", "Date"]],
    body: tableData,
  });

  doc.save("paid-bills-report.pdf");
};
