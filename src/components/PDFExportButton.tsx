import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';

interface PDFExportButtonProps {
  elementId: string;
  filename?: string;
  employeeName?: string;
}

const PDFExportButton: React.FC<PDFExportButtonProps> = ({ 
  elementId, 
  filename = 'PAYE_Report', 
  employeeName = 'Employee' 
}) => {
  const exportToPDF = async () => {
    try {
      // Import html2canvas and jsPDF dynamically
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).jsPDF;
      
      const element = document.getElementById(elementId);
      if (!element) {
        alert('Content not found for PDF export');
        return;
      }

      // Hide buttons temporarily
      const buttons = element.querySelectorAll('button');
      buttons.forEach(btn => {
        (btn as HTMLElement).style.display = 'none';
      });

      // Generate canvas from HTML
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });

      // Show buttons again
      buttons.forEach(btn => {
        (btn as HTMLElement).style.display = '';
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${filename}_${employeeName}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const printContent = () => {
    const element = document.getElementById(elementId);
    if (!element) {
      alert('Content not found for printing');
      return;
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>PAYE Report - ${employeeName}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .no-print { display: none !important; }
            @media print {
              body { margin: 0; }
              .no-print { display: none !important; }
            }
          </style>
        </head>
        <body>
          ${element.innerHTML}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <div className="flex gap-2">
      <Button onClick={exportToPDF} className="bg-red-600 hover:bg-red-700">
        <Download className="mr-2 h-4 w-4" />
        Export PDF
      </Button>
      <Button onClick={printContent} variant="outline">
        <Printer className="mr-2 h-4 w-4" />
        Print
      </Button>
    </div>
  );
};

export default PDFExportButton;