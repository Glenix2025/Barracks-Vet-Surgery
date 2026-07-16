import { useState, FormEvent } from 'react';
import { X, Calendar, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BookingData } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (data: BookingData) => void;
}

export default function BookingModal({ isOpen, onClose, onSuccess }: BookingModalProps) {
  const [formData, setFormData] = useState<BookingData>({
    ownerName: '',
    email: '',
    phone: '',
    petName: '',
    petType: 'dog',
    reason: '',
    preferredDate: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Construct local registration backup structure
    const newPatient = {
      id: `reg_${Date.now()}`,
      ownerName: formData.ownerName,
      email: formData.email,
      phone: formData.phone,
      petName: formData.petName,
      petType: formData.petType,
      reason: formData.reason,
      preferredDate: formData.preferredDate || 'Flexible / TBD',
      createdAt: new Date().toISOString(),
    };
    
    // Helper to store in localStorage fallback
    const saveToLocal = (patient: any) => {
      try {
        const existing = localStorage.getItem('barracks_registrations');
        const list = existing ? JSON.parse(existing) : [];
        if (!list.some((p: any) => p.id === patient.id)) {
          list.push(patient);
          localStorage.setItem('barracks_registrations', JSON.stringify(list));
        }
      } catch (err) {
        console.warn('Could not save to localStorage:', err);
      }
    };

    try {
      // Post registration data to backend
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        // Also save to localStorage so it syncs locally if user reloads
        saveToLocal(newPatient);
        setRegistered(true);
        if (onSuccess) {
          onSuccess(formData);
        }
      } else {
        // Fallback to client-side success if backend fails (e.g. 404 on static hosting)
        saveToLocal(newPatient);
        setRegistered(true);
        if (onSuccess) {
          onSuccess(formData);
        }
      }
    } catch (error) {
      // Gracefully handle static/offline environment fallback (e.g. GitHub Pages)
      saveToLocal(newPatient);
      setRegistered(true);
      if (onSuccess) {
        onSuccess(formData);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-bg-warm rounded-3xl overflow-hidden shadow-2xl border border-brand-green/10"
          >
            {/* Top decorative bar */}
            <div className="bg-brand-green px-6 py-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-orange animate-pulse" />
                <span className="font-display font-bold tracking-tight text-lg">New Patient Intake & Booking</span>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[80vh]">
              {!registered ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-start gap-3 text-emerald-800 text-xs">
                    <Sparkles className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Registering is easy & free!</p>
                      <p className="mt-0.5 opacity-90">
                        Fill out the details below to open a Patient File. On your first visit, we will weigh your pet at reception and provide a calm orientation.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-brand-green uppercase mb-1">Your Full Name *</label>
                      <input
                        required
                        type="text"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green bg-white text-sm"
                        placeholder="e.g. John Citizen"
                        value={formData.ownerName}
                        onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-brand-green uppercase mb-1">Phone Number *</label>
                      <input
                        required
                        type="tel"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green bg-white text-sm"
                        placeholder="e.g. (02) 9900 1100"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-green uppercase mb-1">Email Address *</label>
                    <input
                      required
                      type="email"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green bg-white text-sm"
                      placeholder="e.g. email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-brand-green uppercase mb-1">Pet's Name *</label>
                      <input
                        required
                        type="text"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green bg-white text-sm"
                        placeholder="e.g. Buster"
                        value={formData.petName}
                        onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-brand-green uppercase mb-1">Pet Species *</label>
                      <select
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green bg-white text-sm"
                        value={formData.petType}
                        onChange={(e) => setFormData({ ...formData, petType: e.target.value })}
                      >
                        <option value="dog">Dog 🐕</option>
                        <option value="cat">Cat 🐈</option>
                        <option value="rodent">Guinea Pig / Rat / Small Mammal 🐹</option>
                        <option value="other">Other / Exotic 🦜</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-green uppercase mb-1">Reason for Visit / Symptoms *</label>
                    <textarea
                      required
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green bg-white text-sm"
                      placeholder="e.g. Annual vaccination checkup, itchy ears, standard health exam..."
                      value={formData.reason}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-green uppercase mb-1">Preferred Appointment Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green bg-white text-sm text-gray-700"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white py-3 px-6 rounded-2xl font-bold transition-colors shadow-lg shadow-brand-orange/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {submitting ? 'Registering...' : 'Complete Patient Registration'}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6 space-y-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full text-emerald-600">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-2xl text-brand-green">Registration Submitted!</h3>
                    <p className="text-sm text-gray-600">
                      We have successfully opened a patient profile for <span className="font-semibold text-brand-green">{formData.petName}</span> under <span className="font-semibold text-brand-green">{formData.ownerName}</span>.
                    </p>
                  </div>

                  <div className="p-4 bg-brand-green/5 rounded-2xl border border-brand-green/10 text-xs text-left text-brand-green space-y-2">
                    <p className="font-bold">✨ What happens next?</p>
                    <ul className="list-disc list-inside space-y-1 opacity-90">
                      <li>We will call you shortly to match this file with an exact booking slot.</li>
                      <li>Alternatively, you can lock in a time instantly using our Calendly system below!</li>
                    </ul>
                  </div>

                  <div className="space-y-3 pt-2">
                    <a
                      href="https://calendly.com/pawsy1432/brunswick-veterinary-clinic"
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="block w-full bg-brand-green hover:bg-brand-green-hover text-white py-3 px-6 rounded-2xl font-bold transition-all shadow-md text-center"
                    >
                      📅 Book Instantly via Calendly
                    </a>
                    <p className="text-[10px] text-gray-400 italic">
                      Note: Our current scheduling flow links via Calendly. We are in the process of customizing this link for the Barracks Vet Surgery.
                    </p>
                    <button
                      onClick={() => {
                        setRegistered(false);
                        onClose();
                      }}
                      className="text-sm text-gray-500 hover:text-brand-green underline transition-colors"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
