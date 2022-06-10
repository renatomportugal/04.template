const data_positions = {
   1: ['100%', '100%', '250%'],
   2: ['0%', '100%', '250%'],
   3: ['70%', '0', '280%'],
   4: ['50%', '50%', '100%'],
   5: ['25%', '90%', '280%'],
   6: ['50%', '40%', '250%'],
   7: ['0', '55%', '280%'],
};
let i = 0; // Current position

document.querySelector('.zoom__btn').addEventListener('click', (e) => {
   e.preventDefault();
   
   const total_data_positions = Object.keys(data_positions).length;
   const img = document.querySelector('.zoom__img-holder');
   
   i = i < total_data_positions ? i += 1 : 1;

   img.style.backgroundPosition = `${data_positions[i][0]} ${data_positions[i][1]}`;
   img.style.backgroundSize = `${data_positions[i][2]}`;
})