import React from "react";

const ContactUs = () => {
  return (
    <section className="bg-gray-50 py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-blue-700 mb-4">Get in Touch</h2>
        <p className="text-gray-600 mb-10 text-lg max-w-2xl mx-auto">
          We'd love to hear from you! If you have questions, suggestions, or business inquiries, feel free to contact us through the details below.
        </p>

        <div className="bg-white shadow-lg rounded-xl p-8 text-left border border-gray-200 max-w-2xl mx-auto space-y-6">
          <div className="flex items-start gap-4">
            <span className="text-blue-600 text-2xl">📧</span>
            <div>
              <p className="font-semibold text-gray-800">Email</p>
              <p className="text-gray-600">haroonashraf265@gmail.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="text-blue-600 text-2xl">📞</span>
            <div>
              <p className="font-semibold text-gray-800">Phone</p>
              <p className="text-gray-600">+923137386619</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="text-blue-600 text-2xl">📍</span>
            <div>
              <p className="font-semibold text-gray-800">Location</p>
              <p className="text-gray-600">Samundri, Faisalabad</p>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-10">
          Response time: within 24 hours during business days.
        </p>
      </div>
    </section>
  );
};

export default ContactUs;
