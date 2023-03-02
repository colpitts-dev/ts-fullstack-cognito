import { Link } from 'react-router-dom'

export const SignUpForm = () => {
  return (
    <div className="w-10/12 m-auto my-10 bg-white shadow-md lg:w-4/12 md:6/12">
      <div className="px-8 py-8 rounded-xl">
        <h1 className="mt-3 text-2xl font-medium text-center">Sign Up</h1>
        <form action="" className="mt-6">
          <div className="my-5 text-sm">
            <label htmlFor="username" className="block text-black">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-3 mt-3 bg-gray-100 rounded-sm focus:outline-none"
              placeholder="Username"
            />
          </div>
          <div className="my-5 text-sm">
            <label htmlFor="email" className="block text-black">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="w-full px-4 py-3 mt-3 bg-gray-100 rounded-sm focus:outline-none"
              placeholder="Email"
            />
          </div>
          <div className="my-5 text-sm">
            <label htmlFor="password" className="block text-black">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 mt-3 bg-gray-100 rounded-sm focus:outline-none"
              placeholder="Password"
            />
            <div className="flex justify-end mt-2 text-xs text-gray-600">
              <span>must be at least 8 characters</span>
            </div>
          </div>

          <button className="block w-full p-3 text-center text-white duration-300 bg-gray-800 rounded-sm hover:bg-black">
            Get Started
          </button>
        </form>

        <div className="flex items-center justify-center mt-10 md:justify-between">
          <div
            style={{ height: '1px' }}
            className="hidden w-4/12 bg-gray-200 md:block"
          ></div>
          <p className="text-sm font-light text-gray-400 md:mx-2 whitespace-nowrap">
            {' '}
            Join With Social{' '}
          </p>
          <div
            style={{ height: '1px' }}
            className="hidden w-4/12 bg-gray-200 md:block"
          ></div>
        </div>

        <div className="grid gap-2 md:grid-cols-2 mt-7">
          <div>
            <button className="w-full p-3 text-center text-white duration-300 bg-blue-900 rounded-sm hover:bg-blue-700">
              Facebook
            </button>
          </div>
          <div>
            <button className="w-full p-3 text-center text-white duration-300 bg-blue-400 rounded-sm hover:bg-blue-500">
              Twitter
            </button>
          </div>
        </div>

        <p className="mt-12 text-xs font-light text-center text-gray-400">
          {' '}
          Already have an account?{' '}
          <Link to="/signin">
            <span className="font-medium text-black"> Sign In </span>{' '}
          </Link>
        </p>
      </div>
    </div>
  )
}
