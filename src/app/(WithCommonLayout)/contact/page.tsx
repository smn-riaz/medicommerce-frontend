import ContactForm from '@/components/contact/ContactForm';
import React from 'react';

const ContactPage = () => {
    return (
        <div className='flex justify-center md:items-center px-4 md:px-8 py-8 lg:py-12 xl:min-h-screen xl:max-w-[1300px] xl:mx-auto'>
            <ContactForm />
        </div>
    );
};

export default ContactPage;