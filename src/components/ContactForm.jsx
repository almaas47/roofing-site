import { useState } from 'react'
import { useForm, ValidationError } from '@formspree/react'

function ContactForm() {
  const [state, handleFormspreeSubmit] = useForm("mbdwapgd")
  const [form, setForm] = useState({ name: '', phone: '', service: '', message: '' })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <section id="contact" className="px-8 py-20">

      <p className="text-orange-700 text-xs tracking-widest uppercase mb-2">Get in Touch</p>
      <h2 className="text-4xl font-black mb-12">Request an Estimate</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

        <div className="flex flex-col gap-6">
          <div className="flex gap-4 items-start">
            <span className="text-orange-700 text-xl">📞</span>
            <div>
              <div className="text-sm font-semibold mb-1">Phone</div>
              <div className="text-sm text-gray-500">(801) 555-0192</div>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="text-orange-700 text-xl">🕐</span>
            <div>
              <div className="text-sm font-semibold mb-1">Hours</div>
              <div className="text-sm text-gray-500">Mon–Sat, 7am–6pm<br />Emergency line 24/7</div>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="text-orange-700 text-xl">📍</span>
            <div>
              <div className="text-sm font-semibold mb-1">Service Area</div>
              <div className="text-sm text-gray-500">Salt Lake, Utah & Tooele counties</div>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="text-orange-700 text-xl">📜</span>
            <div>
              <div className="text-sm font-semibold mb-1">License</div>
              <div className="text-sm text-gray-500">Utah Contractor #284710<br />Fully bonded & insured</div>
            </div>
          </div>
        </div>

        <div>
          {state.succeeded ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-10 text-center">
              <div className="text-4xl mb-3">✓</div>
              <div className="font-semibold text-green-800 mb-1">We got your request!</div>
              <div className="text-sm text-green-600">Someone will call you within one business day.</div>
            </div>
          ) : (
            <form onSubmit={handleFormspreeSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1">Full name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Smith"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-700"
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-xs mt-1" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1">Phone number</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="(801) 555-0000"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-700"
                />
                <ValidationError prefix="Phone" field="phone" errors={state.errors} className="text-red-500 text-xs mt-1" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1">Service needed</label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-700"
                >
                  <option value="">Select a service...</option>
                  <option>New roof installation</option>
                  <option>Roof repair</option>
                  <option>Gutters</option>
                  <option>Insurance claim</option>
                  <option>Inspection / other</option>
                </select>
                <ValidationError prefix="Service" field="service" errors={state.errors} className="text-red-500 text-xs mt-1" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1">Tell us more (optional)</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Describe your project or any urgent details..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-700 resize-none h-24"
                />
              </div>
              <button
                type="submit"
                disabled={state.submitting}
                className="bg-orange-700 text-white py-3 rounded-lg font-medium hover:bg-orange-800 disabled:opacity-50"
              >
                {state.submitting ? 'Sending...' : 'Send Request →'}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  )
}

export default ContactForm