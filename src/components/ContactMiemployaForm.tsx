import React, { useState } from 'react';

export default function ContactMiemployaForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    companySize: '',
    service: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you! Miemploya HR will contact you shortly via Email or WhatsApp.');
  };

  return (
    <form className="space-y-4 max-w-lg mx-auto justify-text" onSubmit={handleSubmit}>
      <div>
        <label className="block font-medium">Full Name*</label>
        <input name="fullName" type="text" required value={formData.fullName} onChange={handleChange} className="w-full border px-3 py-2" />
      </div>

      <div>
        <label className="block font-medium">Email Address*</label>
        <input name="email" type="email" required value={formData.email} onChange={handleChange} className="w-full border px-3 py-2" />
      </div>

      <div>
        <label className="block font-medium">Phone Number*</label>
        <input name="phone" type="tel" required value={formData.phone} onChange={handleChange} className="w-full border px-3 py-2" />
      </div>

      <div>
        <label className="block font-medium">Company Name*</label>
        <input name="companyName" type="text" required value={formData.companyName} onChange={handleChange} className="w-full border px-3 py-2" />
      </div>

      <div>
        <label className="block font-medium">Company Size*</label>
        <select name="companySize" required value={formData.companySize} onChange={handleChange} className="w-full border px-3 py-2">
          <option value="">Select...</option>
          <option>1-10</option>
          <option>11-25</option>
          <option>26-50</option>
          <option>51-100</option>
          <option>101-200</option>
          <option>201-300</option>
          <option>301-400</option>
          <option>401-500</option>
          <option>501-1000</option>
          <option>1001-5000</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Service Interested In*</label>
        <select name="service" required value={formData.service} onChange={handleChange} className="w-full border px-3 py-2">
          <option value="">Select...</option>
          <option>Outsource payroll only</option>
          <option>Statutory filing Support</option>
          <option>Payment Assistant Miemploya</option>
          <option>All</option>
          <option>Not sure</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Additional Message</label>
        <textarea name="message" rows={4} value={formData.message} onChange={handleChange} className="w-full border px-3 py-2" />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Contact HR</button>

      <div className="pt-4 text-sm text-gray-600">
        You can also reach us directly via Email: <strong>Miemploya@gmail.com</strong> or WhatsApp: <strong>+2349063337173</strong>
      </div>
    </form>
  );
}