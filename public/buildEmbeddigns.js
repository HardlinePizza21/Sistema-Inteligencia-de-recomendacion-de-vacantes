//! Funcion que crea el texto para hacer el embedding
export const buildWeightedVacancyText = (data) => {
    
    let keyWords = "Palabras clave: "
    let title = "Trabajo: "
    let salary = "Salario: " 
    let company = "Empresa: "

    data.forEach(element => {

        const palabrasClave = element.palabrasClave.join(' ');

        keyWords += `${palabrasClave} `
        title += `${element.nombre_vacante} `
        salary += `${element.salario} `
        company += `${element.empresa} `
        
    });

    return `${keyWords} ${title} ${salary} ${company}`



    // if (Array.isArray(data)) {
    //     data.map((vacante) => {
    //         keyWords += `${vacante.nombre_vacante} `;
    //         title += `${vacante.nombre_vacante} `;
    //         salary += `${vacante.salario} `;
    //         keyWords += `${vacante.nombre_vacante} `;
    //     })
    // }
    // const repeatText = (text, weight) => text.repeat(weight);

    // const repeatTextArray = (array, weight) => 
    //     array.map(item => item.repeat(weight)).join(' ');

    // return `Palabras clave:${keyWords} ${title} ${salary} ${company}`;

}