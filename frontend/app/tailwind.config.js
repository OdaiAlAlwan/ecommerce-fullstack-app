/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
  
    extend: {
      container: {
        padding: {
          DEFAULT: '1.5rem',
          'sm': '0rem',
          'md':'2rem',
          'lg': '3rem',
          'xl': '5rem',
          '2xl': '6rem',
        },
      },

    },
    screens: {
      'sm': {'max' : '640px'},
      'md': {'max' : '768px'},
      'lg': {'max' :'1024px'},
      'xl': { 'max' :'1280px'},
      '2xl': {'max' :'1536px'},
      
    },

  },
  plugins: [],
}


