let apiKey="4f67eab3tc66470aeo7b6631bb16f543";
let city="Lagos"
let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&lon={lon}&lat={lat}&apiKey=${apiKey}&units=metric`;

console.log(apiUrl);
