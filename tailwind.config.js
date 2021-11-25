module.exports = {
   purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
   darkMode: false, // or 'media' or 'class'
   theme: {
      fontFamily: {
         p: ['proxima', 'Arial', 'Helvetica'],
         pm: ['proxima-medium', 'Arial', 'Helvetica'],
         pb: ['proxima-bold', 'Arial', 'Helvetica'],
      },
   },
   variants: {
      extend: {
         // backgroundColor: ['checked'],
         // borderColor: ['checked'],
      },
   },
   plugins: [require('@tailwindcss/forms')],
}
