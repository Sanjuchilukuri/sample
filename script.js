// let btn = document.querySelector("button");
// console.log(btn);
// function display() {
//   let p = document.createElement("p");
//   p.innerText = "hello!";
//   document.getElementsByTagName("body")[0].appendChild(p);
//   console.log("Executing Display");
//   setTimeout(() => {
//     p.remove();
//   },2000);
// }

// btn.onclick = () => {
//   console.log("Fetching Data");

//   let test = new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(display());
//     }, 3000);
//   });

//   test.then(() => console.log("completed"));
// };

// let k = document.getElementsByTagName("input");
// console.log(k);


let formInputs = document.querySelectorAll("from input");
formInputs.forEach((ele) => {
  ele.addEventListener("change", () => {
    console.log(ele.value);
  })
})
