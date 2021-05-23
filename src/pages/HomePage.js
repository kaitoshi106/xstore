import React from 'react';

import { Contact, FeaturedProducts, Introduction, Services } from '../components';

const HomePage = () => {
    return (
        <main>
            <Introduction />
            <FeaturedProducts />
            <Services />
            <Contact />
        </main>
    )
}

export default HomePage;