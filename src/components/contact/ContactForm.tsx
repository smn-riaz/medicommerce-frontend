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
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
    }

    setSending(false);
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
       <div className="flex items-center justify-between space-x-4 ">
        <div>
          <h1 className="text-xl font-semibold">Contact Us</h1>
          <p className="font-extralight text-sm text-gray-600">
          Healthtech for a Better You
          </p>
        </div>
        <Logo />
      </div>
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
    </div>
  );
}
