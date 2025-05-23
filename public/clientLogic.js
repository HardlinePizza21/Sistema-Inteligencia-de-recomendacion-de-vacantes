const jobsContainer = document.getElementById("jobs");
const jobDetail = document.getElementById("jobDetail");
const resultCount = document.getElementById("resultCount");
const searchInput = document.getElementById("search");
const btnBuscar = document.getElementById("btnBuscar");
const btnSugerir = document.getElementById("btnSugerir");
const fullVacanteOpt = document.getElementById("fullVacanteOpt");
const sectorFilterInput = document.getElementById("sectorFilter");

const softSkillsModal = document.getElementById('softSkillsModal');
const softSkillQuestionTextEl = document.getElementById('softSkillQuestionText');
const prevSoftSkillBtn = document.getElementById('prevSoftSkillBtn');
const nextSoftSkillBtn = document.getElementById('nextSoftSkillBtn');
const closeSoftSkillModalButton = softSkillsModal ? softSkillsModal.querySelector('.modal-close-btn') : null;
const softSkillIndicatorEl = document.getElementById('softSkillIndicator');

let allJobs = [];
const intereses = [];

const softSkillsQuestions = [
    "Describe una situación en la que tuviste que resolver un problema complejo de forma creativa. ¿Cuál fue el resultado?",
    "¿Cómo manejas el trabajo bajo presión o con plazos ajustados? Dame un ejemplo.",
    "Cuéntame sobre una vez que trabajaste eficazmente como parte de un equipo para lograr un objetivo común. ¿Cuál fue tu rol?",
    "¿Cómo te adaptas a los cambios inesperados en un proyecto o en el entorno laboral?",
    "Describe un momento en el que tuviste que comunicarte de manera clara y persuasiva para convencer a alguien de tu punto de vista.",
    "¿De qué manera buscas activamente oportunidades para aprender y desarrollar nuevas habilidades?",
    "Relata una experiencia donde tomaste la iniciativa para mejorar un proceso o solucionar un problema sin que te lo pidieran.",
    "¿Cómo priorizas tus tareas cuando tienes múltiples responsabilidades urgentes? ¿Qué estrategias utilizas?",
    "Describe una ocasión en la que recibiste feedback constructivo. ¿Cómo reaccionaste y qué hiciste con esa información?",
    "Háblame de una vez que enfrentaste un fracaso o un error. ¿Qué aprendiste de esa experiencia?"
];
let currentSoftSkillIndex = 0;
let modalWasManuallyClosed = false;

    const preguntasHabilidades = [
    {
        id: 1,
        pregunta: "¿Qué tan bueno te consideras trabajando en equipo?",
        opciones: [
            { id: 1, texto: "Nada bueno" }, { id: 2, texto: "Poco bueno" },
            { id: 3, texto: "Regular" }, { id: 4, texto: "Bueno" }, { id: 5, texto: "Muy bueno" }
        ]
    },
    {
        id: 2,
        pregunta: "¿Qué tan buena consideras tu comunicación asertiva?",
        opciones: [
            { id: 1, texto: "Nada buena" }, { id: 2, texto: "Poco buena" },
            { id: 3, texto: "Regular" }, { id: 4, texto: "Buena" }, { id: 5, texto: "Muy buena" }
        ]
    },
    {
        id: 3,
        pregunta: "¿Cómo crees que trabajas bajo presión?",
        opciones: [
            { id: 1, texto: "Nada bien" }, { id: 2, texto: "Poco bien" },
            { id: 3, texto: "Regular" }, { id: 4, texto: "Bien" }, { id: 5, texto: "Muy bien" }
        ]
    }
];
    let indexPregunta = 0;

function buildWeightedVacancyText(interesesParam) {
    if (!interesesParam || interesesParam.length === 0) return "";
    return interesesParam.map(v => `${v.nombre_vacante} en ${v.empresa}, ${v.ubicacion}`).join('. ');
}

async function fetchJobs(term = "", opt = "porNombre") {
    if (!jobsContainer || !resultCount) return;
    try {
        const res = await fetch("http://localhost:5000/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ term, limit: 20, opt })
        });
        if (!res.ok) {
            const errorData = await res.text();
            console.error("Error en la respuesta del servidor:", res.status, errorData);
            throw new Error(`Error del servidor: ${res.status}`);
        }
        allJobs = await res.json();
        renderJobs(allJobs);
    } catch (error) {
        console.error("Error al cargar las ofertas:", error);
        jobsContainer.innerHTML = '<p style="padding:1rem; color:red;">Error al cargar las ofertas. Intenta de nuevo más tarde.</p>';
        if (jobDetail) jobDetail.innerHTML = "<p>No se pudieron cargar los detalles.</p>";
        resultCount.textContent = "0 cupos";
    }
}

function renderJobs(jobs) {
    if (!jobsContainer || !resultCount || !jobDetail) return;
    jobsContainer.innerHTML = "";
    resultCount.textContent = `${jobs.length} cupos encontrados`;

    if (jobs.length === 0) {
        jobsContainer.innerHTML = "<p style='padding: 1rem;'>No se encontraron ofertas que coincidan con tu búsqueda.</p>";
        jobDetail.innerHTML = "<p>Selecciona una vacante para ver los detalles</p>";
    } else {
        jobs.forEach((job) => {
            const div = document.createElement("div");
            div.className = "job-card";
            div.innerHTML = `
                <strong>${job.nombre_vacante || "Nombre no disponible"}</strong><br />
                ${job.empresa || "Empresa no disponible"} | ${job.tipo_contrato?.tipo || "Tipo de contrato no especificado"}<br />
                ${job.salario || "Salario no especificado"}, ${job.ubicacion || "Ubicación no especificada"}
            `;
            div.addEventListener("click", () => {
                renderJobDetail(job);
                const existingInterest = intereses.find(i => i.id_oferta === job.id_oferta);
                if (!existingInterest && job.id_oferta) {
                     intereses.push({
                        id_oferta: job.id_oferta,
                        nombre_vacante: job.nombre_vacante,
                        empresa: job.empresa,
                        ubicacion: job.ubicacion,
                        salario: job.salario,
                        palabrasClave: job.informacionAmpliada?.palabrasClave || []
                    });
                }
                 // mostrarPreguntaEnVacante(div, job); // Descomenta si quieres preguntas inline al hacer clic
            });
            jobsContainer.appendChild(div);
        });
    }
    modalWasManuallyClosed = false;
    if (softSkillsQuestions.length > 0 && jobs.length > 0) {
       showSoftSkillsModal();
    }
}

function renderJobDetail(job) {
    if (!jobDetail) return;
    const nombreVacante = job.nombre_vacante || "Detalles de la Vacante";
    const empresa = job.empresa || "Empresa no especificada";
    const tipoContrato = job.tipo_contrato?.tipo || "No especificado";
    const salario = job.salario || "No especificado";
    const ubicacion = job.ubicacion || "No especificada";
    const experiencia = job.requisitos?.experiencia || "No especificada";
    const palabrasClaveHTML = job.informacionAmpliada?.palabrasClave && Array.isArray(job.informacionAmpliada.palabrasClave)
        ? job.informacionAmpliada.palabrasClave.map(k => `<span class="pill">${k}</span>`).join(" ")
        : "No especificadas";

    jobDetail.innerHTML = `
        <h3>${nombreVacante}</h3>
        <p><strong>Empresa:</strong> ${empresa}</p>
        <p><strong>Tipo de Contrato:</strong> ${tipoContrato}</p>
        <p><strong>Salario:</strong> ${salario}</p>
        <p><strong>Ubicación:</strong> ${ubicacion}</p>
        <p><strong>Experiencia Requerida:</strong> ${experiencia}</p>
        <div><strong>Palabras clave:</strong><br />
            ${palabrasClaveHTML}
        </div>
    `;
}

function updateSoftSkillQuestion() {
    if (!softSkillQuestionTextEl || !softSkillIndicatorEl || !prevSoftSkillBtn || !nextSoftSkillBtn) return;
    if (softSkillsQuestions.length > 0) {
        softSkillQuestionTextEl.textContent = softSkillsQuestions[currentSoftSkillIndex];
        softSkillIndicatorEl.textContent = `Pregunta ${currentSoftSkillIndex + 1} de ${softSkillsQuestions.length}`;
        prevSoftSkillBtn.disabled = currentSoftSkillIndex === 0;
        nextSoftSkillBtn.disabled = currentSoftSkillIndex === softSkillsQuestions.length - 1;
    } else {
        softSkillQuestionTextEl.textContent = "No hay preguntas disponibles en este momento.";
        softSkillIndicatorEl.textContent = "";
        prevSoftSkillBtn.disabled = true;
        nextSoftSkillBtn.disabled = true;
    }
}

function showSoftSkillsModal() {
    if (!softSkillsModal || modalWasManuallyClosed || softSkillsQuestions.length === 0) {
        return;
    }
    currentSoftSkillIndex = 0;
    updateSoftSkillQuestion();
    softSkillsModal.classList.add('visible');
}

function hideSoftSkillsModal(manualClose = false) {
    if (!softSkillsModal) return;
    softSkillsModal.classList.remove('visible');
    if (manualClose) {
        modalWasManuallyClosed = true;
    }
}

function mostrarPreguntaEnVacante(vacanteElement, jobData) {
        const actual = preguntasHabilidades[indexPregunta];
        const preguntaExistente = document.querySelector('.pregunta-container');
    if (preguntaExistente) {
        preguntaExistente.remove();
    }

    const container = document.createElement('div');
    container.classList.add('pregunta-container');

    const preguntaHTML = `
        <div class="job-title">${actual.pregunta}</div>
        <div class="job-keywords">
            <form id="formPreguntaDinamica">
                ${actual.opciones.map(op => `
                    <label>
                        <input type="radio" name="respuesta" value="${op.texto}" required> ${op.texto}
                    </label><br>
                `).join('')}
                <button type="submit" style="margin-top: 10px;">Responder</button>
            </form>
        </div>
    `;
        container.innerHTML = preguntaHTML;
        vacanteElement.insertAdjacentElement('afterend', container);

    const formPregunta = document.getElementById('formPreguntaDinamica');
    if (formPregunta) {
        formPregunta.addEventListener('submit', (e) => {
            e.preventDefault();
            const respuestaSeleccionada = document.querySelector('input[name="respuesta"]:checked')?.value;
            console.log(`Respuesta a "${actual.pregunta}" (${jobData.nombre_vacante}): ${respuestaSeleccionada}`);
            container.remove();
            indexPregunta = (indexPregunta + 1) % preguntasHabilidades.length;
        });
    }
}


if (btnBuscar) {
    btnBuscar.addEventListener("click", () => {
        const term = searchInput.value.trim();
        const opt = fullVacanteOpt.checked ? "fullVacante" : "porNombre";
        fetchJobs(term, opt);
        if (jobDetail) jobDetail.innerHTML = "<p>Selecciona una vacante para ver los detalles</p>";
    });
}

if (btnSugerir) {
    btnSugerir.addEventListener("click", () => {
        if (intereses.length === 0) {
            alert("Primero debes seleccionar algunas vacantes que te interesen para generar sugerencias.");
            if(jobDetail) jobDetail.innerHTML = "<p>Haz clic en algunas vacantes para que podamos darte sugerencias.</p>";
            return;
        }
        const term = buildWeightedVacancyText(intereses);
        fetchJobs(term, "fullVacante");
        if (jobDetail) jobDetail.innerHTML = "<p>Selecciona una vacante para ver los detalles</p>";
    });
}

if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (btnBuscar) btnBuscar.click();
        }
    });
}

if (prevSoftSkillBtn) {
    prevSoftSkillBtn.addEventListener('click', () => {
        if (currentSoftSkillIndex > 0) {
            currentSoftSkillIndex--;
            updateSoftSkillQuestion();
        }
    });
}

if (nextSoftSkillBtn) {
    nextSoftSkillBtn.addEventListener('click', () => {
        if (currentSoftSkillIndex < softSkillsQuestions.length - 1) {
            currentSoftSkillIndex++;
            updateSoftSkillQuestion();
        }
    });
}

if (closeSoftSkillModalButton) {
    closeSoftSkillModalButton.addEventListener('click', () => hideSoftSkillsModal(true));
}

if (softSkillsModal) {
    softSkillsModal.addEventListener('click', (event) => {
        if (event.target === softSkillsModal) {
            hideSoftSkillsModal(true);
        }
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && softSkillsModal && softSkillsModal.classList.contains('visible')) {
        hideSoftSkillsModal(true);
    }
});

fetchJobs();


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