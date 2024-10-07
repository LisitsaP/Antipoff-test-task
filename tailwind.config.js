/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'md': '850px'
      },
      colors: {
        'violet': '#512689',
        'black': '#151317',
        'gray': '#808185',
        'grayLight': "#F8F8F8",
        'red': "#FF6161",
        'white': "#FFFFFF"
      },

      boxShadow:{
        'md': "0 4px 20px rgba(0, 0, 0, 0.0784313725490196)"
      },
      fontSize: {
        'xs': ['10px',{lineHeight: '12px', letterSpacing: 'normal', fontWeight: '400'}],
        'sm': ['14px',{lineHeight: '16px', letterSpacing: 'normal', fontWeight: '400'}],
        'base': ['16px',{lineHeight: '21px', letterSpacing: 'normal', fontWeight: '400'}],
        'lg': ['20px',{lineHeight: '23px', letterSpacing: 'normal', fontWeight: '400'}],
        'xl': ['36px',{lineHeight: '42px', letterSpacing: 'normal', fontWeight: '400'}],
        'xxl': ['64px',{lineHeight: '72px', letterSpacing: 'normal', fontWeight: '400'}],
      },

      fontFamily: {
        'roboto': [ "Roboto", "sans-serif"],
      },


    },
  },
  plugins: [],
}