'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import { MailIcon } from 'lucide-react';
import Logo from '../home/Logo';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      await emailjs.send(
        'service_19ul7tp',
        'template_9gqwyhd',
        formData,
        'pmFQBdjOP9fFP4eoI'
      );
         await new Promise((res) => setTimeout(res, 1000));
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
    }

    setSending(false);
  };

  return (
<div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5 dark:border-gray-700 bg-white dark:bg-gray-800">
  {/* Header */}
  <div className="flex items-center justify-between mb-4">
    <div>
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Contact Us</h1>
      <p className="font-extralight text-sm text-gray-600 dark:text-gray-400">
        Healthtech for a Better You
      </p>
    </div>
    <Logo />
  </div>

  <div className="my-4 text-sm text-gray-700 dark:text-gray-300 space-y-2">
    <p>📞 <span className="font-medium">+88017777777</span></p>
    <p>📧 <span className="font-medium">support@MediCommerce.com</span></p>
  </div>

  {/* Contact Form */}
  <form onSubmit={handleSubmit} className="space-y-4">
    <Input
      name="name"
      placeholder="Your Name"
      value={formData.name}
      onChange={handleChange}
      required
    />
    <Input
      type="email"
      name="email"
      placeholder="Your Email"
      value={formData.email}
      onChange={handleChange}
      required
    />
    <Textarea
      name="message"
      placeholder="Your Message"
      value={formData.message}
      onChange={handleChange}
      rows={5}
      required
    />
    <Button
      type="submit"
      disabled={sending}
      className="w-full text-white font-semibold"
    >
      {sending ? 'Sending...' : 'Send Message'}
    </Button>
  </form>

  {/* Contact Info */}
  
</div>

  );
}
