import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'
import Cart from './Cart'

const Navbar = () => {
  return (
    <>
        <div className='flex justify-around items-center p-4 border-b'>
            <div className='text-4xl font-bold'>
                <span className='text-green-500'>thakur</span>cart<span className='text-green-500'>.</span>
            </div>
            <div className='flex w-72 justify-around'>
                 <Link to='/' className='cursor-pointer'>Home</Link>
                <Link to='/' className='cursor-pointer'>Shop</Link>
                <Link to='/' className='cursor-pointer'>About</Link>
                <Link to='/' className='cursor-pointer'>Contact</Link>
            </div>

            <div>
                <SearchBar />
            </div>

        <div>
            <Cart />
        </div>

        </div>
    </>
  )
}

export default Navbar