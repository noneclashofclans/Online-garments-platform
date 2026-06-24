import React from 'react'
import Navbar from '../components/Navbar'
import './Dresses.css'
import { useNavigate } from 'react-router-dom'

const Dresses = () => {
  const navigate = useNavigate();

  const mensCollection = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
      name: 'Casual T-Shirt',
      price: 999,
      description: 'Comfortable cotton t-shirt'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=600',
      name: 'Formal Shirt',
      price: 1499,
      description: 'Slim fit formal shirt'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600',
      name: 'Blazer',
      price: 2999,
      description: "Premium men's blazer"
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600',
      name: 'Denim Jacket',
      price: 2499,
      description: 'Classic denim jacket'
    }
  ];

  const womensCollection = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600',
      name: 'Summer Dress',
      price: 1999,
      description: 'Flowy summer dress'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600',
      name: 'Elegant Blouse',
      price: 1599,
      description: 'Soft premium blouse'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600',
      name: 'Party Set',
      price: 2799,
      description: 'Stylish party wear set'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600',
      name: 'Coat Dress',
      price: 2299,
      description: 'Elegant winter fashion'
    }
  ];

  const childrensCollection = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600',
      name: 'Cool Hoodie',
      price: 1299,
      description: 'Kid-friendly hoodie'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600',
      name: 'Play Suit',
      price: 1399,
      description: 'Comfortable playwear'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=600',
      name: 'School Shirt',
      price: 1099,
      description: 'Neat school uniform shirt'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600',
      name: 'Rain Jacket',
      price: 1599,
      description: 'Weather-ready kids jacket'
    }
  ];

  const infantsCollection = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600',
      name: 'Cotton Onesie',
      price: 799,
      description: 'Soft infant onesie'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=600',
      name: 'Baby Romper',
      price: 899,
      description: 'Comfortable baby romper'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600',
      name: 'Warm Set',
      price: 1099,
      description: 'Cozy infant winter wear'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=600',
      name: 'Baby Jacket',
      price: 999,
      description: 'Adorable baby jacket'
    }
  ];

  const renderCollection = (title, id, items) => (
    <section id={id} className="category-section">
      <h2>{title}</h2>
      <div className="dress-grid">
        {items.map((dress) => (
          <img
            key={dress.id}
            src={dress.image}
            alt={dress.name}
            loading="lazy"
            onClick={() =>
              navigate('/dresses-info', {
                state: dress
              })
            }
          />
        ))}
      </div>
    </section>
  );

  return (
    <>
      <Navbar />

      <div className='clothNavbar'>
        <h3>Categories:-</h3>
        <a href="#mens">Mens</a>
        <a href="#womens">Womens</a>
        <a href="#childrens">Childrens (3-12 yrs)</a>
        <a href="#infants">Infants (0-2 yrs)</a>
      </div>

      {renderCollection("Men's Collection", 'mens', mensCollection)}
      {renderCollection("Women's Collection", 'womens', womensCollection)}
      {renderCollection("Children's Collection", 'childrens', childrensCollection)}
      {renderCollection('Infants Collection', 'infants', infantsCollection)}
    </>
  )
}

export default Dresses
