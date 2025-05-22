import { buildWeightedVacancyText } from './buildEmbeddigns.js';

const input = document.getElementById('search')
const filter = document.getElementById('filter')
let vacantes = document.querySelectorAll('#job-listing');
const intereses = []

const checkbox = document.getElementById('filter');

window.addEventListener('load', () => {
    document.getElementById('btnSuggest').addEventListener('click', (event) => {

        const data = buildWeightedVacancyText(intereses);

        fetchJobs(data, "fullVacante")

    })
    document.getElementById('btnSearch').addEventListener('click', (event) => {

        let opt = "porNombre"

        if (checkbox.checked) {
            opt = "fullVacante"
        }


        fetchJobs(input.value, opt)

    })
})

async function fetchJobs(term, opt) {

    const response = await fetch("http://localhost:5000/search", {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ term: term, limit: 10, opt: opt })
    });
    const jobs = await response.json()

    const jobList = document.getElementById("job-list");
    jobList.innerHTML = '';
    jobs.forEach(job => {
        const jobElement = document.createElement("div");
        jobElement.classList.add("job-listing");
        jobElement.innerHTML = `
            <div class="job-title">${job.nombre_vacante}</div>
            <div class="job-company">${job.empresa} - ${job.ubicacion}</div>
            <div class="job-details">${job.salario.toLocaleString()}$</div>
            <div class="job-keywords">
                ${job.informacionAmpliada.palabrasClave.join(', ')}
            </div>
        `;
        jobList.appendChild(jobElement);
        
    });


    vacantes = document.querySelectorAll('.job-listing');

    vacantes.forEach((vacante) => {
        vacante.addEventListener('click', () => {

            const [empresa, ubicacion] = vacante.querySelector('.job-company').innerText.split(' - ');
            intereses.push({
                nombre_vacante: vacante.querySelector('.job-title').innerText,
                empresa: empresa.trim(),
                ubicacion: ubicacion.trim(),
                salario: parseFloat(vacante.querySelector('.job-details').innerText.replace(/\./g, '').replace('$', '').trim()),
                palabrasClave: vacante.querySelector('.job-keywords').innerText.split(', ').map(keyword => keyword.trim())
            });

            console.log(intereses)

        })
    })
   
}

// const questions = [
//     {
//         question: "¿Cuántos años de experiencia tienes?",
//         input: '<input type="number" id="experience" min="0" max="50" style="width: 100%; padding: 5px; margin-top: 5px;">'
//     },
//     {
//         question: "¿Qué tipo de trabajo buscas?",
//         input: '<select id="interest" style="width: 100%; padding: 5px; margin-top: 5px;">\n' +
//                '<option value="frontend">Desarrollador Frontend</option>\n' +
//                '<option value="backend">Desarrollador Backend</option>\n' +
//                '<option value="fullstack">Desarrollador Fullstack</option>\n' +
//                '<option value="data">Científico de Datos</option>\n' +
//                '</select>'
//     },
//     {
//         question: "¿Prefieres trabajo remoto o presencial?",
//         input: '<select id="work-mode" style="width: 100%; padding: 5px; margin-top: 5px;">\n' +
//                '<option value="remoto">Remoto</option>\n' +
//                '<option value="presencial">Presencial</option>\n' +
//                '<option value="híbrido">Híbrido</option>\n' +
//                '</select>'
//     }
// ];

// let currentQuestionIndex = 0;

// function showPopup() {
//     const popup = document.getElementById("popup");
//     const questionText = document.getElementById("popup-question");
//     const popupContent = document.getElementById("popup-content");

//     questionText.innerText = questions[currentQuestionIndex].question;
//     popupContent.innerHTML = questions[currentQuestionIndex].input;
//     popup.style.display = "block";

//     currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
//     setTimeout(showPopup, 90000);
// }

// function hidePopup() {
//     document.getElementById("popup").style.display = "none";
// }

// function savePreferences() {
//     hidePopup();
// }

// window.onload = function() {
//     setTimeout(showPopup, 5000);
// };