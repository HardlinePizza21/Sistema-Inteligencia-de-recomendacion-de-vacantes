import { buildWeightedVacancyText } from './buildEmbeddigns.js';

const input = document.getElementById('search');
const filter = document.getElementById('filter');
let vacantes = document.querySelectorAll('#job-listing');
const intereses = [];

const checkbox = document.getElementById('filter');

// Preguntas
const preguntasHabilidades = [
    {
        id: 1,
        pregunta: "¿Qué tan bueno te consideras trabajando en equipo?",
        opciones: [
            { id: 1, texto: "Nada bueno" },
            { id: 2, texto: "Poco bueno" },
            { id: 3, texto: "Regular" },
            { id: 4, texto: "Bueno" },
            { id: 5, texto: "Muy bueno" }
        ]
    },
    {
        id: 2,
        pregunta: "¿Qué tan buena consideras tu comunicación asertiva?",
        opciones: [
            { id: 1, texto: "Nada buena" },
            { id: 2, texto: "Poco buena" },
            { id: 3, texto: "Regular" },
            { id: 4, texto: "Buena" },
            { id: 5, texto: "Muy buena" }
        ]
    },
    {
        id: 3,
        pregunta: "¿Cómo crees que trabajas bajo presión?",
        opciones: [
            { id: 1, texto: "Nada bien" },
            { id: 2, texto: "Poco bien" },
            { id: 3, texto: "Regular" },
            { id: 4, texto: "Bien" },
            { id: 5, texto: "Muy bien" }
        ]
    }
];

let indexPregunta = 0;

window.addEventListener('load', () => {
        document.getElementById('btnSuggest').addEventListener('click', (event) => {
            const data = buildWeightedVacancyText(intereses);
            fetchJobs(data, "fullVacante");
    });

document.getElementById('btnSearch').addEventListener('click', (event) => {
        let opt = "porNombre";
        if (checkbox.checked) {
            opt = "fullVacante";
        }
        fetchJobs(input.value, opt);
    });
});

async function fetchJobs(term, opt) {
const response = await fetch("http://localhost:5000/search", {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ term: term, limit: 10, opt: opt })
    });
    const jobs = await response.json();

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

            console.log(intereses);

            mostrarPreguntaEnVacante(vacante);
        });
    });
}

function mostrarPreguntaEnVacante(vacanteElement) {
    const actual = preguntasHabilidades[indexPregunta];

    // Eliminar cualquier otra pregunta mostrada
    const preguntaExistente = document.querySelector('.pregunta-container');
    if (preguntaExistente) {
        preguntaExistente.remove();
    }

    const container = document.createElement('div');
    container.classList.add('pregunta-container');
    container.style.background = "#f0f0f0";
    container.style.padding = "10px";
    container.style.marginTop = "10px";
    container.style.border = "1px solid #ccc";
    container.style.borderRadius = "5px";

    const preguntaHTML = `
        <form id="formPreguntaDinamica">
            <p><strong>${actual.pregunta}</strong></p>
            ${actual.opciones.map(op => `
                <label>
                    <input type="radio" name="respuesta" value="${op.texto}" required> ${op.texto}
                </label><br>
            `).join('')}
            <button type="submit" style="margin-top: 10px;">Responder</button>
        </form>
    `;

    container.innerHTML = preguntaHTML;
    vacanteElement.after(container);

    document.getElementById('formPreguntaDinamica').addEventListener('submit', (e) => {
        e.preventDefault();
        const respuestaSeleccionada = document.querySelector('input[name="respuesta"]:checked')?.value;
        console.log(`Respuesta a "${actual.pregunta}": ${respuestaSeleccionada}`);
        container.remove();
        indexPregunta = (indexPregunta + 1) % preguntasHabilidades.length;
    });
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