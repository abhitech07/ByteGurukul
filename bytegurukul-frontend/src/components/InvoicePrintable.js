// src/components/InvoicePrintable.js
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * Generates a clean PDF invoice from a DOM element.
 * @param {HTMLElement} element - The invoice container you want to export.
 * @param {String} filename - Name of the PDF file.
 */
export async function downloadInvoicePDF(element, filename = "invoice.pdf") {
  if (!element) {
    alert("Invoice DOM not found.");
    return;
  }

  try {
    // convert DOM to image
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff"
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // calculate image dimensions to fit A4 width
    const imgWidth = pageWidth - 10; // margin
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let yPos = 10;

    // if image height exceeds page height, split across pages
    if (imgHeight > pageHeight) {
      let remainingHeight = imgHeight;
      let position = 0;

      while (remainingHeight > 0) {
        pdf.addImage(imgData, "PNG", 5, position === 0 ? 10 : 0, imgWidth, imgHeight);
        remainingHeight -= pageHeight;

        if (remainingHeight > 0) {
          pdf.addPage();
        }
        position -= pageHeight;
      }
    } else {
      pdf.addImage(imgData, "PNG", 5, yPos, imgWidth, imgHeight);
    }

    pdf.save(filename);
  } catch (error) {
    console.error("PDF Export Error:", error);
    alert("Failed to export invoice PDF.");
  }
}