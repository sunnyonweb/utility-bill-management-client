// client/src/utils/pdfGenerator.js
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const generateMyBillsReport = (bills, userEmail, totalAmount, totalBills) => {
    const doc = new jsPDF();

    // --- Header and Metadata ---
    doc.setFontSize(18);
    doc.text('Utility Bill Payment History Report', 14, 22);

    doc.setFontSize(11);
    doc.text(`User Email: ${userEmail}`, 14, 32);
    doc.text(`Report Date: ${new Date().toLocaleDateString()}`, 14, 37);

    // --- Totals Summary ---
    doc.setFontSize(12);
    doc.setTextColor(59, 73, 143); // Primary color
    doc.text(`Total Bills Paid: ${totalBills}`, 14, 47);
    doc.text(`Total Amount Spent: ৳${totalAmount.toLocaleString()}`, 14, 52);
    doc.setTextColor(0, 0, 0); // Reset text color

    // --- Prepare Table Data ---
    const tableColumn = ["Username", "Email", "Amount (৳)", "Address", "Phone", "Date Paid"];
    const tableRows = bills.map(bill => [
        bill.username,
        bill.email,
        bill.amount,
        bill.address,
        bill.phone,
        new Date(bill.date).toLocaleDateString(),
    ]);

    // --- AutoTable Generation ---
    doc.autoTable({
        startY: 60, // Start table below the summary
        head: [tableColumn],
        body: tableRows,
        theme: 'striped',
        headStyles: { fillColor: [59, 73, 143] }, // Use your primary color
        margin: { top: 10 }
    });

    // --- Save the PDF ---
    doc.save(`Utility_Report_${userEmail.split('@')[0]}_${new Date().getFullYear()}.pdf`);
};

export default generateMyBillsReport;