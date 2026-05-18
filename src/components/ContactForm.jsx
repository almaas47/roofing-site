import { useState } from 'react'
import { useForm, ValidationError } from '@formspree/react'

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || 'mbdwapgd'

function ContactForm() {
  const [state, handleFormspreeSubmit] = useForm(FORMSPREE_ID)
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
            <span className="text-orange-700 text-xl mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
            </span>
            <div>
              <div className="text-sm font-semibold mb-1">Phone</div>
              <div className="text-sm text-gray-500">(801) 555-0192</div>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="text-orange-700 text-xl mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </span>
            <div>
              <div className="text-sm font-semibold mb-1">Hours</div>
              <div className="text-sm text-gray-500">Mon–Sat, 7am–6pm<br />Emergency line 24/7</div>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="text-orange-700 text-xl mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            </span>
            <div>
              <div className="text-sm font-semibold mb-1">Service Area</div>
              <div className="text-sm text-gray-500">Salt Lake, Utah &amp; Tooele counties</div>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="text-orange-700 text-xl mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
            </span>
            <div>
              <div className="text-sm font-semibold mb-1">License</div>
              <div className="text-sm text-gray-500">Utah Contractor #284710<br />Fully bonded &amp; insured</div>
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
                <label className="text-xs font-semibold text-gray-500 block mb-1">Full name *</label>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Smith"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-700"
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-xs mt-1" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1">Phone number *</label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="(801) 555-0000"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-700"
                />
                <ValidationError prefix="Phone" field="phone" errors={state.errors} className="text-red-500 text-xs mt-1" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1">Service needed *</label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
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
                className="bg-orange-700 text-white py-3 rounded-lg font-medium hover:bg-orange-800 disabled:opacity-50 transition-colors"
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
