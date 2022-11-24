import React, { useEffect, useState } from 'react';
import Category from './Category';

const Products = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, []);

    return (
        <section className='my-32'>
            <h2 className='text-3xl font-bold text-center mb-10 text-secondary'>SHOP BY CATEGORY</h2>
            <div className='grid items-center gap-4 lg:grid-cols-3'>
                {
                    categories.map((category, idx) => <Category 
                            key={idx} 
                            category={category}
                        ></Category>)
                }
            </div>
        </section>
    );
};

export default Products;