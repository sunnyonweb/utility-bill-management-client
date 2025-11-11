import jsPDF from "jspdf";
import "jspdf-autotable";

export const generatePDF = (bills) => {
  if (!bills || bills.length === 0) {
    alert("No bills to generate PDF!");
    return;
  }

  const doc = new jsPDF();

  // Add title
  doc.setFontSize(18);
  doc.text("My Paid Bills Report", 14, 22);

  // Optional: add email if available
  if (bills[0].email) {
    doc.setFontSize(12);
    doc.text(`Email: ${bills[0].email}`, 14, 30);
  }

  // Table headers and rows
  const tableColumn = ["Category", "Amount", "Date"];
  const tableRows = [];

  let totalAmount = 0;

  bills.forEach((bill) => {
    tableRows.push([
      bill.category,
      bill.amount,
      new Date(bill.date).toLocaleDateString(),
    ]);
    totalAmount += bill.amount;
  });

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 40,
  });

  doc.text(`Total Amount Paid: $${totalAmount}`, 14, doc.lastAutoTable.finalY + 10);

  // Save PDF
  doc.save("my_bills_report.pdf");
};
