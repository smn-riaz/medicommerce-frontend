import React from 'react';

const SectionHeadline = ({headline}:{headline:string}) => {
    return (
        <div className='py-6'>
            <h2 className="text-3xl font-bold text-center">{headline}</h2>
        </div>
    );
};

export default SectionHeadline;